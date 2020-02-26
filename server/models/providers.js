const mongoose = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");

let Schema = mongoose.Schema;

let providersSchema = new Schema({
    firstName: {
        type: String,
        required: [true, "Name is required"]
    },
    lastName: {
        type: String,
        required: [false, "Lastname is required"]
    },
    middleName: {
        type: String,
        required: [false, "Middlename is required"]
    },
    email: {
        type: String,
        unique: false,
        required: [false, "Email is required"]
    },
    specialties: {
        // collection
        // required: [false, "Specialties is required"]
    },
    projectedStartDate: {
        type: String,
        required: [false, "projectedStartDate is required"]
    },
    employerId: {
        type: String,
        required: false
    },
    providerType: {
        type: String,
        required: [true, "providerType is required"],
        validate: {
            validator: function(v) {
                return /\d{3}-\d{3}-\d{4}/.test(v);
            },
            message: props => `${props.value} is not a valid providerType!`
        }
    },
    staffStatus: {
        type: Boolean,
        required: [false, "staffStatus is required"]
    },
    assignedTo: {
        type: Boolean,
        required: false
    },
    status: {
        type: Boolean,
        required: [false, "staffStatus is required"]
    }
});

providersSchema.plugin(uniqueValidator, {
    message: "This {PATH} is already in use"
});

module.exports = mongoose.model("providers", providersSchema);
