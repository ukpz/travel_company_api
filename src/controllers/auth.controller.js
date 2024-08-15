const User = require("../models/user")
const jwt = require("jsonwebtoken")

exports.signup = async(req, res) => {
    try {
        
        const user =await User.create(req.body)
        if (user) res.status(200).json("success")
    } catch (error) {
        res.status(500).json(error.message)
    }
}

exports.login = async(req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user || !await user.isValidPassword(password))
            return res.status(200).json({ success: false, message: 'Invalid email or password!' });

        if (!user.status) return res.status(200).json({ success: false, message: 'Your account is not active!' })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({
            success: true,
            message: 'Login successful',
            data: {
                name: user.name,
                avatar: user.avatar,
                token
            }
        });
    } catch (error) {
        res.status(500).json(error.message)
    }
}