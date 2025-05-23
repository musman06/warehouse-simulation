import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";

import { Line } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend
);

const LineChart = ({
  labels,
  dataPoints,
  isXAxisText,
  xAxisText,
  yAxisText,
}: {
  labels: string[];
  dataPoints: number[];
  isXAxisText: boolean;
  xAxisText: string;
  yAxisText: string;
}) => {
  const data = {
    labels,
    datasets: [
      {
        label: labels[0],
        data: dataPoints,
        backgroundColor: "#77BDFF",
        borderColor: "#63E7B7",
        fill: false,
        pointRadius: 4,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        right: 10,
        bottom: 0,
      },
    },
    plugins: {
      tooltip: {
        intersect: false,
        callbacks: {
          title: (context: any) => {
            // This shows the correct label (e.g., month) for the hovered index
            return context[0].label;
          },
          label: (context: any) => {
            const value = context.raw;
            return `Value: ${value}`;
          },
        },
        titleFont: {
          family: "Exo 2",
        },
        bodyFont: {
          family: "Exo 2",
        },
      },
      legend: {
        display: false,
      },
    },
    scales: {
      x: {
        stacked: false,
        title: {
          display: isXAxisText,
          text: xAxisText,
          font: {
            family: "Exo 2",
          },
        },
        ticks: {
          font: {
            family: "Exo 2",
          },
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisText,
          font: {
            family: "Exo 2",
          },
        },
        ticks: {
          font: {
            family: "Exo 2",
          },
        },
      },
    },
  };

  return (
    <div
      style={{
        position: "relative",
        width: "100%",
        height: "150px",
        maxWidth: "270px",
        overflow: "hidden",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
