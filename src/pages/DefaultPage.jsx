import { useState, useEffect } from "react";
import Sensor from "../components/Sensor";
import SideBoard from "../components/Sideboard";
import { useNavigate } from "react-router-dom";
import "../style/default-page.css";
import "react-circular-progressbar/dist/styles.css";
import { useAuth } from "../utils/authContext";

export default function DefaultPage() {
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useAuth();
  const [sensors, setSensors] = useState([]);
  const [Val, setVal] = useState({
    idValue: 0,
  });

  const excludedSensors = ["RFan", "button1", "button2"];
  const valueOnlySensors = ["soilSensor", "steamSensor", "gasSensor", "photocell"];

  const setV = (key, value) => setVal({ ...Val, [key]: value });

  const fetchData = async () => {
    try {
      const response = await fetch(
        "https://evanescent-beautiful-venus.glitch.me/api/modes/defaultMode",
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
    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  };

    useEffect(() => {
        let isMounted = true;

    if (authUser?.role !== "OWNER" && authUser?.role !== "TENANT") {
      navigate("/unauthorized");
    }

    const updateTrueCount = () => {
      let trueCount = 0;
      for (const key in sensors) {
        if (sensors.hasOwnProperty(key)) {
          if (sensors[key] === true || sensors[key] === 1) {
            trueCount++;
          }
        }
      }
      setV("idValue", (Val.idValue = trueCount));
      console.log("sensors", trueCount);
    };

    if (isMounted) {
      fetchData();
      updateTrueCount();
    }

    const intervalId = setInterval(() => {
      if (isMounted) {
        fetchData();
      }
    }, 5000);

    return () => {
      isMounted = false;
      clearInterval(intervalId);
    };

  }, [isLoggedIn, authUser, sensors]);

  const toggleableSensors = Object.entries(sensors).filter(
    ([key]) => !excludedSensors.includes(key) && !valueOnlySensors.includes(key)
  );
  const displayOnlySensors = Object.entries(sensors).filter(([key]) =>
    valueOnlySensors.includes(key)
  );

  return (
    <div className="boards-sensors" data-testid="sensors-container">
      <div className="boards-side">
        <div className="boards-container">
          <div className="sensors-con">
            <div className="toggleable-sensors">
              <h3>Digital Sensors</h3>
              <div className="sensors">
                {toggleableSensors.map(([key, value]) => (
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
            <div className="value-only-sensors">
              <h3 className="section-title">Analog Sensors</h3>
              <div className="sensors">
                {displayOnlySensors.map(([key, value]) => (
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
          </div>
          {/*sideboard*/}
          <SideBoard Val={Val} setV={setV} />
        </div>
      </div>
    </div>
  );
}
