const Booking=require("../models/booking")

exports.myBookings=async(req,res)=>{
    try {
        const bookings=await Booking.find({customer:req.verifiedUser.id}).populate({path:'tour',select:'name'}).sort({_id:-1})
        res.json({bookings})
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}