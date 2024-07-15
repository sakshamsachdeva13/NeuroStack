import React from 'react';
import classes from './patientHistory.module.css';

// const PatientHistory = ({ history }) => {
//   if (!history || history.length === 0) return <p>No history available.</p>;

const PatientHistory = ({ patientId, patients }) => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) return null;

  return (
    <div className={classes.patientHistory}>
      <h2 className={classes.heading}>Patient History</h2>
      <ul className={classes.patientHistoryText}>
        {patient.history.map((entry, index) => (
          <li key={index}>{entry}</li>
        ))}
      </ul>
    </div>
  );
};

export default PatientHistory;
