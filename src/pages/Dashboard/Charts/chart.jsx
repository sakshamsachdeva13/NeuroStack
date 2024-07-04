import React from "react";
import { Bar, Line } from 'react-chartjs-2';

const Chart = ({ type }) => {
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      tooltip: {
        callbacks: {
          label: (tooltipItem) => {
            return `${tooltipItem.label}: ${tooltipItem.raw}`;
          },
        },
      },
    },
  };

  const sampleData = {
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
  };

  let charts = null;

  switch (type) {
    case "Bar":
      charts = <Bar data={sampleData} options={options} />;
      break;
    case "Line":
      charts = <Line data={sampleData} options={options} />;
      break;
    default:
      charts = null;
  }

  return (
    <div>
      {charts}
    </div>
  );
};

export default Chart;
