import { useState, useEffect } from "react";
import "../style/default-page.css";
import ProgressBar from "./ProgressBar";
import "react-circular-progressbar/dist/styles.css";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";

export default function SideBoard(props) {
  let { Val, setV } = props;

  const [currentDateTime, setCurrentDateTime] = useState(getCurrentDateTime());
  const [weatherData, setWeatherData] = useState(null);
  const [userData, setUserData] = useState(null);

  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await fetch(
          "https://api.openweathermap.org/data/2.5/weather?q=kristianstad&appid=8bc617daf96702d462e235737931bcd2&units=metric"
        );

        if (response.ok) {
          const data = await response.json();
          setWeatherData(data);
        } else {
          console.error("Failed to fetch weather data");
        }
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };
    fetchWeatherData();

    const fetchUserData = async () => {
      try {
        // Fetch user data from your backend API
        const response = await fetch(
          "https://evanescent-beautiful-venus.glitch.me/api/modes/defaultMode",
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
              credentials: "include",
              headers: {
                "Content-Type": "application/json",
                "Access-Control-Allow-Credentials": true,
              },
            },
          }
        );
        if (response.ok) {
          const userData = await response.json();
          console.log(userData);
          setUserData(userData); // Update state with user data
        } else {
          console.error("Failed to fetch user data");
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };
    fetchUserData;

    const interval = setInterval(() => {
      setCurrentDateTime(getCurrentDateTime());
    }, 1000); // Update every second

    return () => {
      clearInterval(interval);
    };
  }, []);

  function getCurrentDateTime() {
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const today = new Date();
    const year = today.getFullYear();
    const monthIndex = today.getMonth();
    const month = months[monthIndex];
    const date = String(today.getDate()).padStart(2, "0");

    const hours = String(today.getHours()).padStart(2, "0");
    const minutes = String(today.getMinutes()).padStart(2, "0");
    const seconds = String(today.getSeconds()).padStart(2, "0");
    return `${date}-${month}-${year} ${hours}:${minutes}:${seconds}`;
  }
  // return `${today}`

  return (
    <div className="side-board">
      <div className="profile">
        <h2>{currentDateTime.split(" ")[1]}</h2>
        <h3>{currentDateTime.split(" ")[0]}</h3>
        {/* <p>Date, weather and time</p> */}
        {weatherData && (
          <div>
            <h1>{`${weatherData.main.temp}°C`}</h1>
            <p>{`${weatherData.weather[0].description}`}</p>
          </div>
        )}{" "}
      </div>

      <ProgressBar {...{ Val, setV }} />
    </div>
  );
}
