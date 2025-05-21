import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarController,
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
  BarController,
  BarElement,
  LineElement,
  PointElement,
  Tooltip,
  Legend
);

const StackedColumnChart = ({
  timePeriod,
  value1,
  value2,
  yAxisText,
  isXAxisText,
  xAxisText,
  isAverage,
}: {
  timePeriod: string[];
  value1: number[];
  value2: number[];
  yAxisText: string;
  isXAxisText: boolean;
  xAxisText: string;
  isAverage: boolean;
}) => {
  const averageData: number[] = [];
  if (isAverage) {
    for (let i = 0; i < value1.length; i++) {
      const avg = (value1[i] + value2[i]) / 2;
      averageData.push(parseFloat(avg.toFixed(2)));
    }
  }

  const data = {
    labels: timePeriod,
    datasets: [
      {
        type: "bar" as const,
        label: "Warehouse 1",
        data: value1,
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
        stack: "stack1",
      },
      {
        type: "bar" as const,
        label: "Warehouse 2",
        data: value2,
        backgroundColor: "rgba(75, 192, 192, 0.5)",
        borderColor: "rgba(75, 192, 192, 1)",
        borderWidth: 1,
        stack: "stack2",
      },
      ...(isAverage
        ? [
            {
              type: "line" as const,
              label: "Average",
              data: averageData,
              borderColor: "rgba(54, 162, 235, 1)",
              backgroundColor: "rgba(54, 162, 235, 0.2)",
              fill: false,
              tension: 0.4,
              pointRadius: 3,
              borderWidth: 2,
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
        },
      },
      y: {
        stacked: true,
        beginAtZero: true,
        title: {
          display: true,
          text: yAxisText,
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
        maxWidth: "228px",
        margin: "0 auto",
        overflow: "hidden",
      }}
    >
      <Chart type="bar" data={data} options={options} />
    </div>
  );
};

export default StackedColumnChart;
