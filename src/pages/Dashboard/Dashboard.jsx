import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Select from 'react-select';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import styles from './Dashboard.module.css';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, LineElement, PointElement, Title, Tooltip, Legend, PieController, ArcElement } from 'chart.js';

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
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartRef = useRef(null);

  const [timeRange, setTimeRange] = useState({ from: null, to: null });
  const [symptomScale, setSymptomScale] = useState(null);
  const [patientSelection, setPatientSelection] = useState(null);
  const [symptomSelection, setSymptomSelection] = useState([]);

  const patientStatusData = {
    labels: ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24'],
    datasets: [
      {
        label: 'Severity',
        data: [3, 5, 4, 7, 6, 8, 7, 9, 8, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Frequency',
        data: [6, 7, 5, 8, 7, 9, 8, 7, 6, 5],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Intensity',
        data: [4, 6, 5, 8, 7, 9, 6, 7, 8, 5],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const pieChartData = {
    labels: ['Severity', 'Frequency', 'Intensity'],
    datasets: [{
      data: [3, 6, 4],
      backgroundColor: [
        'rgba(255, 99, 132, 0.6)',
        'rgba(54, 162, 235, 0.6)',
        'rgba(255, 206, 86, 0.6)',
      ],
      borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
      ],
      borderWidth: 0, // Remove border
    }],
    monthYearLabels: ['Jan 2024', 'Feb 2024', 'Mar 2024'], // Labels for tooltips
  };

  useEffect(() => {
    return () => {
      if (barChartRef.current && barChartRef.current.chartInstance) {
        barChartRef.current.chartInstance.destroy();
      }
      if (lineChartRef.current && lineChartRef.current.chartInstance) {
        lineChartRef.current.chartInstance.destroy();
      }
      if (pieChartRef.current && pieChartRef.current.chartInstance) {
        pieChartRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const handleSubmit = () => {
    console.log('Submit button clicked');
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
          title: (tooltipItems) => {
            const idx = tooltipItems[0].dataIndex;
            return pieChartData.monthYearLabels[idx];
          },
        },
      },
      title: {
        display: true,
        text: 'Paralysis', // Title above the chart
        fontSize: 16,
        fontColor: '#333', // Title font color
        padding: 20,
      },
    },
  };

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
        <button className={`${styles.submitButton} ${styles.small}`} onClick={handleSubmit}>
          Submit
        </button>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Bar ref={barChartRef} data={patientStatusData} options={options} />
        </div>
        <div className={styles.chartContainer}>
          <Line ref={lineChartRef} data={patientStatusData} options={options} />
        </div>
      </div>
      <div className={styles.chartContainer}>
        <Pie ref={pieChartRef} data={pieChartData} options={options} />
      </div>
    </div>
  );
};

export default Dashboard;
