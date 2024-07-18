import React, { useState, useCallback, useEffect } from "react";
import { useSelector , useDispatch } from "react-redux";

import Chart from "../../components/Charts/chart";
import Filter from "../../components/Filters/Filter";
import DoctorNotes from "../../components/doctorNotes/doctorNotes";
import PatientInfo from "../../components/patientInfo/patientInfo";
import PatientHistory from "../../components/patientHistory/patientHistory";
import PatientFiles from "../../components/patientFiles/patientFiles";
import classes from "./Dashboard.module.css";

import * as actions from "../../store/actions/index.action";

// import Handsontable from 'handsontable';

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
  PieController,
  ArcElement
);

const demoPatients = [
  {
    id: "123",
    name: "John Doe",
    age: 45,
    disease: "Disease A",
    symptoms: ["Fever", "Cough", "Paralysis"],
    history: [
      "2024-07-06: Blood test done, results normal.",
      "2024-07-07: MRI scan completed, no abnormalities found.",
    ],
    files: [],
  },
  {
    id: "124",
    name: "Jane Smith",
    age: 30,
    disease: "Disease B",
    symptoms: ["Muscle Weakness", "Poor Coordination"],
    history: [
      "2024-07-05: Blood test done, elevated CPK levels.",
      "2024-07-06: Neurological exam shows mild weakness in limbs.",
    ],
    files: [],
  },
  {
    id: "125",
    name: "Alice Johnson",
    age: 60,
    disease: "Disease C",
    symptoms: ["Loss of Sensation", "Seizures"],
    history: [
      "2024-07-04: EEG shows abnormal activity.",
      "2024-07-05: Started on anti-seizure medication.",
    ],
    files: [],
  },
  {
    id: "126",
    name: "Bob Brown",
    age: 50,
    disease: "Disease D",
    symptoms: ["Paralysis", "Muscle Weakness"],
    history: [
      "2024-07-03: EMG shows reduced nerve conduction velocity.",
      "2024-07-04: Muscle biopsy performed, awaiting results.",
    ],
    files: [],
  },
];

const symptomDataMap = {
  paralysis: {
    labels: [
      "01/24",
      "02/24",
      "03/24",
      "04/24",
      "05/24",
      "06/24",
      "07/24",
      "08/24",
      "09/24",
      "10/24",
    ],
    datasets: [
      {
        label: "Severity",
        data: [3, 5, 4, 7, 6, 8, 7, 9, 8, 6],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Frequency",
        data: [6, 7, 5, 8, 7, 9, 8, 7, 6, 5],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Intensity",
        data: [4, 6, 5, 8, 7, 9, 6, 7, 8, 5],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
  "muscle-weakness": {
    labels: [
      "01/24",
      "02/24",
      "03/24",
      "04/24",
      "05/24",
      "06/24",
      "07/24",
      "08/24",
      "09/24",
      "10/24",
    ],
    datasets: [
      {
        label: "Severity",
        data: [4, 6, 5, 8, 7, 9, 8, 7, 6, 5],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Frequency",
        data: [5, 6, 4, 7, 6, 8, 7, 6, 5, 4],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Intensity",
        data: [3, 5, 4, 7, 6, 8, 5, 6, 7, 4],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
  "poor-coordination": {
    labels: [
      "01/24",
      "02/24",
      "03/24",
      "04/24",
      "05/24",
      "06/24",
      "07/24",
      "08/24",
      "09/24",
      "10/24",
    ],
    datasets: [
      {
        label: "Severity",
        data: [3, 4, 5, 6, 7, 8, 9, 7, 6, 5],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Frequency",
        data: [4, 5, 6, 7, 8, 9, 7, 6, 5, 4],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Intensity",
        data: [5, 6, 7, 8, 9, 7, 6, 5, 4, 3],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
  "loss-of-sensation": {
    labels: [
      "01/24",
      "02/24",
      "03/24",
      "04/24",
      "05/24",
      "06/24",
      "07/24",
      "08/24",
      "09/24",
      "10/24",
    ],
    datasets: [
      {
        label: "Severity",
        data: [2, 4, 3, 5, 4, 6, 5, 7, 6, 4],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Frequency",
        data: [3, 5, 4, 6, 5, 7, 6, 5, 4, 3],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Intensity",
        data: [4, 6, 5, 7, 6, 8, 7, 6, 5, 4],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
  seizures: {
    labels: [
      "01/24",
      "02/24",
      "03/24",
      "04/24",
      "05/24",
      "06/24",
      "07/24",
      "08/24",
      "09/24",
      "10/24",
    ],
    datasets: [
      {
        label: "Severity",
        data: [6, 5, 7, 6, 8, 7, 9, 8, 7, 6],
        backgroundColor: "rgba(255, 99, 132, 0.6)",
        borderColor: "rgba(255, 99, 132, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Frequency",
        data: [7, 6, 8, 7, 9, 8, 7, 6, 5, 4],
        backgroundColor: "rgba(54, 162, 235, 0.6)",
        borderColor: "rgba(54, 162, 235, 1)",
        fill: false,
        tension: 0.1,
      },
      {
        label: "Intensity",
        data: [8, 7, 9, 8, 7, 6, 5, 4, 3, 2],
        backgroundColor: "rgba(255, 206, 86, 0.6)",
        borderColor: "rgba(255, 206, 86, 1)",
        fill: false,
        tension: 0.1,
      },
    ],
  },
};

const Dashboard = () => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState({ from: null, to: null });
  const [symptomScale, setSymptomScale] = useState(null);
  const [patientSelection, setPatientSelection] = useState(null);
  const [tempPatientSelection, setTempPatientSelection] = useState(null);
  const [symptomSelection, setSymptomSelection] = useState([]);
  const [filteredData, setFilteredData] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [patientFiles, setPatientFiles] = useState([]);
  const initialDoctorNotesData = [[new Date().toISOString().split("T")[0], ""]];
  const [doctorNotesData, setDoctorNotesData] = useState(
    initialDoctorNotesData
  );
  const getPatientRecords = useCallback((filterData) => dispatch(actions.getPatientRecords(filterData)));
  const patientRecords = useSelector(state => state.dashboard.patientRecords);
  const handleSubmit = () => {
    console.log("Submit button clicked");
    console.log("Time Range:", timeRange);
    console.log("Symptom Scale:", symptomScale);
    console.log("Patient Selection:", tempPatientSelection);
    console.log("Symptom Selection:", symptomSelection);

    if (
      timeRange.from &&
      timeRange.to &&
      symptomScale &&
      tempPatientSelection &&
      symptomSelection.length > 0
    ) {
      const newFilteredData = filterData();
      console.log("Filtered Data:", newFilteredData);
      setFilteredData(newFilteredData);
      setIsSubmitted(true);
      setDoctorNotesData([[new Date().toISOString().split("T")[0], ""]]);
      setIsSubmitted(true);
      setPatientSelection(tempPatientSelection);

      const selectedPatient = demoPatients.find(
        (patient) => patient.id === tempPatientSelection?.value
      );
      if (selectedPatient) {
        setPatientFiles(selectedPatient.files || []);
      }
      setPatientSelection(tempPatientSelection);

      console.log("==================================")

      // getPatientRecords(newFilteredData);

      console.log("=================== called patient's fetch record ::")


    } else {
      alert("Please fill out all filter fields before submitting.");
      setIsSubmitted(false);
    }
  };

  const filterData = () => {
    const { from, to } = timeRange;
    const filteredData = {};

    symptomSelection.forEach((symptom) => {
      const symptomData = symptomDataMap[symptom];
      if (!symptomData) return;

      const fromIndex = from
        ? symptomData.labels.indexOf(
            from
              .toLocaleDateString("en-US", {
                month: "2-digit",
                year: "2-digit",
              })
              .replace("/", "/")
          )
        : 0;
      const toIndex = to
        ? symptomData.labels.indexOf(
            to
              .toLocaleDateString("en-US", {
                month: "2-digit",
                year: "2-digit",
              })
              .replace("/", "/")
          )
        : symptomData.labels.length - 1;

      const filteredLabels = symptomData.labels.slice(fromIndex, toIndex + 1);
      const filteredDatasets = symptomData.datasets
        .filter((dataset) =>
          symptomScale
            ? dataset.label.toLowerCase() === symptomScale.value
            : true
        )
        .map((dataset) => ({
          ...dataset,
          data: dataset.data.slice(fromIndex, toIndex + 1),
        }));

      filteredData[symptom] = {
        labels: filteredLabels,
        datasets: filteredDatasets,
      };
    });

    return filteredData;
  };

  const selectedPatient = demoPatients.find(
    (patient) => patient.id === patientSelection?.value
  );

  const handleSave = (file) => {
    setPatientFiles((prevFiles) => [...prevFiles, file]);
  };

  return (
    <div className={classes.dashboard}>
      <Filter
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        symptomScale={symptomScale}
        setSymptomScale={setSymptomScale}
        patientSelection={tempPatientSelection}
        setPatientSelection={setTempPatientSelection}
        symptomSelection={symptomSelection}
        setSymptomSelection={setSymptomSelection}
        handleSubmit={handleSubmit}
        patients={demoPatients}
      />
      {isSubmitted && patientSelection && (
        <PatientInfo
          patientId={patientSelection.value}
          patients={demoPatients}
        />
      )}
      <div className={classes.content}>
        <div className={classes.leftPane}>
          {isSubmitted && (
            <DoctorNotes initialData={doctorNotesData} onSave={handleSave} />
          )}
          {isSubmitted && selectedPatient && (
            <PatientHistory
              patientId={patientSelection.value}
              patients={demoPatients}
            />
          )}
          {isSubmitted && <PatientFiles files={patientFiles} />}
        </div>
        <div className={classes.rightPane}>
          {isSubmitted &&
            symptomSelection.map((symptom) => (
              <div key={symptom} className={classes.chartRow}>
                {filteredData &&
                  filteredData[symptom] &&
                  filteredData[symptom].labels.length > 0 && (
                    <>
                      <div className={classes.chartContainer}>
                        <Chart
                          type="Bar"
                          data={filteredData[symptom]}
                          title={symptom.replace(/-/g, " ")}
                        />
                      </div>
                      <div className={classes.chartContainer}>
                        <Chart
                          type="Line"
                          data={filteredData[symptom]}
                          title={symptom.replace(/-/g, " ")}
                        />
                      </div>
                    </>
                  )}
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
