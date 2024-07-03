import React, { useRef, useEffect, useState } from 'react';
import { Bar, Line, Pie } from 'react-chartjs-2';
import Chart from './Charts/chart';
import Filter from './Filters/Filter';
import styles from './Dashboard.module.css';

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
} from 'chart.js';
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

const Dashboard = () => {
  const barChartRef = useRef(null);
  const lineChartRef = useRef(null);
  const pieChartParalysisRef = useRef(null);
  const pieChartMuscleWeaknessRef = useRef(null);
  const pieChartPoorCoordinationRef = useRef(null);

  const [timeRange, setTimeRange] = useState({ from: null, to: null });
  const [symptomScale, setSymptomScale] = useState(null);
  const [patientSelection, setPatientSelection] = useState(null);
  const [symptomSelection, setSymptomSelection] = useState([]);
  const [filteredData, setFilteredData] = useState(null);

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
    datasets: [
      {
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
      },
    ],
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
      if (pieChartParalysisRef.current && pieChartParalysisRef.current.chartInstance) {
        pieChartParalysisRef.current.chartInstance.destroy();
      }
      if (pieChartMuscleWeaknessRef.current && pieChartMuscleWeaknessRef.current.chartInstance) {
        pieChartMuscleWeaknessRef.current.chartInstance.destroy();
      }
      if (pieChartPoorCoordinationRef.current && pieChartPoorCoordinationRef.current.chartInstance) {
        pieChartPoorCoordinationRef.current.chartInstance.destroy();
      }
    };
  }, []);

  const handleSubmit = () => {
    console.log('Submit button clicked');
    console.log('Time Range:', timeRange);
    console.log('Symptom Scale:', symptomScale);
    console.log('Patient Selection:', patientSelection);
    console.log('Symptom Selection:', symptomSelection);

    // Implement filter logic here to set filtered data
    const newFilteredData = filterData();
    setFilteredData(newFilteredData);
  };

  const filterData = () => {
    // Filtering logic here - implement your filtering based on the state values
    // For demonstration purposes, we'll return the same data
    return {
      labels: patientStatusData.labels,
      datasets: patientStatusData.datasets.map((dataset) => ({
        ...dataset,
        data: dataset.data.map((value) => value * Math.random()), // Randomly adjust data for demonstration
      })),
    };
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
    },
  };

  

  return (
    <div className={styles.dashboard}>
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
      />
      {/* {filteredData && (
        <div className={styles.chartRow}>
          <div className={styles.chartContainer}>
            <Bar ref={barChartRef} data={filteredData} options={options} />
          </div>
          <div className={styles.chartContainer}>
            <Line ref={lineChartRef} data={filteredData} options={options} />
          </div>
        </div>
      )}
      {filteredData && (
        <div className={styles.chartRow}>
          <div className={styles.chartContainer}>
            <Pie ref={pieChartParalysisRef} data={pieChartData} options={paralysisOptions} />
          </div>
          <div className={styles.chartContainer}>
            <Pie ref={pieChartMuscleWeaknessRef} data={pieChartData} options={muscleWeaknessOptions} />
          </div>
          <div className={styles.chartContainer}>
            <Pie ref={pieChartPoorCoordinationRef} data={pieChartData} options={poorCoordinationOptions} />
          </div>
        </div>
      )} */}
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" />
        </div>
        
        <Chart type="Pie" />
        
      </div>
    </div>
  );
};

export default Dashboard;
