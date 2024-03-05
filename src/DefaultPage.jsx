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
                <div className="sidebar">
                <img src="/SEA-logo.png" alt="Logo of the app"></img>
                <div className="home-icon">
                <img src="/home-2.svg" alt="Home or default page"></img>
                <p>Home</p></div>
                <div className="home-icon">
                <img src="/modes.svg" alt="Modes page"></img>
                <p>Modes</p></div>
                <div className="home-icon">
                <img src="/microphone-2.svg" alt="Voice recognition"></img>
                <p>Voice</p></div>
                <div className="home-icon">
                <img src="/logged.svg" alt="Voice recognition"></img>
                <p>Logout</p></div>


                </div>

           
      <div className="boards-side"><div className="boards">
      <h1>I am the default page </h1>
        board </div>
        <div className="side-board">
            <div className="profile"> Profile</div>
            <div className="members"> Members</div>
            <div className="members"> Something</div>

        </div></div>
      <div className="sensors">
      {
      Object.entries(sensors).map(([key, value]) => (
        <Sensor key={key} keyName={key} value={value} />
      ))}

      


      </div>
        </div>
    );
}
