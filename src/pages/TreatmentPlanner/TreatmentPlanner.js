import React, { useState, useEffect, useCallback } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styles from "./treatment.module.css";
import { useDispatch, useSelector } from "react-redux";
import * as actions from "../../store/actions/index.action";
import { Autocomplete, TextField } from "@mui/material";

const DynamicForm = () => {
  const dispatch = useDispatch();
  const createTP = (reqBody) => dispatch(actions.createTreatmentPlan(reqBody));
  const getPatientData = useCallback(
    () => dispatch(actions.getPatientData()),
    [dispatch]
  );
  const setTp = useCallback(
    (reqBody) => dispatch(actions.getTreatmentPlan(reqBody)),
    [dispatch]
  );
  const updateTp = (reqBody) => dispatch(actions.updateTreatmentPlan(reqBody));
  const treatmentPlanFormData = useSelector(
    (state) => state.treatmentPlan.treatmentPlan
  );
  const [medications, setMedications] = useState([
    {
      nameOfMedicine: "",
      dose: "",
      frequency: "",
      frequencyUnit: "",
      duration: "",
      durationUnit: "",
    },
  ]);
  const [therapies, setTherapies] = useState([
    { nameOfTherapy: "", duration: "", durationUnit: "" },
  ]);
  const [isMedicationEditable, setIsMedicationEditable] = useState(false);
  const [isTherapyEditable, setIsTherapyEditable] = useState(false);
  const [selectedPatient, setSelectedPatient] = useState("");
  const patientData = useSelector((state) => state.admin.patientData);

  useEffect(() => {
    getPatientData();
  }, []);
  // useEffect(() => {
  //   console.log("page update");
  //   setTp({ patient_id: "1234" });
  // }, [setTp]);

  useEffect(() => {
    console.log(treatmentPlanFormData);
    const { medication, therapy } = treatmentPlanFormData;

    setMedications(medication || []);
    setTherapies(therapy || []);
  }, [treatmentPlanFormData]);

  const handleAddMedication = () => {
    setMedications([
      ...medications,
      {
        nameOfMedicine: "",
        dose: "",
        frequency: "",
        frequencyUnit: "",
        duration: "",
        durationUnit: "",
      },
    ]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (index, event) => {
    const { name, value } = event.target;
    const newMedications = medications.map((medication, i) =>
      i === index ? { ...medication, [name]: value } : medication
    );
    setMedications(newMedications);
  };

  const handleAddTherapy = () => {
    setTherapies([
      ...therapies,
      { nameOfTherapy: "", duration: "", durationUnit: "" },
    ]);
  };

  const handleRemoveTherapy = (index) => {
    const newTherapies = therapies.filter((_, i) => i !== index);
    setTherapies(newTherapies);
  };

  const handleTherapyChange = (index, event) => {
    const { name, value } = event.target;
    const newTherapies = therapies.map((therapy, i) =>
      i === index ? { ...therapy, [name]: value } : therapy
    );
    setTherapies(newTherapies);
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

  const onSubmit = (event) => {
    event.preventDefault();
    const requestBody = {};

    requestBody.patient_id = "1234";
    requestBody.doctor_id = "5678";
    for (const medication of medications) {
      if (!validateName(medication.nameOfMedicine)) {
        alert("Medication name must contain only alphabets");
        return;
      }
    }

    requestBody.medication = medications;

    for (const therapy of therapies) {
      if (!validateName(therapy.nameOfTherapy)) {
        alert("Therapy name must contain only alphabets");
        return;
      }
    }
    requestBody.therapy = therapies;

    if (treatmentPlanFormData._id) {
      requestBody._id = treatmentPlanFormData._id;
      requestBody.medication._id = treatmentPlanFormData.medication._id;
      requestBody.therapy._id = treatmentPlanFormData.therapy._id;
      updateTp(requestBody);
    } else {
      createTP(requestBody);
    }
  };

  const toggleMedicationEdit = () => {
    setIsMedicationEditable(!isMedicationEditable);
  };

  const toggleTherapyEdit = () => {
    setIsTherapyEditable(!isTherapyEditable);
  };

  const handlePatientSelection = (e, value) => {
    setSelectedPatient(value);
    // console.log(e.target.value);
  };

  const fetchSelectedPatientPlan = () => {
    const case_number = selectedPatient.split("-")[1];
    console.log(case_number);
    setTp({
      patient_id: case_number,
    });

  };
  const preparedPatientList = (patientData) => {
    return patientData.length
      ? patientData.map((ele) => {
          return `${ele.name}-${ele.case_number}`;
        })
      : [];
  };

  return (
    <div className={`${styles.container} mt-5`}>
      <div className={styles.selectPatient}>
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={preparedPatientList(patientData)}
          onChange={handlePatientSelection}
          sx={{ width: 300 }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Patient"
              onChange={handlePatientSelection}
            />
          )}
        />
        <button onClick={fetchSelectedPatientPlan}>Submit</button>
      </div>
      <form onSubmit={onSubmit}>
        <div className={`${styles.formSection} mb-4 border p-0`}>
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <h5>Medication</h5>
            <div>
              <button
                type="button"
                className="btn btn-secondary btn-sm me-2"
                onClick={toggleMedicationEdit}
              >
                {isMedicationEditable ? "Lock" : "Edit"}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleAddMedication}
              >
                +
              </button>
            </div>
          </div>
          <hr />
          {medications.map((medication, index) => (
            <div key={index} className="input-group mb-3 px-3">
              <input
                type="text"
                name="nameOfMedicine"
                placeholder="Name"
                value={medication.nameOfMedicine}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              />
              <input
                type="text"
                name="dose"
                placeholder="Dose"
                value={medication.dose}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              />
              <select
                name="frequency"
                value={medication.frequency}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              >
                <option value="">Frequency</option>
                {[1, 2, 3, 4, 5].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                name="frequencyUnit"
                value={medication.frequencyUnit}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              >
                <option value="">Select Unit</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
              </select>
              <select
                name="duration"
                value={medication.duration}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              >
                <option value="">Duration</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                name="durationUnit"
                value={medication.durationUnit}
                onChange={(event) => handleMedicationChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isMedicationEditable}
              >
                <option value="">Select Unit</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveMedication(index)}
                readOnly={!isMedicationEditable}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <div className={`${styles.formSection} mb-4 border p-0`}>
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <h5>Therapy</h5>
            <div>
              <button
                type="button"
                className="btn btn-secondary btn-sm me-2"
                onClick={toggleTherapyEdit}
              >
                {isTherapyEditable ? "Lock" : "Edit"}
              </button>
              <button
                type="button"
                className="btn btn-primary btn-sm"
                onClick={handleAddTherapy}
              >
                +
              </button>
            </div>
          </div>
          <hr />
          {therapies.map((therapy, index) => (
            <div key={index} className="input-group mb-3 px-3">
              <input
                type="text"
                name="nameOfTherapy"
                placeholder="Name"
                value={therapy.nameOfTherapy}
                onChange={(event) => handleTherapyChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isTherapyEditable}
              />
              <select
                name="duration"
                value={therapy.duration}
                onChange={(event) => handleTherapyChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isTherapyEditable}
              >
                <option value="">Duration</option>
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((value) => (
                  <option key={value} value={value}>
                    {value}
                  </option>
                ))}
              </select>
              <select
                name="durationUnit"
                value={therapy.durationUnit}
                onChange={(event) => handleTherapyChange(index, event)}
                className={`${styles.formControl} form-control me-2`}
                readOnly={!isTherapyEditable}
              >
                <option value="">Select Unit</option>
                <option value="Days">Days</option>
                <option value="Weeks">Weeks</option>
                <option value="Months">Months</option>
                <option value="Years">Years</option>
              </select>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => handleRemoveTherapy(index)}
                readOnly={!isTherapyEditable}
              >
                Delete
              </button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success">
          Submit
        </button>
      </form>
    </div>
  );
};

export default DynamicForm;
