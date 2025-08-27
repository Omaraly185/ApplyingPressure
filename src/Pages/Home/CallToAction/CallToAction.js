import React from "react";
import { useNavigate } from "react-router-dom";
import "./CallToAction.css";

const CallToAction = () => {
  const navigate = useNavigate();

  const handleBookNowClick = () => {
    navigate("/monthly");
  };

  return (
    <div className="cta-container">
      <div className="cta-content">
        <h2 className="cta-title">Ready to Transform Your Vehicle?</h2>
        <p className="cta-description">
          Experience the difference with our professional mobile detailing
          services. Book your appointment today and see why our customers love
          us!
        </p>
        <button className="cta-button" onClick={handleBookNowClick}>
          Book Now
        </button>
        <p className="cta-subtitle">
          We come to you • Professional service • 100% satisfaction guaranteed
        </p>
      </div>
    </div>
  );
};

export default CallToAction;
