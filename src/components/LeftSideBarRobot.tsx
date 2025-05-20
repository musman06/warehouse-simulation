import "./leftSideBarStyle.css";
import DonutChart from "./Charts/DonutChart";
import ColumnChart from "./Charts/ColumnChart";

const LeftSidebarRobot = ({
  warehouseName,
  name,
  ID,
  type,
  status,
  batteryLevel,
  speed,
  tct,
  batteryEfficiency,
  collisions,
  nearMisses,
  isDowntime,
  downtimeReason,
  downtimeDuaration,
  working,
  idle,
  maintenanceDates,
  maintenanceDurations,
}: {
  warehouseName: string;
  name: string;
  ID: string;
  type: string;
  status: string;
  batteryLevel: string;
  speed: number;
  tct: number;
  batteryEfficiency: number;
  collisions: number;
  nearMisses: number;
  isDowntime: boolean;
  downtimeReason: string;
  downtimeDuaration: number;
  working: number;
  idle: number;
  maintenanceDates: string[];
  maintenanceDurations: number[];
}) => {
  return (
    <>
      <div className="left-sidebar">
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 900 }}>{warehouseName}</span>
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
                Status:
                <span
                  style={{
                    marginLeft: "2px",
                    backgroundColor: "rgb(74 222 128)",
                    color: "white",
                    padding: "0.25rem 0.5rem 0.25rem 0.5rem",
                    borderRadius: "10px",
                  }}
                >
                  {status}
                </span>
              </div>
              <div style={{ marginTop: "16px" }}>
                <span>Battery Level:</span>
                <div
                  style={{
                    width: "100%",
                    height: "25px",
                    marginTop: "13px",
                    backgroundColor: "rgb(229 231 235 )",
                    borderRadius: "10px",
                    display: "flex",
                    justifyContent: "flex-start",
                    alignItems: "center",
                  }}
                >
                  <span
                    style={{
                      color: "white",
                      background: "rgb(74 222 128)",
                      width: "80%",
                      height: "100%",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {batteryLevel}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>Speed: {speed} m/s</div>
              <div style={{ marginTop: "8px" }}>
                Task Completion Time: {tct} minutes per task
              </div>
              <div style={{ marginTop: "8px" }}>
                Battery Efficiency: {batteryEfficiency} tasks per charge
              </div>
            </div>
          </div>

          {/* Collisions Graph */}
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
              Collisions / Near Misses
            </div>
            {
              <DonutChart
                labels={["Collisions", "Near Misses"]}
                labelsValues={[collisions, nearMisses]}
                isPercent={false}
              />
            }
          </div>

          {/* Downtime Graph */}
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
              Downtime
            </div>
            {isDowntime ? (
              <ColumnChart
                reason={[downtimeReason]}
                duration={[downtimeDuaration]}
                yAxisText="Duration (h)"
                isXAxisText={false}
                xAxisText=""
                isAverage={false}
              />
            ) : (
              <div>No Downtime</div>
            )}
          </div>

          {/* Utilization Rate Graph */}
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
              Utilization Rate (%)
            </div>
            {
              <DonutChart
                labels={["Idle", "Working"]}
                labelsValues={[idle, working]}
                isPercent={true}
              />
            }
          </div>

          {/* Maintenance Graph */}
          <div
            style={{
              width: "100%",
              height: "auto",
              marginBottom: "36px",
              backgroundColor: "white",
              borderRadius: "0.75rem",
              border: "1px solid #e5e7eb",
              padding: "1rem",
              transform: "none",
            }}
          >
            <div style={{ fontWeight: 700, marginBottom: "10px" }}>
              Maintenance Intervals
            </div>
            {
              <ColumnChart
                reason={maintenanceDates}
                duration={maintenanceDurations}
                yAxisText="Duration (h)"
                isXAxisText={true}
                xAxisText="Date"
                isAverage={false}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSidebarRobot;
