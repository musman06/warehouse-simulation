import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Chart } from "react-chartjs-2";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const ColumnChart = ({
  reason,
  duration,
  yAxisText,
  isXAxisText,
  xAxisText,
  isAverage,
}: {
  reason: string[];
  duration: number[];
  yAxisText: string;
  isXAxisText: boolean;
  xAxisText: string;
  isAverage: boolean;
}) => {
  const averageData: number[] = [];
  if (isAverage) {
    let sum = 0;
    for (let i = 0; i < duration.length; i++) {
      sum += duration[i];
      averageData.push(parseFloat((sum / (i + 1)).toFixed(2)));
    }
  }

  const data = {
    labels: reason,
    datasets: [
      {
        type: "bar" as const,
        label: reason[0],
        data: duration,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "Stack 0",
      },
      ...(isAverage
        ? [
            {
              type: "line" as const,
              label: "Running Average",
              data: averageData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: false,
              tension: 0.4,
              pointRadius: 3,
            },
          ]
        : []),
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    scales: {
      x: {
        stacked: true,
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
        stacked: false,
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
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        callbacks: {
          label: (context: any) => {
            const label = context.dataset.label || "";
            const value = context.parsed.y || 0;
            return `${label}: ${value}`;
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
        maxWidth: "270px",
        overflow: "hidden",
      }}
    >
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default ColumnChart;
