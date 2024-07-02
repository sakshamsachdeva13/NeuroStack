// const Model = mongoose.model('TreatmentPlan');
const TreatmentPlan = require("../../../models/TreatmentPlan");

const read = async (Model, req, res) => {
  //  write code to fetch  treatment plan
  //

  try {
    const patient_id = req.body.patient_id || null;

    if (!patient_id) {
      res.status(400).json({
        message: "bad Request !",
        success: false,
        result: null,
      });
    }

    const result = await TreatmentPlan.findOne({ patient_id });
    if (result) {
      res.status(200).json({
        result,
        success: true,
        message: "Record Found!",
      });
    } else {
      res.status(404).json({
        result,
        success: false,
        message: "Record not found for given patient's id",
      });
    }
  } catch (err) {
    res.status(500).json({
      result: err,
      success: false,
      message: "Internal Server Error",
    });
  }

  
};

module.exports = read;
