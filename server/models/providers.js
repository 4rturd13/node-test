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
        required: [true, "Lastname is required"]
    },
    middleName: {
        type: String,
        required: [true, "Middlename is required"]
    },
    email: {
        type: String,
        unique: true,
        required: [true, "Email is required"]
    },
    // specialties: {
    //     name: {
    //         type: String,
    //         unique: true,
    //         required: [true, "Name is required"]
    //     },
    //     createdBy: {
    //         type: Number,
    //         default: 44391
    //     },
    //     createdAt: {
    //         type: Date,
    //         default: Date.now
    //     },
    //     updatedBy: {
    //         type: Number,
    //         default: 30924
    //     },
    //     updatedAt: {
    //         type: Date,
    //         default: Date.now
    //     }
    // },
    projectedStartDate: {
        type: String,
        required: [true, "projectedStartDate is required"]
    },
    employerId: {
        type: Number,
        required: true
    },
    providerType: {
        type: String,
        validate: {
            validator: function(v) {
                const regex = /[\DC\DDS\DMD\DO\DPM\LCMFT\LCMHC\LCPC\MD\NP\PA]/;
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid providerType!`
        },
        required: [true, "providerType is required"]
    },
    staffStatus: {
        type: String,
        validate: {
            validator: function(v) {
                const regex = /[\ACTIVE\AFFILIATE\ASSOCIATE\COMMUNITY\CONSULTING\COURTESY\FACULTY\HONORARY\HOSPITALIST\TIOUSE_STAFF\TOCUM_TENENE\PROVISIONS\RESIDENT\TEACHING]/;
                return regex.test(v);
            },
            message: props => `${props.value} is not a valid staffStatus!`
        },
        required: [true, "staffStatus is required"]
    },

    assignedTo: {
        type: Number,
        required: true
    },
    status: {
        type: String,
        default: "AWAITING_CREDENTIALS",
        required: [true, "staffStatus is required"]
    }
});

providersSchema.plugin(uniqueValidator, {
    message: "This {PATH} is already in use"
});

module.exports = mongoose.model("providers", providersSchema);
