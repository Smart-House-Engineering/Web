import { useState, useEffect } from "react";
import Sensor from "./Sensor"; 
import "./default-page.css";
export default function DefaultPage() {
    const [sensors, setSensors] = useState([]);

    useEffect(() => {

      let isMounted = true;
        const fetchData = async () => {
            const response = await fetch(
                "https://backend-ten-ruby.vercel.app/api/modes/defaultMode",
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
                <div className="sidebar">Sidebar with h m l
                <img src="/SEA-logo.png" alt="Logo of the app"></img>

                </div>

           
      <div className="boards">
      <h1>I am the default page {sensors.fan}</h1>
        div with members,board and profile</div>
      <div className="sensors">
      {
      Object.entries(sensors).map(([key, value]) => (
        <Sensor key={key} keyName={key} value={value} />
      ))}

      


      </div>
        </div>
    );
}
