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
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisText,
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
        maxWidth: "228px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Line data={data} options={options} />
    </div>
  );
};

export default LineChart;
