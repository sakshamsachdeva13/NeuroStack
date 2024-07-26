import React from 'react';
import { Bar, Line } from 'react-chartjs-2';

const Chart = ({ type, data, title,  height = 300 }) => {
 
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
      title: {
        display: true,
        text: title,
        fontSize: 20
      },
      legend: {
        display: true,
        position: 'top',
      },
    },
  };

  let chartComponent = null;
  switch (type) {
    case 'Bar':
      chartComponent = <Bar data={data} options={options} height={height} />;
      break;
    case 'Line':
      chartComponent = <Line data={data} options={options} height={height} />;
      break;
    default:
      chartComponent = null;
  }

  return (
    <div className="chart-container">
      {title && <h3 style={{ textAlign: 'center', margin: '10px 0' }}>{title}</h3>}
      <div style={{ maxHeight: '400px', overflowY: 'auto' }}>
        {chartComponent}
      </div>
    </div>
  );
};

export default Chart;
