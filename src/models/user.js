const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const userSchema = mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String },
    password: { type: String },
    phone: { type: String },
    role: { type: String, enum: ["customer", "admin", "operator"], default: "customer" },
    status: { type: Boolean, default: true },
    avatar: { type: String },
    details: {
        age: { type: Number },
        gender: { type: String, enum: ['male', 'female', 'other'] }
    }
}, {
    timestamps: true,
    versionKey: false,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

userSchema.pre('save', async function (next) {
    const user = this;
    if (user.isModified('password')) {
        try {
            user.password = await bcrypt.hash(user.password, 8);
        } catch (err) {
            return next(err);
        }
    }
    next();
});

userSchema.method('isValidPassword', async function (password) {
    const isValid = await bcrypt.compare(password, this.password);
    return isValid;
});

module.exports = mongoose.model('User', userSchema);