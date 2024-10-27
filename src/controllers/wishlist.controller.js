const Wishlist = require("../models/wishlist")

exports.addItem = async (req, res) => {
    try {
        await Wishlist.create({
            customer: req.verifiedUser.id,
            tour: req.body.tourId
        })
        res.status(200).json({ message: 'Your wishlist updated' })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.removeItem = async (req, res) => {
    try {
        await Wishlist.findOneAndDelete({
            customer: req.verifiedUser.id,
            tour: req.body.tourId
        })
        res.status(200).json({ message: 'Your wishlist updated' })
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.getItems = async (req, res) => {
    try {
        const result = await Wishlist.find({
            customer: req.verifiedUser.id,
        });
        const items = result.map(item => item.tour);
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.wishlistDetails = async (req, res) => {
    try {
        const wishlist = await Wishlist.find({
            customer: req.verifiedUser.id,
        }).populate({ path: 'tour', select: 'name thumbnail' })
        const items=wishlist.map(item=>item.tour)
        res.status(200).json(items)
    } catch (error) {
        res.status(500).json(error.message);
    }
}