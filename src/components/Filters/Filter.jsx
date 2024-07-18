import React from 'react';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import styled from 'styled-components';
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

const StyledSelect = styled(Select)`
  .react-select__control {
    display: flex;
    flex-wrap: nowrap;
    overflow: hidden;
  }

  .react-select__value-container {
    display: flex;
    flex-wrap: nowrap;
    overflow-x: auto;
    overflow-y: hidden;
    white-space: nowrap;
  }

  .react-select__multi-value {
    display: inline-block;
    max-width: 50px; /* Adjust as necessary */
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }

  .react-select__multi-value__label {
    display: inline-block;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 20px; /* Adjust to fit two characters and ellipsis */
  }

  .react-select__multi-value__remove {
    display: inline-block;
  }
`;

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
    value: patient.id,
    label: `ID: ${patient.id}`
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
        <StyledSelect
          isMulti
          options={symptomSelectionOptions}
          value={symptomSelectionOptions.filter(option => symptomSelection.includes(option.value))}
          onChange={handleSymptomChange}
          placeholder="Select Symptoms"
          classNamePrefix="react-select"
        />
      </div>
      <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
    </div>
  );
};

export default Filter;
