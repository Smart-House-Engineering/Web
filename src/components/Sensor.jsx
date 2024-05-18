import { useEffect, useState } from "react";
import "../style/sensor.css";

export default function Sensor(props) {
  let { keyName, value, Val, setV } = props;
  const [like, setLike] = useState(value);

  useEffect(() => {
    setLike(value);
  }, [value]);

  const Switch = async () => {
    try {
      setLike(!like);

      let updatedDevices = { [keyName]: !like };
      console.log("I am updated sensors", updatedDevices);
      console.log(typeof updatedDevices);

      // Send the updated state to the backend
      const serverResponse = await fetch(
        " https://evanescent-beautiful-venus.glitch.me/api/homeUser/defaultMode",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          cookies: localStorage.getItem("SmartHouseToken"),
          body: JSON.stringify({ updatedDevices: updatedDevices }), // Toggle the like state
        }
      );

      if (!serverResponse.ok) {
        throw new Error(`HTTP error! status: ${serverResponse.status}`);
      }

      const response = await serverResponse.json();
      const update = response.updatedHome.devices;

      console.log("Response from update", update);
      console.log("Response from server", response);
      console.log("Response from update", update);

      let trueCount = 0;

      for (const key in update) {
        if (update.hasOwnProperty(key)) {
          if (update[key] === true || update[key] === 1) {
            trueCount++;
          }
        }
      }

      setV("idValue", (Val.idValue = trueCount));
      console.log("Response from true", trueCount);

      console.log("Response from Val", Val);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  const displayValue =
    keyName === "door" || keyName === "window"
      ? like
        ? "Open"
        : "Closed"
      : like
      ? "On"
      : "Off";

  return (
    <div className={`caption ${like ? "on" : "off"}`} onClick={Switch}>
      <div className="Name-switch">
        <div className="keyName">
          <div className="s-name">{keyName}</div>
        </div>
        <label className="switch">
          <input type="checkbox" checked={like} onChange={Switch} />
          <span className="slider round"></span>
        </label>
      </div>
      <img src={`/${keyName.toLowerCase()}.svg`} alt={`${keyName} icon`}></img>
      <div className="s-shell">
        <div className="s-state">{displayValue}</div>
      </div>
    </div>
  );
}
