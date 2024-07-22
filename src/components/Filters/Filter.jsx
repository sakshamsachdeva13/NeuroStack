import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Filter.module.css';

const symptomScaleOptions = [
  { value: 'severity', label: 'Severity' },
  { value: 'frequency', label: 'Frequency' },
  { value: 'intensity', label: 'Intensity' },
];

const symptomSelectionOptions = [
  { value: 'paralysis', label: 'Paralysis' },
  { value: 'muscle-weakness', label: 'Muscle Weakness' },
  { value: 'poor-coordination', label: 'Poor Coordination' },
  { value: 'loss-of-sensation', label: 'Loss of Sensation' },
  { value: 'seizures', label: 'Seizures' },
];

const Filter = ({
  timeRange,
  setTimeRange,
  symptomScale,
  setSymptomScale,
  patientSelection,
  setPatientSelection,
  symptomSelection,
  setSymptomSelection,
  handleSubmit,
  patients = [],
}) => {
  const handlePatientChange = (selectedOption) => {
    setPatientSelection(selectedOption);
  };

  const handleSymptomChange = (selectedOptions) => {
    setSymptomSelection(selectedOptions ? selectedOptions.map(option => option.value) : []);
  };

  const patientOptions = patients.map(patient => ({
    value: patient.case_number, // Assuming each patient object has an 'id' property
    label: `${patient.name}  (${patient.case_number})`
  }));

  return (
    <div className={styles.filters}>
      <div className={styles.filter}>
        <label>Time Range</label>
        <div className={styles.datePickers}>
          <DatePicker
            selected={timeRange.from}
            onChange={(date) => setTimeRange({ ...timeRange, from: date })}
            selectsStart
            startDate={timeRange.from}
            endDate={timeRange.to}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="From"
            maxDate={new Date()}
          />
          <DatePicker
            selected={timeRange.to}
            onChange={(date) => setTimeRange({ ...timeRange, to: date })}
            selectsEnd
            startDate={timeRange.from}
            endDate={timeRange.to}
            dateFormat="MM/yyyy"
            showMonthYearPicker
            placeholderText="To"
            maxDate={new Date()}
          />
        </div>
      </div>
      <div className={styles.filter}>
        <label>Symptom Scale</label>
        <Select
          options={symptomScaleOptions}
          value={symptomScale}
          onChange={setSymptomScale}
          placeholder="Select Scale"
        />
      </div>
      <div className={styles.filter}>
        <label>Patient Selection</label>
        <Select
          options={patientOptions}
          value={patientSelection}
          onChange={handlePatientChange}
          placeholder="Select Patient"
        />
      </div>
      <div className={styles.filter}>
        <label>Symptom Selection</label>
        <Select
          isMulti
          options={symptomSelectionOptions}
          value={symptomSelectionOptions.filter(option => symptomSelection.includes(option.value))}
          onChange={handleSymptomChange}
          placeholder="Select Symptoms"
        />
      </div>
      <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
    </div>
  );
};

export default Filter;
