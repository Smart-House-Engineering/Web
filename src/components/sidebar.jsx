import React from "react";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../utils/authContext";
import EmergencyMode from "./emergencyMode";

function Sidebar() {
  const navigate = useNavigate();

  const { setIsLoggedIn, setAuthUser, authUser } = useAuth();

  const logout = async () => {
    setAuthUser(null);
    setIsLoggedIn(false);
    navigate("/");
  };

  return (
    <div className="sidebar">
      <img src="/SEA-logo.png" alt="Logo of the app"></img>
      <div className="home-icon" onClick={() => navigate("/default")}>
        <img src="/home-2.svg" alt="Home or default page"></img>
        <p>Home</p>
      </div>

      <EmergencyMode />

      {authUser?.role === "OWNER" ? (
        <div className="home-icon" onClick={() => navigate("/add-user")}>
          <img src="/add-user.svg" alt="Logout"></img>
          <p> Add user</p>
        </div>
      ) : null}
      <div className="home-icon" onClick={logout}>
        <img src="/logged.svg" alt="Logout"></img>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
