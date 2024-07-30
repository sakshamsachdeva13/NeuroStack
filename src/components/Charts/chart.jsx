import React, { useState, useEffect } from "react";
import { Bar, Line } from "react-chartjs-2";
import  deepCopy  from "../../utils/deepCopy";

const Chart = ({ type, data, title, height = 300, symptomScale }) => {
  const [localData, setLocalData] = useState(data);
  console.log(localData)
  useEffect(() => {
    const updatedData = deepCopy(data)
     updatedData.datasets = deepCopy(updatedData.datasets).filter(
      (ele) => ele.label === symptomScale.label
    );
    console.log(symptomScale)
    setLocalData(updatedData);
  }, [data, symptomScale]);

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
        fontSize: 20,
      },
      legend: {
        display: true,
        position: "top",
      },
    },
  };

  let chartComponent = null;
  switch (type) {
    case "Bar":
      chartComponent = <Bar data={localData} options={options} height={height} />;
      break;
    case "Line":
      chartComponent = <Line data={localData} options={options} height={height} />;
      break;
    default:
      chartComponent = null;
  }

  return (
    <div className="chart-container">
      {title && (
        <h3 style={{ textAlign: "center", margin: "10px 0" }}>{title}</h3>
      )}
      <div style={{ maxHeight: "400px", overflowY: "auto" }}>
        {chartComponent}
      </div>
    </div>
  );
};

export default Chart;
