import React from "react";
import { Link } from "react-router-dom";
import "./Button.css";

function Button() {
  return (
    <div className="container">
      <div className="btn">
        <Link to="/Book_Now">BOOK-NOW</Link>
      </div>
    </div>
  );
}

export default Button;
