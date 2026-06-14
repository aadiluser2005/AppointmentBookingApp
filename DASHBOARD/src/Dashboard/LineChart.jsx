import React from 'react';
import { Line } from 'react-chartjs-2';
import { useDashBoardContext } from '../Context/DashBoardContext.jsx';
import { useState,useEffect } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from 'chart.js';


ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Tooltip, Legend);

const LineChart = () => {
  
  const {dashBoardInfo}=useDashBoardContext();

  const [chartData,setChartData]=useState();

    

useEffect(() => {
  if (dashBoardInfo && dashBoardInfo.chartData) {
    setChartData(dashBoardInfo.chartData.data);
  }
}, [dashBoardInfo]);


   console.log("Data is ============= ",chartData);
  const data = {
    labels: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'],
    datasets: [
      {
        data:chartData,
        borderColor: 'rgba(54, 162, 235, 1)',
        backgroundColor: 'rgba(54, 162, 235, 0.3)',
        borderWidth: 1.8,
        tension: 0.3,
        fill: true,
        pointRadius: 3,
        pointBackgroundColor: 'rgba(54, 162, 235, 1)',
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        top: 20,
        bottom: 10,
        left: 10,
        right: 10,
      },
    },
    plugins: {
      legend: { display: false },
      title: { display: false },
      tooltip: {
        enabled: true,
        backgroundColor: 'rgba(255, 255, 255, 0.95)', // ✅ cleaner white background
        titleColor: 'black',
        bodyColor: 'black',
        borderColor: 'rgba(181, 180, 180, 0.486)',
        borderWidth: 1, // ❌ no border
        displayColors: false,
        padding: 20, // ✅ increased tooltip padding
        titleFont: { size: 17, weight: 'bold' },
        bodyFont: { size: 17 },
        callbacks: {
          title: function (tooltipItems) {
            return `${tooltipItems[0].label}`; // ✅ show day name only
          },
          label: function (tooltipItem) {
            // ✅ “Bookings” in blue, number in black
            return `Bookings: ${tooltipItem.formattedValue}`;
          },
          labelTextColor: function () {
            return 'rgba(54,162,235,0.8)'; // ✅ change label color only
          },
        },
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        min: 0,
        max: 32,
        ticks: {
          stepSize: 8,
          color: 'black',
          font: {
            size: 14,
          },
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: 'black',
          width: 1.2,
        },
      },
      x: {
        ticks: {
          color: 'black',
          font: {
            size: 14,
          },
          padding: 8,
        },
        grid: {
          display: false,
        },
        border: {
          display: true,
          color: 'black',
          width: 1.2,
        },
      },
    },
  };

  return (
    <div style={{ height: '300px', width: '100%' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
