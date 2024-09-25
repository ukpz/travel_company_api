const mongoose = require("mongoose")
const User = require("./user")
const Tour = require("./tour")

const schema = mongoose.Schema({
    customer: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: Tour, required: true },
}, {
    timestamps: true,
    versionKey: false
})

module.exports = mongoose.model('Wishlist', schema);