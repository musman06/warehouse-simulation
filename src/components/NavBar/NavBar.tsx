import React, { useState } from "react";
import "./NavBar.css";
import PersonIcon from "@mui/icons-material/Person";
import UserProfileCard from "../UserProfileCard/UserProfileCard";

const NavBar = () => {
  const [showProfileCard, setShowProfileCard] = useState(false);

  const handleProfileIconClick = () => {
    setShowProfileCard((prev) => !prev);
  };

  return (
    <div className="navbar-container">
      <div className="navbar-titlelogo-container">
        <div className="navbar-logo">
          <img src="/images/twinware-logo.jpg" width={95} />
        </div>
      </div>
      <div
        className="navbar-profile-container"
        onClick={handleProfileIconClick}
      >
        <PersonIcon
          sx={{
            color: "#eb841b",
            fontSize: 28,
            marginRight: 0,
            padding: "3px",
            borderRadius: "100px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
        />
      </div>

      {showProfileCard && (
        <UserProfileCard onClose={() => setShowProfileCard(false)} />
      )}
    </div>
  );
};

export default NavBar;
