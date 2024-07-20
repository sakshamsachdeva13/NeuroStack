const mongoose = require('mongoose');
const UserConfig = require('../models/userConfig'); // Update the path to your UserConfig model file

const doctors = [
  '6691cb7430715c2b5113d108',
  '669296453a5e6ad33ad6603a',
  '6696d68768a0b306a2f7049a',
  '669ac923a87c4392ea117b7b',
  '669ac923a87c4392ea117b7c',
  '669ac923a87c4392ea117b7d',
  '669ac923a87c4392ea117b7e',
  '669ac923a87c4392ea117b7f',
  '669ac923a87c4392ea117b80',
  '669ac923a87c4392ea117b81',
  '669ac923a87c4392ea117b82',
  '669ac923a87c4392ea117b83',
  '669ac923a87c4392ea117b84',
  '669ac923a87c4392ea117b85',
];

const patients = [
  '669adf73a87c4392ea117b86',
  '669adf73a87c4392ea117b87',
  '669adf73a87c4392ea117b88',
  '669adf73a87c4392ea117b89',
  '669adf73a87c4392ea117b8a',
  '669adf73a87c4392ea117b8b',
  '669adf73a87c4392ea117b8c',
  '669adf73a87c4392ea117b8d',
  '669adf73a87c4392ea117b8e',
  '669adf73a87c4392ea117b8f',
];

async function createSampleData() {
  // Connect to MongoDB
  await mongoose.connect('mongodb://localhost:27017/neurostack', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });

  const initialConfig = {
    statistics: 1,
    note: 1,
    history: 1,
    files: 1,
  };

  const userConfigs = [];

  // Generate sample data
  patients.forEach((patientId) => {
    doctors.forEach((doctorId) => {
      userConfigs.push({
        patient_id: patientId,
        doctor_id: doctorId,
        config: initialConfig,
      });
    });
  });

  // Insert sample data into the UserConfig collection
  await UserConfig.insertMany(userConfigs);

  console.log('Sample data inserted successfully');

  // Close the database connection
  mongoose.connection.close();
}

createSampleData().catch((error) => {
  console.error('Error inserting sample data:', error);
});
