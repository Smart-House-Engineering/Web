import { useState, useEffect } from "react";
import Sensor from "../components/Sensor";
import SideBoard from "../components/Sideboard";
import { useNavigate } from "react-router-dom";
import "../style/default-page.css";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../utils/authContext";
//import jwt_decode from "jwt-decode";

export default function DefaultPage() {
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useAuth();
  console.log("is logged in", isLoggedIn);
  console.log("auth user", authUser);
  useEffect(() => {}, [isLoggedIn, authUser]);
  const [sensors, setSensors] = useState([]);
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

  return (
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
  );
}
