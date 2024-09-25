const Destination = require("../models/destination")

exports.index = async (req, res) => {
    try {
        const {search, limit, offset, sortAsc, sortDsc } = req.query
        const destinations = await Destination.find({ "name": { $regex: new RegExp(search, 'i') } }).limit(limit ?? 6);
        res.status(200).json(destinations);
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.show = (req, res) => {

}

exports.store = async (req, res) => {
    try {
        // const isExist=await Destination.find();
        // if(isExist.length>0) return res.status(400).json("Destination already exists");
        await Destination.create(req.body);
        res.status(200).json("new destination created");
    } catch (error) {
        res.status(500).json(error.message);
    }
}

exports.update = (req, res) => {

}

exports.delete = (req, res) => {

}