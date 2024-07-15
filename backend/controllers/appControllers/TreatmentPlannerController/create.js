// const Model = mongoose.model('TreatmentPlan');
const TreatmentPlan = require("../../../models/TreatmentPlan");

const create = async (Model, req, res) => {
  // create treatment plan here;

  console.log(Model);
  console.log(req.body);
  try {
    const result = await TreatmentPlan.create(req.body);
    console.log(result);
    if (result._id) {
      res.status(201).json({
        result: result,
        success: true,
        message: "Treatment Plan Created SuccessFully",
      });
    } else {
      res.status(400).json({
        result: null,
        success: false,
        message: "Bad Request !",
      });
    }
  } catch (err) {
    res.status(500).json({
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

module.exports = create;
