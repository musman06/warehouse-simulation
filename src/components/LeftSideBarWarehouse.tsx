import "./leftSideBarStyle.css";
import ColumnChart from "./Charts/ColumnChart";
import LineChart from "./Charts/LineChart";
import DonutChart from "./Charts/DonutChart";

const LeftSideBarWarehouse = ({
  warehouseName,
  name,
  ID,
  type,
  avgOrderFulfillmentTime,
  totalRobots,
  totalForklifts,
  totalEmployees,
  powerConsumptionMonths,
  powerConsumptionAmount,
  occupiedSpcae,
  freeSpace,
  throughputMonths,
  throughputRate,
  safetyIncidentsMonths,
  safetyIncidentsRate,
  systemDowntimeMonths,
  systemDowntimeDuration,
}: {
  warehouseName: string;
  name: string;
  ID: string;
  type: string;
  avgOrderFulfillmentTime: number;
  totalRobots: number;
  totalForklifts: number;
  totalEmployees: number;
  powerConsumptionMonths: string[];
  powerConsumptionAmount: number[];
  occupiedSpcae: number;
  freeSpace: number;
  throughputMonths: string[];
  throughputRate: number[];
  safetyIncidentsMonths: string[];
  safetyIncidentsRate: number[];
  systemDowntimeMonths: string[];
  systemDowntimeDuration: number[];
}) => {
  return (
    <>
      <div className="left-sidebar">
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 900 }}>
            {/* {lastClickedMapObject ? ` > ${lastClickedMapObject.name}` : ""} */}
            {warehouseName}
          </span>
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
              {/* TODO {name} */}
              <div style={{ marginTop: "20px" }}>Name: {name}</div>
              <div style={{ marginTop: "8px" }}>ID: {ID}</div>
              <div style={{ marginTop: "8px" }}>Type: {type}</div>

              <div style={{ marginTop: "8px" }}>
                Order Fulfillment Time: {avgOrderFulfillmentTime} minutes
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

          {/* Power Consumption Graph */}
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
              Power Consumption
            </div>
            {
              <LineChart
                labels={powerConsumptionMonths}
                dataPoints={powerConsumptionAmount}
                isXAxisText={true}
                xAxisText="Months"
                yAxisText="Power (kWh)"
              />
            }
          </div>

          {/* Occupied/Free Space Graph */}
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
              Occupied/Free Space
            </div>
            {
              <DonutChart
                labels={["Occupied", "Free"]}
                labelsValues={[occupiedSpcae, freeSpace]}
                isPercent={false}
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
                xAxisText="Time in hours"
                yAxisText="Throughput"
              />
            }
          </div>

          {/* Safety Incidents Graph */}
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
              Safety Incidents
            </div>
            {
              <ColumnChart
                reason={safetyIncidentsMonths}
                duration={safetyIncidentsRate}
                yAxisText="Incidents"
                isXAxisText={true}
                xAxisText="Month"
                isAverage={false}
              />
            }
          </div>

          {/* System Downtime Graph */}
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
              System Downtime
            </div>
            {
              <ColumnChart
                reason={systemDowntimeMonths}
                duration={systemDowntimeDuration}
                yAxisText="Duration (h)"
                isXAxisText={false}
                xAxisText=""
                isAverage={false}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBarWarehouse;
