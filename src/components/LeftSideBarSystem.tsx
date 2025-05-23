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
      <div className="left-sidebar" style={{ width: "360px" }}>
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 700 }}>{systemName}</span>
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
              width: "280px",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div>
              <span style={{ fontWeight: 700 }}>General Info</span>
              <div style={{ marginTop: "20px" }}>
                <span style={{ fontWeight: 600 }}> Name: </span>
                <span>{name}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                {" "}
                <span style={{ fontWeight: 600 }}> ID: </span>
                <span>{ID}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                {" "}
                <span style={{ fontWeight: 600 }}> Type: </span>
                <span>{type}</span>
              </div>

              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}>
                  Top Performing Warehouse:{" "}
                </span>
                <span>{topPerformingWH}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}>
                  {" "}
                  Least Performing Warehouse:{" "}
                </span>
                <span>{leastPerformingWH}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}>
                  {" "}
                  Training Hours Per Employee:{" "}
                </span>
                <span>{trainingHoursPerEmployee} hrs</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}>
                  Total Energy Consumption:{" "}
                </span>
                <span>{totalEnergyConsumption} MWh per day</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}>Total Carbon Emission: </span>
                <span>{totalCarbonEmission} tCO₂e per month</span>
              </div>
            </div>
          </div>

          {/* Employees/AMVs/Forklifts Graph */}
          <div
            style={{
              width: "90%",
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
              width: "90%",
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
              width: "90%",
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
              width: "90%",
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
              width: "90%",
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
              width: "90%",
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
              width: "90%",
              height: "auto",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
              marginBottom: "10px",
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
