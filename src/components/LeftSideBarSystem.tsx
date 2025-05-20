import "./leftSideBarStyle.css";
import ColumnChart from "./Charts/ColumnChart";
import LineChart from "./Charts/LineChart";
import DonutChart from "./Charts/DonutChart";
import StackedColumnChart from "./Charts/StackedColumnChart";

const LeftSideBarSystem = ({
  systemName,
  name,
  ID,
  type,
  topPerformingWH,
  leastPerformingWH,
  trainingHoursPerEmployee,
  totalEnergyConsumption,
  totalCarbonEmission,
  totalRobots,
  totalForklifts,
  totalEmployees,
  throughputMonths,
  throughputRate,
  cornwallVolumePercentage,
  casaGrandeVolumePercentage,
  avgOrderCycleMonths,
  avgOrderCycleValue,
  backOrderRateMonths,
  backOrderRatePercent,
  globalInventoryAccuracyMonths,
  globalInventoryAccuracyPercent,
  costPerOrderMonths,
  costPerOrderCasaGrande,
  costPerOrderCornwall,
}: {
  systemName: string;
  name: string;
  ID: string;
  type: string;
  topPerformingWH: string;
  leastPerformingWH: string;
  trainingHoursPerEmployee: number;
  totalEnergyConsumption: number;
  totalCarbonEmission: number;
  totalRobots: number;
  totalForklifts: number;
  totalEmployees: number;
  cornwallVolumePercentage: number;
  casaGrandeVolumePercentage: number;
  throughputMonths: string[];
  throughputRate: number[];
  avgOrderCycleMonths: string[];
  avgOrderCycleValue: number[];
  backOrderRateMonths: string[];
  backOrderRatePercent: number[];
  globalInventoryAccuracyMonths: string[];
  globalInventoryAccuracyPercent: number[];
  costPerOrderMonths: string[];
  costPerOrderCasaGrande: number[];
  costPerOrderCornwall: number[];
}) => {
  return (
    <>
      <div className="left-sidebar" style={{ width: "410px" }}>
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 900 }}>{systemName}</span>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            alignItems: "center",
          }}
        >
          {/* General Info */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div>
              <span style={{ fontWeight: 600 }}>General Info</span>
              <div style={{ marginTop: "20px" }}>Name: {name}</div>
              <div style={{ marginTop: "8px" }}>ID: {ID}</div>
              <div style={{ marginTop: "8px" }}>Type: {type}</div>

              <div style={{ marginTop: "8px" }}>
                Top Performing Warehouse: {topPerformingWH}
              </div>
              <div style={{ marginTop: "8px" }}>
                Least Performing Warehouse: {leastPerformingWH}
              </div>
              <div style={{ marginTop: "8px" }}>
                Training Hours Per Employee: {trainingHoursPerEmployee} hrs
              </div>
              <div style={{ marginTop: "8px" }}>
                Total Energy Consumption: {totalEnergyConsumption} MWh per day
              </div>
              <div style={{ marginTop: "8px" }}>
                Total Carbon Emission: {totalCarbonEmission} tCO₂e per month
              </div>
            </div>
          </div>

          {/* Employees/AMVs/Forklifts Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Employees/AMVs/Forklifts
            </div>
            {
              <DonutChart
                labels={["Forklifts", "AMVs", "Employees"]}
                labelsValues={[totalForklifts, totalRobots, totalEmployees]}
                isPercent={false}
              />
            }
          </div>

          {/* Average Order Cycle Time Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Average Order Cycle Time
            </div>
            {
              <LineChart
                labels={avgOrderCycleMonths}
                dataPoints={avgOrderCycleValue}
                isXAxisText={true}
                xAxisText="Months"
                yAxisText="Throughput"
              />
            }
          </div>

          {/* Throughput Rate Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Throughput Rate
            </div>
            {
              <LineChart
                labels={throughputMonths}
                dataPoints={throughputRate}
                isXAxisText={true}
                xAxisText="Days"
                yAxisText="Throughput"
              />
            }
          </div>

          {/* Global Inventory Accuracy % Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Global Inventory Accuracy %
            </div>
            {
              <ColumnChart
                reason={globalInventoryAccuracyMonths}
                duration={globalInventoryAccuracyPercent}
                yAxisText="Accuracy (%)"
                isXAxisText={true}
                xAxisText="Month"
                isAverage={false}
              />
            }
          </div>

          {/* Backorder Rate % Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Backorder Rate %
            </div>
            {
              <ColumnChart
                reason={backOrderRateMonths}
                duration={backOrderRatePercent}
                yAxisText="Backorder (%)"
                isXAxisText={true}
                xAxisText="Months"
                isAverage={false}
              />
            }
          </div>

          {/* Cost Per Order Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Cost Per Order
            </div>
            {
              <StackedColumnChart
                timePeriod={costPerOrderMonths}
                value1={costPerOrderCasaGrande}
                value2={costPerOrderCornwall}
                yAxisText="Cost ($)"
                isXAxisText={true}
                xAxisText="Months"
                isAverage={true}
              />
            }
          </div>

          {/* Orders Volume Distribution Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
              marginBottom: "40px",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Orders Volume Distribution
            </div>
            {
              <DonutChart
                labels={["Forklifts", "AMVs", "Employees"]}
                labelsValues={[
                  cornwallVolumePercentage,
                  casaGrandeVolumePercentage,
                ]}
                isPercent={false}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBarSystem;
