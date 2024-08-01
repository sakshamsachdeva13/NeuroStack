const mongoose = require('mongoose');
const { Schema } = mongoose;

const medicationSchema = new Schema({
  nameOfMedicine: {
    type: String,
    required: [true, 'Name of medicine is required'],
    trim: true
  },
  dose: {
    type: String,
    required: [true, 'Dose is required'],
    trim: true
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    trim: true
  },
  frequencyUnit: {
    type : String ,
    required : [true , 'Frequency Units is required']
  },
  
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  },
  durationUnit : {
    type : String,
    required : [true , "Duration Unit is required"]
  }
});

const therapySchema = new Schema({
  nameOfTherapy: {
    type: String,
    required: [true, 'Name of therapy is required'],
    trim: true
  },
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  }, 
  durationUnit : {
    type : String,
    required : [true , 'Duration Unit is required']
  }
});

const treatmentPlanSchema = new Schema({
  patient_id: {
    type: String,
    required: [true, 'Patient ID is required'],
    trim: true
  },
  medication: {
    type: [medicationSchema],
   
  },
  therapy: {
    type: [therapySchema],
    
  },
  createdDate: {
    type: Date,
    default: Date.now
  },
  updatedDate: {
    type: Date,
    default: Date.now
  },
  doctor_id: {
    type: String,
    required: [true, 'Doctor ID is required'],
    trim: true
  }
});

// Automatically update the `updatedDate` field before saving
treatmentPlanSchema.pre('save', function(next) {
  this.updatedDate = Date.now();
  next();
});

const TreatmentPlan = mongoose.model('TreatmentPlan', treatmentPlanSchema);

module.exports = TreatmentPlan;
