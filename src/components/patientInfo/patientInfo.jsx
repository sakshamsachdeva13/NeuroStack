import React from 'react';
import classes from './patientInfo.module.css';

const PatientInfo = ({ patient }) => {
  // const patient = patients.find(patient => patient.id === patientId);
  // if (!patient) return null;
    console.log(patient)
  return (
    <div className={classes.patientInfo}>
      <h2 className={classes.heading}>Patient Information</h2>
      {patient.case_number ? (<table className={classes.infoTable}>
        <tbody>
        <tr>
            <td><strong>Case:</strong></td>
            <td>{patient.case_number}</td>
          </tr>
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
        </tbody>
      </table>) : (<h2>patient Info not available</h2>)}
    </div>
  );
};

export default PatientInfo;
