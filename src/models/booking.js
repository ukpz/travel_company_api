const mongoose = require("mongoose")
const User = require("./user")
const Tour = require("./tour")

const schema = mongoose.Schema({
    bookingRef: { type: String, required: true, unique: true },
    customer: { type: mongoose.Schema.Types.ObjectId, ref: User, required: true },
    tourOperator: { type: mongoose.Schema.Types.ObjectId, ref: User, default: null },
    tour: { type: mongoose.Schema.Types.ObjectId, ref: Tour, required: true },
    billingAddress:{ type: Object },
    paxDetails: { type: Object }, 
    amount: { type: String, required: true },
    paid: { type: String, default: null },
    status: { type: String, enum: ["pending", "confirmed", "settled"], default: 'pending' },
    // paymentStatus: { type: String, enum: ["pending", "paid", "failed"], default: 'pending' }
}, {
    timestamps: true,
    versionKey: false
}) 

module.exports = mongoose.model('Booking', schema);
