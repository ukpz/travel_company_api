const mongoose = require("mongoose")
const Destination = require("./destination")

const schema = mongoose.Schema({
    name: { type: String, required: true },
    slug: { type: String, required: true },
    languages: { type: Array },
    highlights: { type: Array },
    included: { type: Array },
    excluded: { type: Array },
    duration: { type: String },
    pickupPoint: { type: String },
    dropPoint: { type: String },
    thumbnail: { type: String },
    paxRates: [{
        type: Object
        // paxType: { type: String },
        // ageFrom: { type: String },
        // ageTo: { type: String },
        // amount: { type: String }
    }],
    extraRates: [{ type: Object }],
    location: { type: mongoose.Schema.Types.ObjectId, ref: Destination },
    images: { type: Array },
    description: { type: String },
    attractions: { type: String },
    itinerary: [{ type: Object }],
    // cancellationPolicies:[{
    //     daysBefore:{ type: String},
    //     amount:{ type: String},
    //     amountType:{ type: String, default:'Percentage'}
    // }],
    active: { type: Boolean, default: true }
}, {
    timestamps: false,
    versionKey: false
})

schema.index({ slug: 1, unique: true })

module.exports = mongoose.model('Tour', schema);