import { useState, useEffect } from "react";
import Sensor from "./Sensor"; 

export default function DefaultPage() {
    const [sensors, setSensors] = useState([]);

    useEffect(() => {

      let isMounted = true;
        const fetchData = async () => {
            const response = await fetch(
                "http://localhost:5000/api/modes/defaultMode",
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
                console.error(
                    `Failed to fetch data. Status: ${response.status}`
                );
            }
        };

        if(isMounted){ fetchData() }
    return () => { isMounted = false; }  

    },[]);

    console.log("sensors", sensors);
    
   

    return (
        <div className="default">
            <h1>I am the default page {sensors.fan}</h1>
            <div className="sidebar">Sidebar with h m l</div>
      <div className="boards">div with members,board and profile</div>
      <div className="sensors">Sensors
      {
      Object.entries(sensors).map(([key, value]) => (
        <Sensor key={key} keyName={key} value={value} />
      ))}
      


      </div>
        </div>
    );
}
