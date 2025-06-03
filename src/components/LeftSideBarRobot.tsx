import "./leftSideBarStyle.css";
import DonutChart from "./Charts/DonutChart";
import ColumnChart from "./Charts/ColumnChart";

const LeftSideBarRobot = ({
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
      <div className="left-sidebar" style={{ width: "360px" }}>
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 700 }}>{warehouseName}</span>
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
                <span style={{ fontWeight: 600 }}> Status: </span>
                <span
                  style={{
                    marginLeft: "5px",
                    backgroundColor: "rgb(74 222 128)",
                    color: "white",
                    padding: "0.25rem 0.5rem 0.25rem 0.5rem",
                    borderRadius: "10px",
                  }}
                >
                  {status}
                </span>
              </div>
              <div style={{ marginTop: "10px" }}>
                <span style={{ fontWeight: 600 }}>Battery Level:</span>
                <div
                  style={{
                    width: "100%",
                    height: "25px",
                    marginTop: "10px",
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
                      background: (() => {
                        const level = parseInt(batteryLevel.replace("%", ""));
                        if (level >= 80) return "rgb(74 222 128)"; // Green
                        if (level >= 50) return "rgb(217 222 74)"; // Yellow
                        if (level > 20) return "rgb(255 165 0)"; // Orange
                        return "rgb(239 68 68)"; // Red
                      })(),
                      width: batteryLevel,
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
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Speed: </span>
                <span>{speed} m/s</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Task Completion Time: </span>
                <span>{tct} minutes per task</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Battery Efficiency: </span>
                <span>{batteryEfficiency} tasks per charge</span>
              </div>
            </div>
          </div>

          {/* Collisions Graph */}
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
              width: "90%",
              height: "auto",
              marginBottom: "10px",
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

export default LeftSideBarRobot;
