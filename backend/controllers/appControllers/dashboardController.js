const PatientRecords = require("../../models/PatientRecords");
const Patient = require("../../models/Patient");
const mongoose = require("mongoose");

function processPatientData(data) {
//   console.log(data);
  const processedData = {
    case_number: data.case_number,
    symptoms: data.symptoms.map((symptom) => ({
      name: symptom.name,
      frequency: {
        [data.createdDate.split("T")[0].replace(/-/g, "")]: symptom.frequency,
      },
      severity: {
        [data.createdDate.split("T")[0].replace(/-/g, "")]: symptom.severity,
      },
      intensity: {
        [data.createdDate.split("T")[0].replace(/-/g, "")]: symptom.intensity,
      },
    })),
    doctorsNote: data.doctorsNote,
    files: data.files,
    createdDate: data.createdDate,
    updatedDate: data.updatedDate,
  };

  return processedData;
}

const getPatientRecords = async (req, res) => {
  try {
    // console.log(req.body);
    const caseNumber = req.body.patientId;
    const fromDate = new Date(req.body.from);
    const toDate = new Date(req.body.to);
    console.log(caseNumber, fromDate, toDate);
    if (!(caseNumber && fromDate && toDate)) {
      return res.status(400).json({
        message: "Bad Request!!",
        success: false,
        result: [],
      });
    }

    const patientDetails = await Patient.findOne({ case_number: caseNumber });

    const patientRecords = await PatientRecords.aggregate([
      {
        $match: {
          case_number: caseNumber,
          createdDate: { $gte: fromDate, $lte: toDate },
        },
      },
      {
        $project: {
          _id: 0, // Exclude the _id field from the result
          case_number: 1,
          symptoms: 1,
          doctorsNote: 1,
          files: 1,
          createdDate: 1,
          updatedDate: 1,
        },
      },
    ]);
    // console.log(JSON.parse(JSON.stringify(patientRecords)))
    const dateMappedRecord = patientRecords.map((rec) => {
      return processPatientData(JSON.parse(JSON.stringify(rec)));
    });
    const groupSymptomResult = groupAndAccumulateSymptoms(dateMappedRecord);
    console.log(groupSymptomResult)
    // patientRecords.symptoms = groupSymptomResult;
    
    // console.log(JSON.stringify(patientRecords));

    if (patientRecords.length) {
      const result = {
        patientDetails: patientDetails,
        patientRecords: patientRecords,
      };

      return res.status(200).json({
        result: result,
        message: "data found",
        success: true,
      });
    } else {
      return res.status(404).json({
        result: [],
        message: "No Data Found, Try again with Different Filters",
        success: true,
      });
    }
  } catch (err) {
    console.log(err);
    return res.status(500).json({
      result: [],
      message: "Internal Server Error",
      success: false,
    });
  }
};

function groupAndAccumulateSymptoms(dataArray) {
  const groupedData = {};

  dataArray.forEach((data) => {


    data.symptoms.forEach((symptom) => {
      const { name, frequency, severity, intensity } = symptom;
        
      if (!groupedData[name]) {
        groupedData[name] = {
          name: name,
          frequency: {},
          severity: {},
          intensity: {},
        };
      }

      const dateKey = Object.keys(frequency)[0];
      groupedData[name].frequency[dateKey] =
        (groupedData[name].frequency[dateKey] || 0) + frequency[dateKey];
      groupedData[name].severity[dateKey] =
        (groupedData[name].severity[dateKey] || 0) + severity[dateKey];
      groupedData[name].intensity[dateKey] =
        (groupedData[name].intensity[dateKey] || 0) + intensity[dateKey];
    });
  });
  console.log(groupedData);
  return Object.values(groupedData);
}

module.exports = {
  getPatientRecords,
};
