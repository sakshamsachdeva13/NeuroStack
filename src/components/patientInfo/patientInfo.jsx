import React from 'react';
import classes from './patientInfo.module.css';

const PatientInfo = ({ patientId, patients }) => {
  const patient = patients.find(patient => patient.id === patientId);
  if (!patient) return null;
  
  return (
    <div className={classes.patientInfo}>
      <h2 className={classes.heading}>Patient Information</h2>
      <table className={classes.infoTable}>
        <tbody>
          <tr>
            <td><strong>Name:</strong></td>
            <td>{patient.name}</td>
          </tr>
          <tr>
            <td><strong>Age:</strong></td>
            <td>{patient.age}</td>
          </tr>
          <tr>
            <td><strong>Disease:</strong></td>
            <td>{patient.disease}</td>
          </tr>
          <tr>
            <td><strong>Symptoms:</strong></td>
            <td>{patient.symptoms.join(', ')}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default PatientInfo;
