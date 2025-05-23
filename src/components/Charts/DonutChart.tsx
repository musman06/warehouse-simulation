import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const DonutChart = ({
  labels,
  labelsValues,
  isPercent,
}: {
  labels: string[];
  labelsValues: number[];
  isPercent: boolean;
}) => {
  const occupancyData = {
    labels: labels,
    datasets: [
      {
        data: labelsValues,
        backgroundColor: [
          "rgba(255, 99, 132, 0.2)", // from the provided chart color scheme
          "rgba(54, 162, 235, 0.2)",
          "rgba(54, 235, 111, 0.2)", // from the provided chart color scheme
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)", // from the provided chart color scheme
          "rgba(54, 162, 235, 1)", // from the provided chart color scheme
          "rgba(54, 235, 111, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    cutout: "70%", // Adjusts inner radius for a gauge-like look
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.label || "";
            const value = context.parsed || 0;
            return isPercent ? `${label}: ${value}%` : `${label}: ${value}`;
          },
        },
        titleFont: {
          family: "Exo 2",
        },
        bodyFont: {
          family: "Exo 2",
        },
      },
    },
  };

  return (
    <div
      className="chart-container"
      style={{
        position: "relative",
        width: "100%",
        height: "150px",
        maxWidth: "150px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Doughnut data={occupancyData} options={options} />
    </div>
  );
};

export default DonutChart;
