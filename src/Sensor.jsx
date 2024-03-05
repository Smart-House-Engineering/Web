import { useState } from 'react'
import "./sensor.css";


export default function Sensor(props) {

    let { keyName, value} = props;
    const [like, setLike] = useState(value);
     
    console.log('Sensor Component Props:', props)
    

    const Switch = async () => {
        try{ setLike(!like);

            let updatedDevices = { [keyName]: !like };
            console.log(updatedDevices)
            console.log(typeof updatedDevices)

            // Send the updated state to the backend
            const serverResponse = await fetch("https://backend-ten-ruby.vercel.app/api/modes/defaultMode", {
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

    return(
        <div className={`caption ${like ? 'on' : 'off'}`}   onClick = {Switch}>
        <div className="Name-switch"><div className="keyName"><div className="s-name">{keyName}</div></div>
        <label className="switch">
        <input type="checkbox" checked={like} onChange={Switch} />
        <span className="slider round"></span>
      </label></div>
      <img src={`/${keyName.toLowerCase()}.svg`} alt={`${keyName} icon`}></img>
      <div className="s-shell"><div className="s-state">{like ? 'On' : 'Off'}</div></div>
      </div>
    )
}
