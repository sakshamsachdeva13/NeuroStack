const mongoose = require('mongoose');
const UserConfig = require('../models/userConfig');
const User = require('../models/User')
const Patient = require('../models/Patient')
const TreatmentPlan = require('../models/TreatmentPlan')
const PatientRecords = require('../models/PatientRecords')



const patientRecords = [
  {
    _id: ('669d495865cd0df087117b7b'),
    case_number: '12345',
    symptoms: [
      { name: 'Tremor', frequency: 8, severity: 6, intensity: 7 },
      { name: 'Headache', frequency: 5, severity: 5, intensity: 4 }
    ],
    doctorsNote: 'Patient needs regular check-ups and medication.',
    files: [ 'brain_scan1.jpg', 'report1.pdf' ],
    createdDate: ('2024-07-01T00:00:00.000Z'),
    updatedDate: ('2024-07-02T00:00:00.000Z')
  },
  {
    _id: ('669d495865cd0df087117b7c'),
    case_number: '12345',
    symptoms: [
      { name: 'Tremor', frequency: 8, severity: 6, intensity: 7 },
      { name: 'Headache', frequency: 5, severity: 5, intensity: 4 }
    ],
    doctorsNote: 'Patient should continue current treatment and monitor symptoms.',
    files: [ 'brain_scan2.jpg', 'report2.pdf' ],
    createdDate: ('2024-07-03T00:00:00.000Z'),
    updatedDate: ('2024-07-04T00:00:00.000Z')
  },
  {
    _id: ('669d495865cd0df087117b7d'),
    case_number: '12346',
    symptoms: [
      { name: 'Dizziness', frequency: 6, severity: 4, intensity: 5 },
      { name: 'Memory loss', frequency: 4, severity: 6, intensity: 6 }
    ],
    doctorsNote: 'Patient should get plenty of rest and follow prescribed medication.',
    files: [ 'brain_scan3.jpg', 'report3.pdf' ],
    createdDate: ('2024-07-05T00:00:00.000Z'),
    updatedDate: ('2024-07-06T00:00:00.000Z')
  },
  {
    _id: ('669d495865cd0df087117b7e'),
    case_number: '12346',
    symptoms: [
      { name: 'Dizziness', frequency: 6, severity: 4, intensity: 5 },
      { name: 'Memory loss', frequency: 4, severity: 6, intensity: 6 }
    ],
    doctorsNote: 'Follow-up visit recommended to reassess symptoms.',
    files: [ 'brain_scan4.jpg', 'report4.pdf' ],
    createdDate: ('2024-07-07T00:00:00.000Z'),
    updatedDate: ('2024-07-08T00:00:00.000Z')
  },
  {
    _id: ('669d495865cd0df087117b7f'),
    case_number: '12347',
    symptoms: [
      { name: 'Seizures', frequency: 7, severity: 8, intensity: 7 },
      { name: 'Numbness', frequency: 5, severity: 4, intensity: 5 }
    ],
    doctorsNote: 'Patient requires immediate medical attention and monitoring.',
    files: [ 'brain_scan5.jpg', 'report5.pdf' ],
    createdDate: ('2024-07-09T00:00:00.000Z'),
    updatedDate: ('2024-07-10T00:00:00.000Z')
  },
  {
    _id: ('669d495865cd0df087117b80'),
    case_number: '12347',
    symptoms: [
      { name: 'Seizures', frequency: 7, severity: 8, intensity: 7 },
      { name: 'Numbness', frequency: 5, severity: 4, intensity: 5 }
    ],
    doctorsNote: 'Continued monitoring and follow-up visit required.',
    files: [ 'brain_scan6.jpg', 'report6.pdf' ],
    createdDate: ('2024-07-11T00:00:00.000Z'),
    updatedDate: ('2024-07-12T00:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c35'),
    case_number: 'CN001',
    symptoms: [ { name: 'Tremor', frequency: 8, severity: 6, intensity: 7 } ],
    doctorsNote: 'Patient needs regular check-ups and medication.',
    files: [ 'brain_scan1.jpg', 'report1.pdf' ],
    createdDate: ('2024-07-01T04:00:00.000Z'),
    updatedDate: ('2024-07-01T04:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c36'),
    case_number: 'CN001',
    symptoms: [ { name: 'Headache', frequency: 5, severity: 5, intensity: 4 } ],
    doctorsNote: 'Patient should continue current treatment and monitor symptoms.',
    files: [ 'brain_scan2.jpg', 'report2.pdf' ],
    createdDate: ('2024-06-01T04:00:00.000Z'),
    updatedDate: ('2024-06-01T04:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c37'),
    case_number: 'CN001',
    symptoms: [ { name: 'Dizziness', frequency: 6, severity: 4, intensity: 5 } ],
    doctorsNote: 'Patient should get plenty of rest and follow prescribed medication.',
    files: [ 'brain_scan3.jpg', 'report3.pdf' ],
    createdDate: ('2024-05-01T04:00:00.000Z'),
    updatedDate: ('2024-05-01T04:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c38'),
    case_number: 'CN001',
    symptoms: [
      { name: 'Memory loss', frequency: 4, severity: 6, intensity: 6 }
    ],
    doctorsNote: 'Patient needs further tests and possible surgery.',
    files: [ 'brain_scan4.jpg', 'report4.pdf' ],
    createdDate: ('2024-04-01T04:00:00.000Z'),
    updatedDate: ('2024-04-01T04:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c39'),
    case_number: 'CN001',
    symptoms: [ { name: 'Tremor', frequency: 8, severity: 6, intensity: 7 } ],
    doctorsNote: 'Patient advised to reduce stress and maintain a healthy diet.',
    files: [ 'brain_scan5.jpg', 'report5.pdf' ],
    createdDate: ('2024-03-01T05:00:00.000Z'),
    updatedDate: ('2024-03-01T05:00:00.000Z')
  },
  {
    _id: ('669d6cd765cd0df087117c3a'),
    case_number: 'CN001',
    symptoms: [ { name: 'Headache', frequency: 5, severity: 5, intensity: 4 } ],
    doctorsNote: 'Patient needs regular check-ups and medication.',
    files: [ 'brain_scan1.jpg', 'report1.pdf' ],
    createdDate: ('2024-02-01T05:00:00.000Z'),
    updatedDate: ('2024-02-01T05:00:00.000Z')
  }
]






const user = [
  {
    _id: ('6691cb7430715c2b5113d108'),
    username: 'saksham',
    password: '$2b$10$88kfjbt34cHDwgL24QCXyOGfMNpHPBQ6tdtwlaoDj.F2aY2pQkN6a',
    phone: '6478973702',
    email: 'saksham5sachdeva@gmail.com',
    firstname: 'saksham',
    lastname: 'sachdeva',
    role: 'ADMIN',
    __v: 0
  },
  {
    _id: ('669296453a5e6ad33ad6603a'),
    username: 'kukshi0124shi',
    password: '$2b$10$W3LxxjzzCDG0QsxbwbxIUusKAIuglTbkyRH5N/aKk4cklxT.zPnum',
    phone: '6478973702',
    email: 'shilpakukreja786@gmail.com',
    firstname: 'shilpa',
    lastname: 'kukreja',
    role: 'USER',
    __v: 0
  },
  {
    _id: ('6696d68768a0b306a2f7049a'),
    username: 'nitshabic6825',
    password: '$2b$10$aCM7uaR1mrGwHtNGlNrQ4uCx9E63ZxShQoxVPxZZs4Vx1T8xvi4oq',
    phone: '6478973702',
    email: 'bichor293@gmail.com',
    firstname: 'nitin',
    lastname: 'sharma',
    role: 'USER',
    __v: 0
  },
  {
    _id: ('669ac923a87c4392ea117b7b'),
    username: 'user1',
    password: '$2b$10$eW5ixFV2KHD7Fn2YOthSfO/U7jtVEWEtVPnsHVbmOYy0yZ7m1dyMu',
    phone: '1234567890',
    email: 'user1@example.com',
    firstname: 'John',
    lastname: 'Doe',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b7c'),
    username: 'user2',
    password: '$2b$10$hO8g3k6p9EV8zJQIvnlrDe6yEFuFo5/h5swF9PvsbfR6dR5KQ9zUm',
    phone: '2345678901',
    email: 'user2@example.com',
    firstname: 'Jane',
    lastname: 'Smith',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b7d'),
    username: 'admin1',
    password: '$2b$10$7w2TjvWRCfGFO1OW2rZnNOUeGZPPZUVzI9QOPx04sIMmOZpi5z7Ue',
    phone: '3456789012',
    email: 'admin1@example.com',
    firstname: 'Alice',
    lastname: 'Johnson',
    role: 'ADMIN'
  },
  {
    _id: ('669ac923a87c4392ea117b7e'),
    username: 'user3',
    password: '$2b$10$2K/dQxAup/BF1XZxN/XQ9OZ8Zq1l0Ne2HkIINiGyUGD3H8LMNSz4C',
    phone: '4567890123',
    email: 'user3@example.com',
    firstname: 'Bob',
    lastname: 'Brown',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b7f'),
    username: 'user4',
    password: '$2b$10$No6.k1in/7K4GnngYPFNOuwfI1y9HCHsXk5RMymzGAs48jAhPzQf6',
    phone: '5678901234',
    email: 'user4@example.com',
    firstname: 'Charlie',
    lastname: 'Davis',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b80'),
    username: 'user5',
    password: '$2b$10$dJOf2uAeUdtDIFj10n9jKuEYdxX2Op5u5gA5hIApDOrRJSKRI79H2',
    phone: '6789012345',
    email: 'user5@example.com',
    firstname: 'David',
    lastname: 'Evans',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b81'),
    username: 'user6',
    password: '$2b$10$82Xt/Kj3kFV/1DpiX5C5S.jVFVqE5TxG98d6zcofqF73Jt3WhRLoG',
    phone: '7890123456',
    email: 'user6@example.com',
    firstname: 'Emma',
    lastname: 'Wilson',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b82'),
    username: 'user7',
    password: '$2b$10$eGeVnZFuATVpzGNS/gIojOP6L4NzxtiY5q7zyyWnngVtbAlD0TB16',
    phone: '8901234567',
    email: 'user7@example.com',
    firstname: 'Frank',
    lastname: 'Thomas',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b83'),
    username: 'user8',
    password: '$2b$10$8LOabGZfOB.Q5DmnTv8H0Ok9sfvQf5DS6kKgX.JIjdf6XMEqO7EGK',
    phone: '9012345678',
    email: 'user8@example.com',
    firstname: 'Grace',
    lastname: 'White',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b84'),
    username: 'user9',
    password: '$2b$10$xnwPJo9rxV2F/3smN.5J0uRBoVv/VAd.Xj1HjlsoExrRm2/nPsp2K',
    phone: '0123456789',
    email: 'user9@example.com',
    firstname: 'Hannah',
    lastname: 'Harris',
    role: 'USER'
  },
  {
    _id: ('669ac923a87c4392ea117b85'),
    username: 'user10',
    password: '$2b$10$S4L.K5GzDXc/gO0Pa7PyS./s27gypOFPAqRtPugYh7MSZYRLq9Hxa',
    phone: '1023456789',
    email: 'user10@example.com',
    firstname: 'Isaac',
    lastname: 'Lewis',
    role: 'USER'
  }
]












const treatmentPlan = [
  {
    _id: ('66842897da689049ab7c70db'),
    patient_id: 'CN001',
    medication: [
      {
        nameOfMedicine: 'dsfs',
        dose: '32',
        frequency: '2',
        duration: '2',
        _id: ('668c9d362bfff6e5f5baf81d')
      },
      {
        nameOfMedicine: 'dskj',
        dose: '4',
        frequency: '2',
        duration: '4',
        _id: ('6695a72bf82d3b3d27c7e955')
      }
    ],
    therapy: [
      {
        nameOfTherapy: 'saksham',
        duration: '2',
        durationUnit: 'Weeks',
        _id: ('6688a7315961bf56eb8cf1e4')
      },
      {
        nameOfTherapy: 'sdasd',
        duration: '2',
        durationUnit: 'Weeks',
        _id: ('668c9d0b2bfff6e5f5baf7df')
      }
    ],
    doctor_id: '5678',
    createdDate: ('2024-07-02T16:19:35.530Z'),
    updatedDate: ('2024-07-02T16:19:35.543Z'),
    __v: 0
  }
]



const userConfig = [
  {
    _id: ('669af61d56cdd94cda4fce24'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('6691cb7430715c2b5113d108'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.637Z'),
    updatedDate: ('2024-07-19T23:26:21.637Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce25'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669296453a5e6ad33ad6603a'),
    config: { statistics: 0, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.638Z'),
    updatedDate: ('2024-07-19T23:26:21.638Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce26'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('6696d68768a0b306a2f7049a'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.638Z'),
    updatedDate: ('2024-07-19T23:26:21.638Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce27'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b7b'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.638Z'),
    updatedDate: ('2024-07-19T23:26:21.638Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce28'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b7c'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.638Z'),
    updatedDate: ('2024-07-19T23:26:21.638Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce29'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b7d'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2a'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b7e'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2b'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b7f'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2c'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b80'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2d'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b81'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2e'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b82'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.639Z'),
    updatedDate: ('2024-07-19T23:26:21.639Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce2f'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b83'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce30'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b84'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce31'),
    patient_id: ('669adf73a87c4392ea117b86'),
    doctor_id: ('669ac923a87c4392ea117b85'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce32'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('6691cb7430715c2b5113d108'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce33'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('669296453a5e6ad33ad6603a'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce34'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('6696d68768a0b306a2f7049a'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce35'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('669ac923a87c4392ea117b7b'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce36'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('669ac923a87c4392ea117b7c'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.640Z'),
    updatedDate: ('2024-07-19T23:26:21.640Z'),
    __v: 0
  },
  {
    _id: ('669af61d56cdd94cda4fce37'),
    patient_id: ('669adf73a87c4392ea117b87'),
    doctor_id: ('669ac923a87c4392ea117b7d'),
    config: { statistics: 1, note: 1, history: 1, files: 1 },
    createDate: ('2024-07-19T23:26:21.641Z'),
    updatedDate: ('2024-07-19T23:26:21.641Z'),
    __v: 0
  }
]



const patients = [
  {
    _id: ('669adf73a87c4392ea117b86'),
    case_number: 'CN001',
    name: 'John Doe',
    age: 45,
    disease: 'Hypertension',
    symptoms: [
      { name: 'Headache', frequency: 3, severity: 2, intensity: 4 },
      { name: 'Dizziness', frequency: 2, severity: 3, intensity: 2 }
    ],
    history: [ 'Family history of hypertension', 'Smoker' ],
    doctorsNote: {
      advice: 'Reduce salt intake',
      prescribedMedication: 'Amlodipine'
    },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b87'),
    case_number: 'CN002',
    name: 'Jane Smith',
    age: 37,
    disease: 'Diabetes',
    symptoms: [
      { name: 'Fatigue', frequency: 5, severity: 4, intensity: 3 },
      {
        name: 'Frequent urination',
        frequency: 4,
        severity: 3,
        intensity: 3
      }
    ],
    history: [ 'Overweight', 'Sedentary lifestyle' ],
    doctorsNote: { advice: 'Exercise regularly', prescribedMedication: 'Metformin' },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b88'),
    case_number: 'CN003',
    name: 'Emily Johnson',
    age: 29,
    disease: 'Asthma',
    symptoms: [
      {
        name: 'Shortness of breath',
        frequency: 4,
        severity: 3,
        intensity: 4
      },
      { name: 'Wheezing', frequency: 3, severity: 3, intensity: 3 }
    ],
    history: [ 'Allergies', 'Family history of asthma' ],
    doctorsNote: {
      advice: 'Use inhaler as needed',
      prescribedMedication: 'Albuterol'
    },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b89'),
    case_number: 'CN004',
    name: 'Michael Brown',
    age: 50,
    disease: 'Arthritis',
    symptoms: [
      { name: 'Joint pain', frequency: 4, severity: 4, intensity: 4 },
      { name: 'Stiffness', frequency: 3, severity: 3, intensity: 3 }
    ],
    history: [ 'Old sports injury' ],
    doctorsNote: { advice: 'Physical therapy', prescribedMedication: 'Ibuprofen' },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8a'),
    case_number: 'CN005',
    name: 'Sarah Davis',
    age: 34,
    disease: 'Migraine',
    symptoms: [
      {
        name: 'Severe headache',
        frequency: 5,
        severity: 5,
        intensity: 5
      },
      { name: 'Nausea', frequency: 4, severity: 3, intensity: 3 }
    ],
    history: [ 'Stress', 'Family history of migraines' ],
    doctorsNote: { advice: 'Avoid triggers', prescribedMedication: 'Sumatriptan' },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8b'),
    case_number: 'CN006',
    name: 'David Wilson',
    age: 60,
    disease: 'COPD',
    symptoms: [
      {
        name: 'Chronic cough',
        frequency: 4,
        severity: 3,
        intensity: 4
      },
      {
        name: 'Shortness of breath',
        frequency: 3,
        severity: 4,
        intensity: 3
      }
    ],
    history: [ 'Smoker', 'Exposure to pollutants' ],
    doctorsNote: { advice: 'Quit smoking', prescribedMedication: 'Tiotropium' },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8c'),
    case_number: 'CN007',
    name: 'Laura Martinez',
    age: 42,
    disease: 'Depression',
    symptoms: [
      { name: 'Sadness', frequency: 5, severity: 4, intensity: 4 },
      { name: 'Insomnia', frequency: 3, severity: 3, intensity: 3 }
    ],
    history: [ 'Family history of depression' ],
    doctorsNote: { advice: 'Therapy sessions', prescribedMedication: 'Sertraline' },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8d'),
    case_number: 'CN008',
    name: 'James Anderson',
    age: 55,
    disease: 'Chronic Kidney Disease',
    symptoms: [
      { name: 'Fatigue', frequency: 4, severity: 3, intensity: 3 },
      { name: 'Swelling', frequency: 3, severity: 3, intensity: 2 }
    ],
    history: [ 'Diabetes', 'Hypertension' ],
    doctorsNote: {
      advice: 'Control blood sugar and pressure',
      prescribedMedication: 'Lisinopril'
    },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8e'),
    case_number: 'CN009',
    name: 'Barbara Thomas',
    age: 48,
    disease: 'Anxiety',
    symptoms: [
      { name: 'Restlessness', frequency: 4, severity: 3, intensity: 3 },
      { name: 'Palpitations', frequency: 3, severity: 3, intensity: 2 }
    ],
    history: [ 'Family history of anxiety disorders' ],
    doctorsNote: {
      advice: 'Practice relaxation techniques',
      prescribedMedication: 'Buspirone'
    },
    files: []
  },
  {
    _id: ('669adf73a87c4392ea117b8f'),
    case_number: 'CN010',
    name: 'Robert Jackson',
    age: 65,
    disease: 'Heart Disease',
    symptoms: [
      { name: 'Chest pain', frequency: 3, severity: 4, intensity: 4 },
      {
        name: 'Shortness of breath',
        frequency: 2,
        severity: 3,
        intensity: 3
      }
    ],
    history: [ 'High cholesterol', 'Family history of heart disease' ],
    doctorsNote: { advice: 'Healthy diet', prescribedMedication: 'Aspirin' },
    files: []
  }
]

async function createdatabase() {


    try {
        await mongoose.connect('mongodb://localhost:27017/neurostack', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
          });
        
        console.log("Deleting existing  database...");
        console.log("removing all users ...");
        await User.deleteMany({})
        console.log("removing patients...")
        await Patient.deleteMany({});
        console.log("removing patient Records ..")
        await PatientRecords.deleteMany({});
        console.log("Removing userConfig..")
        await UserConfig.deleteMany({})
        console.log("Removing all treatment plans ..")
        await TreatmentPlan.deleteMany({});


        console.log("Creating sample database..")
        console.log("adding  users ...");
        await User.insertMany(user)
        console.log("adding patients...")
        await Patient.insertMany(patients);
        console.log("adding patient Records ..")
        await PatientRecords.insertMany(patientRecords);
        console.log("adding userConfig..")
        await UserConfig.insertMany(userConfig)
        console.log("adding all treatment plans ..")
        await TreatmentPlan.insertMany(treatmentPlan);

        console.log("sample database created successfully::")
        console.log("closing mongo connection..")

        mongoose.connection.close();
        

    } catch (err) {
        console.log("error occured while adding data");
        console.log(err);

    }
   



}

createdatabase()