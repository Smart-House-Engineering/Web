import React from "react";
import "../style/unauthorized.css"; // Import CSS file for styling
import { useNavigate } from "react-router-dom";
import { useAuth } from "../utils/authContext";

const Unauthorized = () => {
    const navigate = useNavigate();
    const { setIsLoggedIn, setAuthUser, authUser } = useAuth();
    console.log("auth user", authUser);
    return (
        <div className="unauthorized-container" data-testid="unauthorized">
            <img src="/lock.png" alt="Lock Icon" className="lock-icon" />
            <h1>Unauthorized Access</h1>
            <p>
                You are not authorized to view this page. Please login to
                continue.
            </p>
            <button onClick={() => navigate("/")} className="login-button">
                Login
            </button>
        </div>
    );
};

export default Unauthorized;
