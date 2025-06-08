import "./leftSideBarStyle.css";
import ColumnChart from "../Charts/ColumnChart";

const LeftSideBarForklift = ({
  breadcrumbValue,
  name,
  ID,
  type,
  status,
  fuelLevel,
  load,
  speed,
  operator,
  loadHours,
  loadMovedPerHour,
  tripHours,
  totalTrips,
  isDowntime,
  downtimeReason,
  downtimeDuaration,
  fuelEfficiency,
}: {
  breadcrumbValue: string;
  name: string;
  ID: string;
  type: string;
  status: string;
  fuelLevel: string;
  load: number;
  speed: number;
  operator: string;
  loadHours: string[];
  loadMovedPerHour: number[];
  tripHours: string[];
  totalTrips: number[];
  isDowntime: boolean;
  downtimeReason: string;
  downtimeDuaration: number;
  fuelEfficiency: number;
}) => {
  return (
    <>
      <div className="left-sidebar" style={{ width: "360px" }}>
        {/* Breadcrumb */}
        <div className="left-sidebar-div">
          {/* Object Name */}
          <span style={{ fontWeight: 700 }}>{breadcrumbValue}</span>
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
                <span style={{ fontWeight: 600 }}>Fuel Level:</span>
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
                        const level = parseInt(fuelLevel.replace("%", ""));
                        if (level >= 80) return "rgb(74 222 128)"; // Green
                        if (level >= 50) return "rgb(217 222 74)"; // Yellow
                        if (level > 20) return "rgb(255 165 0)"; // Orange
                        return "rgb(239 68 68)"; // Red
                      })(),
                      width: fuelLevel,
                      height: "100%",
                      borderRadius: "10px",
                      display: "flex",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {fuelLevel}
                  </span>
                </div>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Fuel Efficiency: </span>
                <span>{fuelEfficiency}km per liter</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Speed: </span>
                <span>{speed} m/s</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Operator Assigned: </span>
                <span>{operator}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                <span style={{ fontWeight: 600 }}> Load Weight: </span>
                <span>{load}Kg</span>
              </div>
            </div>
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

          {/* Avg Load Moved per hour Graph */}
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
              Avg. Load Moved Per Hour
            </div>
            {
              <ColumnChart
                reason={loadHours}
                duration={loadMovedPerHour}
                yAxisText="Duration (h)"
                isXAxisText={true}
                xAxisText="Time in hour"
                isAverage={true}
              />
            }
          </div>

          {/* Trips per hour Graph */}
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
              Trips per hour
            </div>
            {
              <ColumnChart
                reason={tripHours}
                duration={totalTrips}
                yAxisText="Duration (h)"
                isXAxisText={true}
                xAxisText="Time in hour"
                isAverage={false}
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBarForklift;
