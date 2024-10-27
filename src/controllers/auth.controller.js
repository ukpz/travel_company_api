const User = require("../models/user")
const jwt = require("jsonwebtoken")
// const fs = require('fs');
const ejs = require('ejs');
const path = require('path');
const bcrypt = require("bcrypt");
const sendEmail = require("../utils/emailHandler")


exports.signup = async (req, res) => {
    try {
        const [emilExist, phoneExist] = await Promise.all([
            await User.findOne({ email: req.body.email }),
            await User.findOne({ phone: req.body.phone })
        ]);

        if (emilExist) return res.status(400).json({ message: 'Email already exists!' });
        if (phoneExist) return res.status(400).json({ message: 'Phone number already exists!' });
        const user = await User.create(req.body)
        if (user) res.status(200).json({ message: 'signup successful' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.login = async (req, res) => {
    const Wishlist = require("../models/wishlist")

    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user || !await user.isValidPassword(password))
            return res.json({ success: false, message: 'Invalid email or password!' });

        if (!user.status) return res.json({ success: false, message: 'Your account is not active!' })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.json({
            success: true,
            user: {
                name: user.name,
                avatar: user.avatar,
                token
            }
        });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.forgotPassword = async (req, res) => {
    try {
        const user = await User.findOne({ email: req.body.email });
        console.log(req.body);

        if (!user) return res.status(404).json({ message: 'This email is not registered!' });
        const resetToken = jwt.sign({ id: user._id }, process.env.JWT_SECRET, { expiresIn: '5m' });
        user.resetToken = resetToken;
        await user.save();
        const resetLink = `${process.env.FRONTEND_URL}/reset-password/${resetToken}`;
        // send email with resetURL
        // const content = fs.readFileSync("./views/emailTemplates/forgotPassword.ejs");
        // Define the path to your EJS file
        const templatePath = path.join(__dirname, '../views/emailTemplates', 'forgot-password.ejs');

        // Render the template with dynamic data
        const htmlContent = await ejs.renderFile(templatePath, { resetLink });
        sendEmail({ toEmail: user.email, subject: 'Reset Password Link', content: htmlContent })
        res.status(200).json({ message: 'Password reset email sent!' });
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.verifyResetPasswordToken = async (req, res) => {
    try {
        const { resetToken } = req.body;
        const tokenValidation = jwt.verify(resetToken, process.env.JWT_SECRET);
        const user = await User.findById(tokenValidation.id);
        if (user) return res.status(200).json({ message: 'token is verified' })
        return res.status(400).json({ message: 'Invalid link' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.resetPassword = async (req, res) => {
    try {
        const { resetToken, newPassword } = req.body;
        // const user = await User.findOne({ resetToken });
        // user.password = newPassword;
        // user.resetToken=null;
        // await user.save();
        const updatedUser = await User.findOneAndUpdate(
            { resetToken },
            {
                $unset: { resetToken: 1 },
                $set: { password: await bcrypt.hash(newPassword, 8) }
            }, // Set the attribute to 1 to remove it
            { new: true } // Return the updated document
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'Something unexpected happned!' })
        }
        return res.status(200).json({ message: 'Password has been reset' })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}