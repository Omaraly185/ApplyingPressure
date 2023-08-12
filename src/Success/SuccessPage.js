import React from "react";
import { useLocation } from "react-router-dom";
import Header from "../Component/Header";

function SuccessPage() {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const selectedDate = searchParams.get("selectedDate");
  const selectedTime = searchParams.get("selectedTime");

  return (
    <div>
      <Header />
      <h2 style={{ marginTop: "100px", fontSize: "40px" }}>
        Appointment Confirmed!
      </h2>
      <p style={{ fontSize: "20px" }}>
        You have confirmed an appointment for {selectedDate} at {selectedTime}.
      </p>
    </div>
  );
}

export default SuccessPage;
