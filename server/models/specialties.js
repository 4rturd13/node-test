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
        type: Date,
        default: Date.now
    },
    updatedBy: {
        type: Number,
        default: 30924
    },
    updatedAt: {
        type: Date,
        default: Date.now
    }
});

specialtiesSchema.plugin(uniqueValidator, {
    message: "This {PATH} is already in use"
});

module.exports = mongoose.model("Specialties", specialtiesSchema);
