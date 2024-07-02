import React from "react";
import { Bar, Line, Pie } from 'react-chartjs-2';

const Chart = ({ type }) => {
  let charts = <></>;
  
  const sample = {
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

  console.log("flow came here")
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

  const paralysisOptions = {
    ...options,
    plugins: {
      ...options.plugins,
      title: {
        display: true,
        text: 'Paralysis', // Title above the chart
        fontSize: 16,
        fontColor: '#333', // Title font color
        padding: 20,
      },
    },
  };

  console.log(sample)
  
  switch (type) {
    case "Bar":
      charts = (<Bar data ={sample} options={options}/>);
      break;

    case "Line":
      charts = <Line  data ={sample} options={options} />;
      break;

    case "Pie":
      charts = <></>;
      break;
    default:
      charts = <Bar data ={sample} options={options}/>;
        
  }
  return( 
    
   <div>
        {charts}
   </div> 

) ;
};

export default Chart;
