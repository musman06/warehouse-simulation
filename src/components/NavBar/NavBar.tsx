import "./NavBar.css";
import NotificationsIcon from "@mui/icons-material/Notifications";
import PersonIcon from "@mui/icons-material/Person";

const NavBar = () => {
  return (
    <div className="navbar-container">
      <div className="navbar-titlelogo-container">
        <div className="navbar-logo">
          <img src="/images/twinware-logo1.png" width={100} />
        </div>
        {/* <div className="navbar-title">TwinWare</div> */}
      </div>
      <div className="navbar-profile-container">
        <NotificationsIcon
          sx={{
            color: "#da5817",
            fontSize: 28,
            marginRight: 2,
            padding: "3px",
            borderRadius: "100px",
            cursor: "pointer",
            transition: "all 0.3s ease",
            "&:hover": {
              transform: "scale(1.15)",
            },
          }}
        />
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
    </div>
  );
};

export default NavBar;
