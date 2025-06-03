import "./leftSideBarStyle.css";
import DonutChart from "./Charts/DonutChart";
import LineChart from "./Charts/LineChart";

const LeftSideBarStorageRack = ({
  warehouseName,
  name,
  ID,
  type,
  totalItemsStored,
  orderFulfillmentRate,
  usedCapacity,
  idleCapacity,
  stockIn,
  stockOut,
  stockoutMonths,
  stockoutIncidents,
  inventoryAgeMonths,
  inventoryAgeTime,
}: {
  warehouseName: string;
  name: string;
  ID: string;
  type: string;
  totalItemsStored: number;
  orderFulfillmentRate: number;
  usedCapacity: number;
  idleCapacity: number;
  stockIn: number;
  stockOut: number;
  stockoutMonths: string[];
  stockoutIncidents: number[];
  inventoryAgeMonths: string[];
  inventoryAgeTime: number[];
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
                {" "}
                <span style={{ fontWeight: 600 }}> Total Items Stored: </span>
                <span>{totalItemsStored}</span>
              </div>
              <div style={{ marginTop: "8px" }}>
                {" "}
                <span style={{ fontWeight: 600 }}>
                  {" "}
                  Order Fulfillment Rate:{" "}
                </span>
                <span>{orderFulfillmentRate} orders per day on avg.</span>
              </div>
            </div>
          </div>

          {/* Capacity Utilization Graph */}
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
              Used Capacity vs. Idle Capacity (%)
            </div>
            {
              <DonutChart
                labels={["Idle Capacity", "Used Capacity"]}
                labelsValues={[idleCapacity, usedCapacity]}
                isPercent={false}
              />
            }
          </div>

          {/* Turnover Rate Graph */}
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
              Turnover Rate
            </div>
            {
              <DonutChart
                labels={["Stock-out", "Stock-in"]}
                labelsValues={[stockOut, stockIn]}
                isPercent={false}
              />
            }
          </div>

          {/* Stockout Incidents Graph */}
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
              Stockout Incidents
            </div>
            {
              <LineChart
                labels={stockoutMonths}
                dataPoints={stockoutIncidents}
                isXAxisText={true}
                xAxisText="Months"
                yAxisText="no. of stockout incidents"
              />
            }
          </div>

          {/* Inventory Age Graph */}
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
              Inventory Age
            </div>
            {
              <LineChart
                labels={inventoryAgeMonths}
                dataPoints={inventoryAgeTime}
                isXAxisText={true}
                xAxisText="Months"
                yAxisText="avg. time items stayed in rack (Mins)"
              />
            }
          </div>
        </div>
      </div>
    </>
  );
};

export default LeftSideBarStorageRack;
