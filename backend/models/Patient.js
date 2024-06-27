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
  duration: {
    type: String,
    required: [true, 'Duration is required'],
    trim: true
  }
});

const therapySchema = new Schema({
  nameOfTherapy: {
    type: String,
    required: [true, 'Name of therapy is required'],
    trim: true
  },
  frequency: {
    type: String,
    required: [true, 'Frequency is required'],
    trim: true
  }
});

const ongoingHealthConditionSchema = new Schema({
  problem: {
    type: String,
    required: [true, 'Health problem is required'],
    trim: true
  },
  diagnosis: {
    type: String,
    required: [true, 'Diagnosis is required'],
    trim: true
  },
  dateOfOnset: {
    type: Date,
    required: [true, 'Date of onset is required']
  }
});

const contactPersonSchema = new Schema({
  name: {
    type: String,
    required: [true, 'Contact person name is required'],
    trim: true
  },
  relationship: {
    type: String,
    required: [true, 'Relationship to patient is required'],
    trim: true
  },
  phone: {
    type: String,
    required: [true, 'Contact person phone number is required'],
    trim: true
  }
});

const treatmentPlanSchema = new Schema({
  patient_id: {
    type: String,
    required: [true, 'Patient ID is required'],
    trim: true
  },
  contactInformation: {
    type: String,
    required: [true, 'Contact information is required'],
    trim: true
  },
  personalFamilyData: {
    occupation: { type: String, trim: true },
    lifeEvents: { type: String, trim: true },
    habits: { type: String, trim: true },
    familyMedicalHistory: { type: String, trim: true }
  },
  pastMedicalHistory: {
    seriousIllnesses: { type: String, trim: true },
    operations: { type: String, trim: true },
    accidents: { type: String, trim: true },
    geneticHistory: { type: String, trim: true }
  },
  riskFactors: {
    type: String,
    trim: true
  },
  allergiesDrugReactions: {
    type: String,
    trim: true
  },
  emergencyContact: contactPersonSchema,
  ongoingHealthConditions: [ongoingHealthConditionSchema],
  medication: {
    type: [medicationSchema],
    required: [true, 'At least one medication is required']
  },
  therapy: {
    type: [therapySchema],
    required: [true, 'At least one therapy is required']
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
