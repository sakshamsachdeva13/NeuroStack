const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const PatientSchema = new Schema({
    case_number: { // use case_number instead of id
        type: String,
        required: true,
        unique: true
    },
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number,
        required: true
    },
    disease: {
        type: String,
        required: true
    },
    symptoms: [{
        name: {
            type: String,
            required: true
        },
        frequency: {
            type: Schema.Types.Mixed, // You can adjust the type as needed
            default: {}
        },
        severity: {
            type: Schema.Types.Mixed, // You can adjust the type as needed
            default: {}
        },
        intensity: {
            type: Schema.Types.Mixed, // You can adjust the type as needed
            default: {}
        }
    }],
    history: [{
        type: String
    }],
    doctorsNote: {
        type: Schema.Types.Mixed, // Using Mixed type for any type of input
        default: {}
    },
    files: [{
        type: Schema.Types.Mixed, // You can adjust the type as needed
        default: []
    }]
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
