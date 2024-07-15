import React from 'react';
import classes from './patientFiles.module.css';

const PatientFiles = ({ files }) => {
  // if (!files || files.length === 0) return null;

  return (
    <div className={classes.patientFiles}>
      <h2 className={classes.heading}>Patient Files</h2>
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} download={file.name}>{file.name}</a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PatientFiles;
