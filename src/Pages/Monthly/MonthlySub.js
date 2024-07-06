import React from "react";
import Header from "../../Component/Header";
import "./MonthlySub.scss";
import MonthlyPic from "./Monthly.PNG";
function MonthlySub() {
  return (
    <div className="fluid myCustomHeight">
      <Header />

      <div className="monthly-container">
        <img className="monthly-service-image" src={MonthlyPic} alt=" im" />
      </div>
    </div>
  );
}

export default MonthlySub;
