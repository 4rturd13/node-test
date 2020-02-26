const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

const Schema = mongoose.Schema;

let specialtiesSchema = new Schema({
    name: {
        type: String,
        unique: true,
        required: [true, "Name is required"]
    },
    createdBy: {
        type: Number,
        default: 44391
    },
    createdAt: {
        //TODO: creation date ISODate()
    },
    updatedBy: {
        type: Number,
        default: 30924
    },
    updatedAt: {
        //TODO: update date ISODate()
    }
});

module.exports = mongoose.model("Specialties", specialtiesSchema);
