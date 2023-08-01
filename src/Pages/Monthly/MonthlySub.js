import React from 'react';
import Header from '../../Component/Header';
import './MonthlySub.scss';
import MonthlyPic from './Monthly.JPG';
function MonthlySub() {
  return (
    <div className="fluid myCustomHeight">
      <Header />

      <img class="monthly-service-image" src={MonthlyPic} alt=" im" />
    </div>
  );
}

export default MonthlySub;
