const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const PatientRecordsSchema = new Schema({
  case_number: {
    // use case_number to link with Patient schema
    type: String,
    required: true,
  },
  symptoms: [
    {
      name: {
        type: String,
        required: true,
      },
      frequency: {
        type: Number,
        default: {},
        range : [1 , 10]
      },
      severity: {
        type: Number, // You can adjust the type as needed
        default: {},
        range : [1 , 10]
      },
      intensity: {
        type: Number, // You can adjust the type as needed
        default: {},
        range : [1 , 10]
      },
    },
  ],
  doctorsNote: {
    type: Schema.Types.Mixed, // Using Mixed type for any type of input
    default: {},
  },
  files: [
    {
      type: Schema.Types.Mixed, // You can adjust the type as needed
      default: [],
    },
  ],

  createdDate: {
    type: Date,
    default: Date.now,
  },
  updatedDate: {
    type: Date,
    default: Date.now,
  },
});

const PatientRecords = mongoose.model("PatientRecords", PatientRecordsSchema);

module.exports = PatientRecords;
