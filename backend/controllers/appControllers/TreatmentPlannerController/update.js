// const Model = mongoose.model('TreatmentPlan');
const TreatmentPlan = require("../../../models/TreatmentPlan");

const update = async (Model, req, res) => {
  // create treatment plan here;

  try {
   
    const result = await TreatmentPlan.findOneAndUpdate({patient_id : req.body.patient_id} , req.body);
    console.log(result);
    if (result._id) {
      return res.status(201).json({
        result: result,
        success: true,
        message: "Treatment Plan updated SuccessFully",
      });
    } else {
      return  res.status(400).json({
        result: null,
        success: false,
        message: "Bad Request !",
      });
    }
  } catch (err) {
    return res.status(500).json({
      result: err,
      success: false,
      message: err.message,
    });
  }

  // const sample = {
  //     "patient_id": "67890",
  //     "medication": [
  //       {
  //         "nameOfMedicine": "Levodopa",
  //         "dose": "500 mg",
  //         "frequency": "3 times a day",
  //         "duration": "Indefinite"
  //       },
  //       {
  //         "nameOfMedicine": "Pramipexole",
  //         "dose": "1.5 mg",
  //         "frequency": "1 time a day",
  //         "duration": "Indefinite"
  //       }
  //     ],
  //     "therapy": [
  //       {
  //         "nameOfTherapy": "Speech Therapy",
  //         "frequency": "1 time a week"
  //       },
  //       {
  //         "nameOfTherapy": "Occupational Therapy",
  //         "frequency": "2 times a week"
  //       }
  //     ],
  //     "doctor_id": "54321"
  //   }

  res.send("flow working fine");
  // console.log()
};

module.exports = update;
