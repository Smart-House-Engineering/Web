//import "../style/default-page.css";
import { useNavigate } from "react-router-dom";
import "../style/emergency.css";
import { useState, useEffect } from "react";
import { useAuth } from "../utils/authContext";

export default function EmergencyMode() {
  const [isToggled, setIsToggled] = useState(false);
  const navigate = useNavigate();
  const { isLoggedIn, authUser } = useAuth();

  useEffect(() => {
    if (authUser?.role !== "OWNER" || authUser?.role !== "OWNER") {
      navigate("/unauthorized");
    }
    async function fetchData() {
      try {
        let response = await fetch(
          "https://evanescent-beautiful-venus.glitch.me/api/modes/otherModes",
          {
            method: "GET",
            credentials: "include",
            headers: {
              "Content-Type": "application/json",
              "Access-Control-Allow-Credentials": true,
            },
            mode: "cors",
          }
        );
        let data = await response.json();
        console.log("response", data.modes.emergency);
        if (data.modes.emergency === true) {
          setIsToggled(true);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }
    fetchData();
    const intervalId = setInterval(fetchData, 5000);
    return () => clearInterval(intervalId);
  }, [isLoggedIn, authUser]);

  const handleToggle = async () => {
    try {
      // Toggle isToggled state
      const updatedIsToggled = !isToggled;
      setIsToggled(updatedIsToggled);

      // Send the updated state to the backend
      const serverResponse = await fetch(
        "https://evanescent-beautiful-venus.glitch.me/api/homeUser/otherModes",
        {
          method: "PUT",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            "Access-Control-Allow-Credentials": true,
          },
          cookies: localStorage.getItem("SmartHouseToken"),
          body: JSON.stringify({
            updatedModes: { emergency: updatedIsToggled },
          }), // Toggle the like state
        }
      );

      if (!serverResponse.ok) {
        throw new Error(`HTTP error! status: ${serverResponse.status}`);
      }

      const response = await serverResponse.json();

      console.log("response", response);
    } catch (error) {
      console.error("Error:", error.message);
    }
  };

  return (
    <div className="emergency-con">
      <div className="emergency-t">
        <label className="switch" checked={isToggled} onChange={handleToggle}>
          <input type="checkbox" checked={isToggled} onChange={handleToggle} />
          <span className="slider round"></span>
        </label>
        <p>emergency mode</p>
      </div>
    </div>
  );
}
