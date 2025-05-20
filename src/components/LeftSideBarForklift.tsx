import "./leftSideBarStyle.css";
import ColumnChart from "./Charts/ColumnChart";

const LeftSideBarForklift = ({
  warehouseName,
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
  warehouseName: string;
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
                    backgroundColor: "rgb(223 73 73)",
                    color: "white",
                    padding: "0.25rem 0.5rem 0.25rem 0.5rem",
                    borderRadius: "10px",
                  }}
                >
                  {status}
                </span>
              </div>
              <div style={{ marginTop: "16px" }}>
                <span>Fuel Level:</span>
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
                      background: "rgb(213 223 73)",
                      width: "80%",
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
                Fuel Efficiency: {fuelEfficiency}km per liter
              </div>
              <div style={{ marginTop: "8px" }}>Speed: {speed} m/s</div>
              <div style={{ marginTop: "8px" }}>
                Operator Assigned: {operator}
              </div>
              <div style={{ marginTop: "8px" }}>Load Weight: {load}Kg</div>
            </div>
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

          {/* Avg Load Moved per hour Graph */}
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
