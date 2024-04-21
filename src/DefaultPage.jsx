import { useState, useEffect } from "react";
import Sensor from "./Sensor";
import SideBoard from "./Sideboard";
import { useNavigate } from "react-router-dom";
import "./default-page.css";
import "react-circular-progressbar/dist/styles.css";
//import jwt_decode from "jwt-decode";

export default function DefaultPage() {
  const [sensors, setSensors] = useState([]);
  const navigate = useNavigate();

  const [Val, setVal] = useState({
    idValue: 0,
  });

  const setV = (key, value) => setVal({ ...Val, [key]: value });

  useEffect(() => {
    let isMounted = true;
    const fetchData = async () => {
      const response = await fetch(
        " https://evanescent-beautiful-venus.glitch.me/api/modes/defaultMode",
        {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          cookies: localStorage.getItem("SmartHouseToken"),
        }
      );
      if (response.ok) {
        const data = await response.json();
        console.log(data.devices);
        setSensors(data.devices);
      } else {
        console.error(`Failed to fetch data. Status: ${response.status}`);
      }
    };

    if (isMounted) {
      fetchData();
    }
    return () => {
      isMounted = false;
    };
  }, []);

  useEffect(() => {
    let trueCount = 0;

    for (const key in sensors) {
      if (sensors.hasOwnProperty(key)) {
        if (sensors[key] === true || sensors[key] === 1) {
          trueCount++;
        }
      }
    }
    console;

    setV("idValue", (Val.idValue = trueCount));
    console.log("sensors", trueCount);
  }, [sensors]);

  const logout = async () => {
    navigate("/");
  };
  const addUser = async () => {
    navigate("/add-user");
  };

  return (
    <div className="default">
      <div className="sidebar">
        <img src="/SEA-logo.png" alt="Logo of the app"></img>
        <div className="home-icon">
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
        <div className="home-icon" onClick={addUser}>
          <img src="/logged.svg" alt="Logout"></img>
          <p> Add user</p>
        </div>
        <div className="home-icon" onClick={logout}>
          <img src="/logged.svg" alt="Logout"></img>
          <p>Logout</p>
        </div>
      </div>

      <div className="boards-sensors">
        <div className="boards-side">
          <div className="boards-container">
            <div className="sensors-con">
              <div className="sensors">
                {Object.entries(sensors).map(([key, value]) => (
                  <Sensor
                    key={key}
                    keyName={key}
                    value={value}
                    Val={Val}
                    setV={setV}
                  />
                ))}
              </div>
            </div>

            {/*sideboard*/}
            <SideBoard Val={Val} setV={setV} />
          </div>
        </div>
      </div>
    </div>
  );
}
