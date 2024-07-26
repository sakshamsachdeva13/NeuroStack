import React from "react";
import classes from "./patientHistory.module.css";

// const PatientHistory = ({ history }) => {
//   if (!history || history.length === 0) return <p>No history available.</p>;

const PatientHistory = ({ history }) => {
  // const patient = patients.find(patient => patient.id === patientId);
  // if (!patient) return null;

  return (
    <div className={classes.patientHistory}>
      <h2 className={classes.heading}>Patient History</h2>
      {history.length ? (
        <ul className={classes.patientHistoryText}>
          {history.map((entry, index) => (
            <li key={index}>{entry}</li>
          ))}
        </ul>
      ) : (
        <h1>No history available</h1>
      )}
    </div>
  );
};

export default PatientHistory;
