import React, { useState } from 'react';
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

  const muscleWeaknessData = {
    labels: ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24'],
    datasets: [
      {
        label: 'Severity',
        data: [4, 6, 5, 8, 7, 9, 8, 7, 6, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Frequency',
        data: [5, 6, 4, 7, 6, 8, 7, 6, 5, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Intensity',
        data: [3, 5, 4, 7, 6, 8, 5, 6, 7, 4],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const poorCoordinationData = {
    labels: ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24'],
    datasets: [
      {
        label: 'Severity',
        data: [3, 4, 5, 6, 7, 8, 9, 7, 6, 5],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Frequency',
        data: [4, 5, 6, 7, 8, 9, 7, 6, 5, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Intensity',
        data: [5, 6, 7, 8, 9, 7, 6, 5, 4, 3],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const lossOfSensationData = {
    labels: ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24'],
    datasets: [
      {
        label: 'Severity',
        data: [2, 4, 3, 5, 4, 6, 5, 7, 6, 4],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Frequency',
        data: [3, 5, 4, 6, 5, 7, 6, 5, 4, 3],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Intensity',
        data: [4, 6, 5, 7, 6, 8, 7, 6, 5, 4],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

  const seizuresData = {
    labels: ['01/24', '02/24', '03/24', '04/24', '05/24', '06/24', '07/24', '08/24', '09/24', '10/24'],
    datasets: [
      {
        label: 'Severity',
        data: [6, 5, 7, 6, 8, 7, 9, 8, 7, 6],
        backgroundColor: 'rgba(255, 99, 132, 0.6)',
        borderColor: 'rgba(255, 99, 132, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Frequency',
        data: [7, 6, 8, 7, 9, 8, 7, 6, 5, 4],
        backgroundColor: 'rgba(54, 162, 235, 0.6)',
        borderColor: 'rgba(54, 162, 235, 1)',
        fill: false,
        tension: 0.1,
      },
      {
        label: 'Intensity',
        data: [8, 7, 9, 8, 7, 6, 5, 4, 3, 2],
        backgroundColor: 'rgba(255, 206, 86, 0.6)',
        borderColor: 'rgba(255, 206, 86, 1)',
        fill: false,
        tension: 0.1,
      },
    ],
  };

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
    const { from, to } = timeRange;

    // Convert selected months to index
    const fromIndex = patientStatusData.labels.indexOf(from ? from.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }).replace('/', '/') : null);
    const toIndex = patientStatusData.labels.indexOf(to ? to.toLocaleDateString('en-US', { month: '2-digit', year: '2-digit' }).replace('/', '/') : null);

    let filteredLabels = patientStatusData.labels.slice(fromIndex, toIndex + 1);
    let filteredDatasets = [];

    // Filter each dataset based on selected symptom scale
    if (symptomScale) {
      filteredDatasets = patientStatusData.datasets
        .filter(dataset => dataset.label.toLowerCase() === symptomScale.value)
        .map(dataset => ({
          ...dataset,
          data: dataset.data.slice(fromIndex, toIndex + 1)
        }));
    } else {
      filteredDatasets = patientStatusData.datasets.map(dataset => ({
        ...dataset,
        data: dataset.data.slice(fromIndex, toIndex + 1)
      }));
    }

    return {
      labels: filteredLabels,
      datasets: filteredDatasets
    };
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
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" data={filteredData || patientStatusData} title="Paralysis" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" data={filteredData || patientStatusData} title="Paralysis" />
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" data={filteredData || muscleWeaknessData} title="Muscle Weakness" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" data={filteredData || muscleWeaknessData} title="Muscle Weakness" />
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" data={filteredData || poorCoordinationData} title="Poor Coordination" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" data={filteredData || poorCoordinationData} title="Poor Coordination" />
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" data={filteredData || lossOfSensationData} title="Loss of Sensation" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" data={filteredData || lossOfSensationData} title="Loss of Sensation" />
        </div>
      </div>
      <div className={styles.chartRow}>
        <div className={styles.chartContainer}>
          <Chart type="Bar" data={filteredData || seizuresData} title="Seizures" />
        </div>
        <div className={styles.chartContainer}>
          <Chart type="Line" data={filteredData || seizuresData} title="Seizures" />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
