import React, { useRef, useEffect, useState } from 'react';
import { Bar, Doughnut } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Dashboard.module.css';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend,
} from 'chart.js';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Title,
  Tooltip,
  Legend
);

const symptomScaleOptions = [
  { value: 'severity', label: 'Severity' },
  { value: 'frequency', label: 'Frequency' },
  { value: 'intensity', label: 'Intensity' },
];

const symptomSelectionOptions = [
  { value: 'paralysis', label: 'Paralysis' },
  { value: 'muscle-weakness', label: 'Muscle Weakness' },
  { value: 'poor-coordination', label: 'Poor Coordination' },
  { value: 'loss-of-sensation', label: 'Loss of Sensation' },
  { value: 'seizures', label: 'Seizures' },
  { value: 'confusion', label: 'Confusion' },
  { value: 'pain', label: 'Pain' },
];

const Dashboard = () => {
  const barChartRef1 = useRef(null);
  const barChartRef2 = useRef(null);
  const doughnutChartRef = useRef(null);
  const barChartRef3 = useRef(null);

  const [timeRange, setTimeRange] = useState({ from: null, to: null });
  const [symptomScale, setSymptomScale] = useState(null);
  const [patientSelection, setPatientSelection] = useState(null);
  const [symptomSelection, setSymptomSelection] = useState([]);

  const averageWaitingTimeData = {
    labels: ['Cardiology', 'Dermatology', 'Neurology', 'Oncology', 'Ophthalmology', 'Surgery'],
    datasets: [
      {
        label: 'Average Waiting Time',
        data: [90, 80, 70, 85, 95, 100],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
    ],
  };

  const treatmentCostData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September'],
    datasets: [
      {
        label: 'Sum of Treatment Cost',
        data: [15000, 8000, 25000, 20000, 12000, 18000, 15000, 17000, 5000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
    ],
  };

  const patientSatisfactionData = {
    labels: ['Excellent', 'Good', 'Neutral', 'Negative'],
    datasets: [
      {
        data: [19.5, 30.0, 26.0, 24.5],
        backgroundColor: [
          'rgba(75, 192, 192, 0.6)',
          'rgba(54, 162, 235, 0.6)',
          'rgba(255, 206, 86, 0.6)',
          'rgba(255, 99, 132, 0.6)',
        ],
      },
    ],
  };

  const patientStatusData = {
    labels: ['Inpatient', 'Outpatient'],
    datasets: [
      {
        label: 'Cardiology',
        data: [11648, 13061],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
      },
      {
        label: 'Dermatology',
        data: [5489, 7914],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
      },
      {
        label: 'Neurology',
        data: [12348, 5236],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
      },
      {
        label: 'Oncology',
        data: [6566, 5087],
        backgroundColor: 'rgba(75, 192, 192, 0.6)',
      },
      {
        label: 'Ophthalmology',
        data: [10549, 18000],
        backgroundColor: 'rgba(153, 102, 255, 0.6)',
      },
      {
        label: 'Surgery',
        data: [6201, 630],
        backgroundColor: 'rgba(255, 159, 64, 0.6)',
      },
    ],
  };

  useEffect(() => {
    const chartRefs = [barChartRef1, barChartRef2, doughnutChartRef, barChartRef3];
    return () => {
      chartRefs.forEach(ref => {
        if (ref.current) {
          ref.current.destroy();
        }
      });
    };
  }, []);

  return (
    <div className={styles.dashboard}>
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
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Bar ref={barChartRef1} data={averageWaitingTimeData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className={styles.chartContainer}>
          <Bar ref={barChartRef2} data={patientStatusData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Doughnut ref={doughnutChartRef} data={patientSatisfactionData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
        <div className={styles.chartContainer}>
          <Bar ref={barChartRef3} data={treatmentCostData} options={{ responsive: true, maintainAspectRatio: false }} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
