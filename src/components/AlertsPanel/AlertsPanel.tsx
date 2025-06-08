import React from "react";
import "./AlertsPanel.css";

const AlertsPanel = () => {
  const alerts = [
    {
      message: "Storage rack # 6 near depletion",
      time: "10 minutes ago",
      severity: "warning",
    },
    {
      message: "Robot Model 1 (RM-1) out of battery",
      time: "30 minutes ago",
      severity: "critical",
    },
    {
      message: "Forklift Model 2 (FM-2) battery at low level",
      time: "40 minutes ago",
      severity: "warning",
    },
    {
      message: "Collision at aisle 3",
      time: "1 hour ago",
      severity: "critical",
    },
  ];

  const handleClick = (alert: any, index: number) => {
    console.log(`Alert clicked:`, alert);
    console.log(`Alert index:`, index);
    // Add your click handling logic here
  };

  return (
    <div className="alerts-panel">
      {/* Breadcrumb */}
      <div className="alerts-panel-div">
        {/* Object Name */}
        <span style={{ fontWeight: 700 }}>Alerts</span>
      </div>
      <div
        style={{
          width: "220px",
          height: "auto",
          backgroundColor: "white",
          borderRadius: "0.75rem",
          border: "1px solid #e5e7eb",
          padding: "0.8rem",
          transform: "none",
        }}
      >
        {alerts.map((alert, index) => (
          <div
            key={index}
            onClick={() => handleClick(alert, index)}
            style={{
              display: "flex",
              alignItems: "center",
              marginBottom: index < alerts.length - 1 ? "0.6rem" : "0",
              gap: "0.6rem",
              cursor: "pointer",
              padding: "0.4rem",
              borderRadius: "0.5rem",
            }}
            onMouseOver={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor =
                "#f0f0f0";
            }}
            onMouseOut={(e) => {
              (e.currentTarget as HTMLElement).style.backgroundColor = "white";
            }}
          >
            {/* Alert Icon */}
            <img
              src={
                alert.severity === "warning"
                  ? "/images/warning.svg"
                  : "/images/critical.svg"
              }
              alt={alert.severity}
              style={{
                width: "20px",
                height: "20px",
                flexShrink: 0,
              }}
            />

            {/* Alert Content */}
            <div style={{ flex: 1, minWidth: 0 }}>
              <div
                style={{
                  color: "#374151",
                  lineHeight: "1.2",
                  marginBottom: "4px",
                  fontWeight: "600",
                }}
              >
                {alert.message}
              </div>
              <div
                style={{
                  fontSize: "12px",
                  color: "#6b7280",
                  lineHeight: "1",
                }}
              >
                {alert.time}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AlertsPanel;
