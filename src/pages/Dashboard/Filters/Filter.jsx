import React from 'react'

const Filter = () => {
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
        value={patientSelection}
        onChange={setPatientSelection}
        placeholder="Select Patient"
      />
    </div>
    <div className={styles.filter}>
      <label>Symptom Selection</label>
      <Select
        options={symptomSelectionOptions}
        isMulti
        value={symptomSelection}
        onChange={setSymptomSelection}
        placeholder="Select Symptoms"
      />
    </div>
    <button onClick={handleSubmit} className={styles.submitButton}>Submit</button>
  </div>
  )
}

export default Filter