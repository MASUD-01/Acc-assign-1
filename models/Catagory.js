const mongoose = require('mongoose')
const validator = require("validator")
const { ObjectId } = mongoose.Schema.Types

const catagorySchema = mongoose.Schema({
    name: {
        type: String,
        trim: true,
        required: [true, "plsease provde a catagory name"],
        lowercase: true,
        unique: true,
    },
    description: String,
    imageUrl: {
        type: String,
        validate: [validator.isURL, "Please provide a valid URL"]
    }
}, {
    timestamps: true
})

const Catagory = mongoose.model('catagory', catagorySchema)
module.exports = Catagory