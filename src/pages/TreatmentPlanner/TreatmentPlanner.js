import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import styles from './treatment.module.css';

const DynamicForm = () => {
  const [medications, setMedications] = useState([{ name: '', dose: '', frequency: '', frequencyUnit: '', duration: '', durationUnit: '' }]);
  const [therapies, setTherapies] = useState([{ name: '', duration: '', durationUnit: '' }]);
  const [isMedicationEditable, setIsMedicationEditable] = useState(false);
  const [isTherapyEditable, setIsTherapyEditable] = useState(false);

  const handleAddMedication = () => {
    setMedications([...medications, { name: '', dose: '', frequency: '', frequencyUnit: '', duration: '', durationUnit: '' }]);
  };

  const handleRemoveMedication = (index) => {
    const newMedications = medications.filter((_, i) => i !== index);
    setMedications(newMedications);
  };

  const handleMedicationChange = (index, event) => {
    const { name, value } = event.target;
    const newMedications = medications.map((medication, i) => i === index ? { ...medication, [name]: value } : medication);
    setMedications(newMedications);
  };

  const handleAddTherapy = () => {
    setTherapies([...therapies, { name: '', duration: '', durationUnit: '' }]);
  };

  const handleRemoveTherapy = (index) => {
    const newTherapies = therapies.filter((_, i) => i !== index);
    setTherapies(newTherapies);
  };

  const handleTherapyChange = (index, event) => {
    const { name, value } = event.target;
    const newTherapies = therapies.map((therapy, i) => i === index ? { ...therapy, [name]: value } : therapy);
    setTherapies(newTherapies);
  };

  const validateName = (name) => /^[A-Za-z\s]+$/.test(name);

  const onSubmit = (event) => {
    event.preventDefault();

    for (const medication of medications) {
      if (!validateName(medication.name)) {
        alert('Medication name must contain only alphabets');
        return;
      }
    }

    for (const therapy of therapies) {
      if (!validateName(therapy.name)) {
        alert('Therapy name must contain only alphabets');
        return;
      }
    }

    console.log('Medications:', medications);
    console.log('Therapies:', therapies);
  };

  const toggleMedicationEdit = () => {
    setIsMedicationEditable(!isMedicationEditable);
  };

  const toggleTherapyEdit = () => {
    setIsTherapyEditable(!isTherapyEditable);
  };

  return (
    <div className={`${styles.container} mt-5`}>
      <form onSubmit={onSubmit}>
        <div className={`${styles.formSection} mb-4 border p-0`}>
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <h5>Medication</h5>
            <div>
              <button type="button" className="btn btn-secondary btn-sm me-2" onClick={toggleMedicationEdit}>
                {isMedicationEditable ? 'Lock' : 'Edit'}
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleAddMedication}>+</button>
            </div>
          </div>
          <hr/>
          {medications.map((medication, index) => (
            <div key={index} className="input-group mb-3 px-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={medication.name}
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
                {[1, 2, 3, 4, 5].map(value => (
                  <option key={value} value={value}>{value}</option>
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                  <option key={value} value={value}>{value}</option>
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
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveMedication(index)} readOnly={!isMedicationEditable}>Delete</button>
            </div>
          ))}
        </div>

        <div className={`${styles.formSection} mb-4 border p-0`}>
          <div className="d-flex justify-content-between align-items-center mb-2 p-2">
            <h5>Therapy</h5>
            <div>
              <button type="button" className="btn btn-secondary btn-sm me-2" onClick={toggleTherapyEdit}>
                {isTherapyEditable ? 'Lock' : 'Edit'}
              </button>
              <button type="button" className="btn btn-primary btn-sm" onClick={handleAddTherapy}>+</button>
            </div>
          </div>
          <hr/>
          {therapies.map((therapy, index) => (
            <div key={index} className="input-group mb-3 px-3">
              <input
                type="text"
                name="name"
                placeholder="Name"
                value={therapy.name}
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
                {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(value => (
                  <option key={value} value={value}>{value}</option>
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
              <button type="button" className="btn btn-danger" onClick={() => handleRemoveTherapy(index)} readOnly={!isTherapyEditable}>Delete</button>
            </div>
          ))}
        </div>

        <button type="submit" className="btn btn-success">Submit</button>
      </form>
    </div>
  );
};

export default DynamicForm;
