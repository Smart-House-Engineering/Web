import { useState } from 'react'
import "./sensor.css";


export default function Sensor(props) {

    let { keyName, value} = props;
    const [like, setLike] = useState(value);
     
    console.log('Sensor Component Props:', props)
    

    const Switch = async () => {
        try{ setLike(!like);

            let updatedDevices = { [keyName]: !like };
            console.log('I am updated sensors',updatedDevices)
            console.log(typeof updatedDevices)

            // Send the updated state to the backend
            const serverResponse = await fetch(" https://evanescent-beautiful-venus.glitch.me/api/homeUser/defaultMode", {
              method: "PUT",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
              cookies: localStorage.getItem("SmartHouseToken"),
              body: JSON.stringify({"updatedDevices":updatedDevices}), // Toggle the like state
            });
      
            if (!serverResponse.ok) {
              throw new Error(`HTTP error! status: ${serverResponse.status}`);
            }
      
            const response = await serverResponse.json();
            console.log("Response from server", response);
          } catch (error) {
            console.error("Error:", error.message);
          }

        
        
      };

      // Conditionally determine the text to display and the value for 'like'
    const displayValue = keyName === "door" || keyName === "window" ? (like ? "Open" : "Closed") : (like ? "On" : "Off");

    return(
        <div className={`caption ${like ? 'on' : 'off'}`}   onClick = {Switch}>
        <div className="Name-switch"><div className="keyName"><div className="s-name">{keyName === "servo1" ? "Door" : keyName === "servo2" ? "Window" : keyName}</div></div>
        <label className="switch">
        <input type="checkbox" checked={like} onChange={Switch} />
        <span className="slider round"></span>
      </label></div>
      <img src={`/${keyName.toLowerCase()}.svg`} alt={`${keyName} icon`}></img>
      <div className="s-shell"><div className="s-state">{displayValue}</div></div>
      </div>
    )
}
