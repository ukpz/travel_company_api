const Booking = require("../models/booking")

exports.create = async (req, res) => {
    try {
        req.body.customer = req.verifiedUser.id
        const timestamp = Date.now();
        req.body.bookingRef = timestamp.toString().slice(-8);
        await Booking.create(req.body);
        res.status(201).json({ ref: req.body.bookingRef });
    } catch (error) {
        res.status(500).json(error.message);
    }
}