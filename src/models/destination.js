const mongoose = require("mongoose")

const schema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    thumbnail_image: { type: String },
    hasChildren: { type: Boolean, default: false },
    tourCount:{type: Number},
    type: { type: String },
    parent: { type: mongoose.Schema.Types.ObjectId, default: null },
    active: { type: Boolean, default: true }
}, {
    timestamps: false,
    versionKey: false
})

module.exports = mongoose.model('Destination', schema);