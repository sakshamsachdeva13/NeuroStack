import React from 'react';
import classes from './patientFiles.module.css';

const PatientFiles = ({ files }) => {
  // if (!files || files.length === 0) return null;
  return (
    <div className={classes.patientFiles}>
      <h2 className={classes.heading}>Patient Files</h2>
      {files && files.length > 0 ? (
      <ul>
        {files.map((file, index) => (
          <li key={index}>
            <a href={file.url} download={file.name}>{file}</a>
          </li>
        ))}
      </ul>
      ) : (
         <p className={classes.noFilesMessage}>No Files</p>
      )}
    </div>
  );
};

export default PatientFiles;
