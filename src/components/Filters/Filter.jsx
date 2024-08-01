import React from "react";
import Select from "react-select";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import styles from "./Filter.module.css";

const symptomScaleOptions = [
  { value: "Severity", label: "Severity" },
  { value: "Frequency", label: "Frequency" },
  { value: "Intensity", label: "Intensity" },
]
const Filter = ({
  timeRange,
  setTimeRange,
  symptomScale,
  setSymptomScale,
  patientSelection,
  setPatientSelection,
  symptomSelection,
  setSymptomSelection,
  symptomSelectionOptions,
  handleSubmit,
  patients = [],
}) => {
  const handlePatientChange = (selectedOption) => {
    setPatientSelection(selectedOption);
  };

  const handleSymptomChange = (selectedOptions) => {
    setSymptomSelection(
      selectedOptions ? selectedOptions.map((option) => option.value) : []
    );
  };
  const handleSort = () => {

  }
  const patientOptions = patients.map((patient) => ({
    value: patient.case_number, // Assuming each patient object has an 'id' property
    label: `${patient.name}  (${patient.case_number})`,
  }));

  return (
    <>
      <div className={styles.filters}>
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

        <button onClick={handleSubmit} className={styles.submitButton}>
          Submit
        </button>
      </div>
      <div className={styles.localFilters}>


        { <div className={styles.filter}>
          <label>Symptom Scale</label>
          <Select
           isDisabled={!(symptomSelectionOptions.length>0)}
            options={symptomScaleOptions}
            value={symptomScale}
            onChange={setSymptomScale}
            placeholder="Select Scale"
          />
        </div>}

        <div className={styles.filter}>
          <label>Symptom Selection</label>
          <Select
            isDisabled={!(symptomSelectionOptions.length>0)}
            isMulti
            options={symptomSelectionOptions}
            value={symptomSelectionOptions.filter((option) =>
              symptomSelection.includes(option.value)
            )}
            onChange={handleSymptomChange}
            placeholder="Select Symptoms"
          />
        </div>
      </div>
    </>
  );
};

export default Filter;
