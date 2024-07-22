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
   
    history: [{
        type: String
    }],
   
});

const Patient = mongoose.model('Patient', PatientSchema);

module.exports = Patient;
