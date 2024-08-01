import React, { useState, useEffect } from 'react';
import Handsontable from 'handsontable';
import { HotTable } from '@handsontable/react';
import 'handsontable/dist/handsontable.full.min.css';
import classes from './doctorNotes.module.css';

const DoctorNotes = ({ initialData, onSave }) => {
  const [data, setData] = useState(initialData);

  useEffect(() => {
    setData(initialData);
  }, [initialData]);

  const handleAfterChange = (changes, source) => {
    if (source === 'loadData' || !changes) {
      return;
    }

    const updatedData = [...data];

    changes.forEach(([row, prop, oldValue, newValue]) => {
      if (oldValue !== newValue) {
        updatedData[row][prop] = newValue;
      }
    });

    setData(updatedData);
  };

  const addRow = () => {
    setData(prevData => [...prevData, ['', '']]);
  };

  const deleteRow = (index) => {
    setData(prevData => prevData.filter((_, i) => i !== index));
  };

  const deleteLastRow = () => {
    setData(prevData => prevData.slice(0, -1));
  };

  // const saveNotes = () => {
  //   const notes = data.map(row => `${row[0]}: ${row[1]}`).join('\n');
  //   const blob = new Blob([notes], { type: 'text/plain' });
  //   const url = URL.createObjectURL(blob);
  //   const today = new Date().toISOString().split('T')[0];
  //   const fileName = `${today}-doctor-note.txt`;

  //   onSave({ name: fileName, url });

  //   setData(initialData);
  // };

  const saveNotes = () => {
      // Map data array to an array of objects
      const note = {}
      const formattedData = data.map(row => {
        note[row[0]] = row[1]
      });
    // const jsonData = JSON.stringify(formattedData);
    const jsonData = JSON.stringify(note);
    const today = new Date().toISOString().split('T')[0];
    const fileName = `${today}-doctor-note.json`;

    console.log("Data being saved:",  note);

  };

  return (
    <div className={classes.doctorNotesContainer}>
      <div className={classes.doctorNotes}>
        <h2 className={classes.heading}>Doctor's Notes</h2>
        <HotTable
          data={data}
          colHeaders={['Date', 'Notes']}
          rowHeaders={true}
          width="100%"
          height="100%"
          stretchH="all"
          colWidths={[150, 600, 100]}
          autoRowSize={true}
          autoColumnSize={true}
          readOnly={true}
          afterChange={handleAfterChange}
          cells={(row, col) => {
            const cellProperties = {};
            if (col === 1) {
              cellProperties.renderer = 'text';
              cellProperties.wordWrap = true;
              
            }
            if (col === 2) {
              cellProperties.renderer = (instance, td, row, col, prop, value, cellProperties) => {
                const button = document.createElement('button');
                button.innerHTML = 'Delete Row';
                button.onclick = () => deleteRow(row);
                td.appendChild(button);
                return td;
              };
            }
            return cellProperties;
          }}
          licenseKey="non-commercial-and-evaluation"
        />
        {/* <div className={classes.buttonContainer}>
          <button onClick={addRow} className={classes.addButton}>Add Row</button>
          <button onClick={deleteLastRow} className={classes.deleteButton}>Delete Row</button>
          <button onClick={saveNotes} className={classes.saveButton}>Save</button>
        </div> */}
      </div>
    </div>
  );
};

export default DoctorNotes;
