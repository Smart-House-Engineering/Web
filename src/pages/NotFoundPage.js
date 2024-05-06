import React from "react";
import { Link } from "react-router-dom";
import "../style/noFoundPage.css"; // Import CSS file for styling

const NotFoundPage = () => {
  return (
    <div className="not-found-container">
      <h1 className="not-found-heading">404 - Page Not Found</h1>
      <p className="not-found-message">
        The page you are looking for does not exist.
      </p>
      <p className="not-found-back-link">
        <Link to="/default" className="not-found-link">
          Go back to home
        </Link>
      </p>
    </div>
  );
};

export default NotFoundPage;
