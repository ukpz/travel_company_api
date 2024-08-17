const Tour = require("../models/tour")

exports.index = async (req, res) => {
    try {
        const { limit, offset, sortAsc, sortDsc } = req.query
        const tours = await Tour.find().populate("location");
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.show = async(req, res) => {
    try {
        const {slug} = req.params
        const tours = await Tour.findOne({slug}).populate("location");
        res.json(tours);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}

exports.store = async (req, res) => {
    try {
        const tour = new Tour(req.body)
        await tour.save()
        res.status(201).json({ message: "New tour package is created successfully" })
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}