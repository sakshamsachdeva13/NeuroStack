import React, { useState, useCallback, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";

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
import deepCopy from "../../utils/deepCopy";

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

const initialDoctorNotesData = [[new Date().toISOString().split("T")[0], ""]];

const Dashboard = () => {
  const dispatch = useDispatch();
  const [timeRange, setTimeRange] = useState({ from: null, to: null });
  const [symptomScale, setSymptomScale] = useState(null);
  const [patientSelection, setPatientSelection] = useState(null);
  const [tempPatientSelection, setTempPatientSelection] = useState(null);
  const [symptomSelection, setSymptomSelection] = useState([]);
  const [symptomSelectionOptions, setSymptomSelectionOption] = useState([]);
  const [patientInfo, setPatientInfo] = useState({});
  const [patientFiles, setPatientFiles] = useState([]);
  const [doctorNotesData, setDoctorNotesData] = useState(
    initialDoctorNotesData
  );

  const [chartData, setChartData] = useState({});
  const getPatientRecords = useCallback((filterData) =>
    dispatch(actions.getPatientRecords(filterData))
  );
  const getPatientData = useCallback(() => dispatch(actions.getPatientData()));
  const patientRecords = useSelector((state) => state.dashboard.patientRecords);
  const patientData = useSelector((state) => state.admin.patientData);

  useEffect(() => {
    getPatientData();
    return () => {
      console.log("this is called on unmounting")
        // setSymptomSelection([]);
        // setSymptomScale(null);
        // setSymptomSelectionOption([])
        dispatch({
          type : 'GET_PATIENT_RECORD',
          data : {}
        })
    };
  }, []);

  useEffect(() => {
    console.log("---------------------------------------------------- , this was called on patient recored change")
    processPatientRecords(patientRecords);
  }, [patientRecords]);

  function getMonthYearDistribution(timeRange) {
    const fromDate = new Date(timeRange.from);
    const toDate = new Date(timeRange.to);

    const result = [];
    let currentDate = new Date(fromDate);

    while (currentDate <= toDate) {
      const month = currentDate.getMonth() + 1; 
      const year = currentDate.getFullYear().toString().slice(-2); 
      const formattedMonth = month < 10 ? `0${month}` : month;
      result.push(`${formattedMonth}/${year}`);
      currentDate.setMonth(currentDate.getMonth() + 1);
    }
    return result;
  }

  const processPatientRecords = (pr) => {
    if (pr.result) {
      const patientRecords = deepCopy(pr.result.patientRecords);
      const patientDetails = deepCopy(pr.result.patientDetails);
      const symptoms = patientRecords.symptoms;
      const patientFiles = patientRecords.files;
      const doctorsNote = Object.keys(patientRecords.doctorsNote).map((e) => [
        e,
        patientRecords.doctorsNote[e],
      ]);
      const labels = getMonthYearDistribution(timeRange);
      const chartData = symptoms.reduce((acc, e) => {
        acc[e.name] = {
          labels,
          datasets: [
            {
              label: "Severity",
              data: labels.map((key) =>
                e["severity"][key] !== undefined ? e["severity"][key] : 0
              ),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
              tension: 0.1,
            },
            {
              label: "Frequency",
              data: labels.map((key) =>
                e["frequency"][key] !== undefined ? e["frequency"][key] : 0
              ),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
              tension: 0.1,
            },
            {
              label: "Intensity",
              data: labels.map((key) =>
                e["intensity"][key] !== undefined ? e["intensity"][key] : 0
              ),
              backgroundColor: "rgba(255, 99, 132, 0.6)",
              borderColor: "rgba(255, 99, 132, 1)",
              fill: false,
              tension: 0.1,
            },
          ],
        };
        return acc;
      }, {});
      console.log(chartData)
      setSymptomSelectionOption(
        Object.keys(chartData).map((e) => ({ value: e, label: e }))
      );
      setSymptomSelection([Object.keys(chartData)[0]]);
      setSymptomScale({value : "Frequency" , label : "Frequency"});
      setPatientInfo(patientDetails);
      setChartData(chartData);
      setDoctorNotesData(doctorsNote);
      setPatientFiles(patientFiles);
    }
  };


  const handleSubmit = () => {
    if (timeRange.from && timeRange.to && patientSelection) {
      const filterDataObject = {
        from: timeRange.from,
        to: timeRange.to,
        patientId: patientSelection.value,
        symptoms: symptomSelection,
      };

      getPatientRecords(filterDataObject);
      // setPatientSelection(tempPatientSelection);
      // setPatientSelection(tempPatientSelection);
    } else {
      alert("Please fill out all filter fields before submitting.");
    }
  };

  const handleSave = (file) => {
    setPatientFiles((prevFiles) => [...prevFiles, file]);
  };

  console.log(patientRecords);

  return (
    <div className={classes.dashboard}>
      <Filter
        timeRange={timeRange}
        setTimeRange={setTimeRange}
        symptomScale={symptomScale}
        setSymptomScale={setSymptomScale}
        patientSelection={patientSelection}
        setPatientSelection={setPatientSelection}
        symptomSelection={symptomSelection}
        setSymptomSelection={setSymptomSelection}
        handleSubmit={handleSubmit}
        symptomSelectionOptions={symptomSelectionOptions}
        patients={patientData}
      />
      {patientRecords.result && <PatientInfo patient={patientInfo} />}
      {patientRecords.result && Object.keys(chartData).length ? (
        <div className={classes.content}>
          <div className={classes.leftPane}>
            {patientRecords.result && (
              <DoctorNotes initialData={doctorNotesData} onSave={handleSave} />
            )}
            {patientRecords.result && (
              <PatientHistory history={patientInfo.history} />
            )}
            {patientRecords.result && <PatientFiles files={patientFiles} />}
          </div>
          <div className={classes.rightPane}>
            {symptomSelection.map((symptom) => (
              <div key={symptom} className={classes.chartRow}>
                {Object.keys(chartData).length && (
                  <>
                    <div className={classes.chartContainer}>
                      <Chart
                        type="Bar"
                        data={chartData[symptom]}
                        title={symptom.replace(/-/g, " ")}
                        symptomScale={symptomScale}
                      />
                    </div>
                    <div className={classes.chartContainer}>
                      <Chart
                        type="Line"
                        data={chartData[symptom]}
                        title={symptom.replace(/-/g, " ")}
                        symptomScale={symptomScale}
                      />
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className={classes.placeholder}>
          <span>Please Select Filters to see data</span>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
