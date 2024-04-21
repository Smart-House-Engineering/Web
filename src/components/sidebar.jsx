import React from "react";
import { useNavigate } from "react-router-dom";
import "react-circular-progressbar/dist/styles.css";

function Sidebar() {
  const navigate = useNavigate();
  const logout = async () => {
    navigate("/");
  };

  return (
    <div className="sidebar">
      <img src="/SEA-logo.png" alt="Logo of the app"></img>
      <div className="home-icon" onClick={() => navigate("/default-page")}>
        <img src="/home-2.svg" alt="Home or default page"></img>
        <p>Home</p>
      </div>
      <div className="home-icon">
        <img src="/modes.svg" alt="Modes page"></img>
        <p>Modes</p>
      </div>
      <div className="home-icon">
        <img src="/microphone-2.svg" alt="Voice recognition"></img>
        <p>Voice</p>
      </div>
      <div className="home-icon" onClick={() => navigate("/add-user")}>
        <img src="/logged.svg" alt="Logout"></img>
        <p> Add user</p>
      </div>
      <div className="home-icon" onClick={logout}>
        <img src="/logged.svg" alt="Logout"></img>
        <p>Logout</p>
      </div>
    </div>
  );
}

export default Sidebar;
