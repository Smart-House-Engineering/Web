import { useState, useEffect } from "react";
import "./external-page.css";
import { useNavigate } from "react-router-dom";

export default function ExternalPage() {
  const [sensors, setSensors] = useState({});
  const [filtered, setFilter] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
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
    fetchData();
  }, []);

  useEffect(() => {
    let filteredObj = Object.fromEntries(
      Object.entries(sensors).filter(
        ([key, value]) => value !== false && value !== 0
      )
    );
    console.log(filteredObj);
    setFilter(filteredObj);
  }, [sensors]);

  console.log("sensors", sensors);
  console.log("filter", filtered);

  const logout = async () => {
    navigate("/");
  };

  return (
    <div className="external-con">
      <div className="ex-con">
        <div className="external-units">
          <div className="eazy-logo">
            <img src="/SEA-logo.png" alt="Logo of the app"></img>
            <h3> staff view</h3>
          </div>
          <h4> Currently active devices</h4>
          {Object.keys(filtered).length > 0 ? (
            <div className="active-sensors">
              {Object.keys(filtered).map((key) => (
                <div className="unit" key={key}>
                  {key}
                </div>
              ))}
            </div>
          ) : (
            <div className="no-active-devices">
              <p>No active devices</p>
            </div>
          )}

          <div className="log" onClick={logout}>
            <img src="/logged.svg" alt="logout icon"></img>
            <p>Logout</p>
          </div>
        </div>
      </div>
    </div>
  );
}
