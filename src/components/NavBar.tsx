import React from "react";

const NavBar = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        zIndex: 1000000000000,
        backgroundColor: "white",
        position: "fixed",
        top: 0,
        height: "10vh",
        width: "100%",
        left: 0,
      }}
    >
      <div>TwinWare</div>
    </div>
  );
};

export default NavBar;
