const User = require("../models/user")
const jwt = require("jsonwebtoken")

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
        res.status(500).json({message:error.message})
    }
}

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body
        const user = await User.findOne({ email });

        if (!user || !await user.isValidPassword(password))
            return res.status(400).json({ message: 'Invalid email or password!' });

        if (!user.status) return res.status(500).json({ message: 'Your account is not active!' })

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: '1d' })
        res.status(200).json({
            name: user.name,
            avatar: user.avatar,
            token
        });
    } catch (error) {
        res.status(500).json({message:error.message})
    }
}