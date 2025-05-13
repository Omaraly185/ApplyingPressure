import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import "./MonthlySub.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sedan from "./Sedan-ap.png";
import SUV from "./2row-ap.png";
import Mini from "./mini-van-ap.png";
import Van from "./van-ap.png";
import exterior from "./Exterior-only.jpeg";
import interior from "./interior-only.jpeg";
import exteriorInterior from "./Exteror-and-interior.png";
import ceramic from "./ceramic-coating.png";
import polish from "./polish.jpeg";
import goldBackground from "./gold-opacity.png";
import pressureBackground from "./pressure_opacity.png";

import { format, startOfMonth, addMonths, addDays } from "date-fns";

function MonthlySub() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("");
  const [events, setEvents] = useState([]);
  const [excludedDynamicDates, setExcludedDynamicDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [activeStep, setActiveStep] = useState(1);

  const timeSlots = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const carType = [
    { name: "Sedan", image: Sedan },
    { name: "2 Row SUV", image: SUV },
    { name: "3 Row/ Pickup truck", image: Mini },
    { name: "Van", image: Van },
  ];

  const services = [
    { name: "Exterior Only", image: exterior },
    { name: "Interior Only", image: interior },
    { name: "Exterior and Interior", image: exteriorInterior },
    { name: "Ceramic Coating", image: ceramic },
    { name: "Paint Correction", image: polish },
  ];

  const breadcrumbs = [
    { label: "Car Type", step: 1 },
    { label: "Service", step: 2 },
    { label: "Package", step: 3 },
    { label: "Confirmation", step: 4 },
  ];

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          "https://applyingpressure-api-production.up.railway.app/events"
        );
        const data = await res.json();
        setEvents(data);
      } catch (err) {
        console.error("Error fetching events:", err);
      }
    }
    fetchEvents();
  }, []);

  const maxDate = addMonths(startOfMonth(new Date()), 4);

  const checkAvailableDates = (month) => {
    const newExcluded = [];
    const start = startOfMonth(month);
    for (let i = 0; i < 31; i++) {
      const date = addDays(start, i);
      if (!timeSlots.some((slot) => isTimeAvailable(date, slot))) {
        newExcluded.push(date);
      }
    }
    setExcludedDynamicDates((prev) => [
      ...prev,
      ...newExcluded.filter(
        (d) => !prev.some((p) => p.getTime() === d.getTime())
      ),
    ]);
  };

  useEffect(() => {
    checkAvailableDates(currentMonth);
  }, [currentMonth, events]);

  const handleMonthChange = (date) => {
    const newMonth = startOfMonth(date);
    if (newMonth.getTime() !== currentMonth.getTime()) {
      setCurrentMonth(newMonth);
    }
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    setSelectedTime("");
  };

  const handleServiceClick = () => {
    setActiveStep((prev) => Math.min(prev + 1, breadcrumbs.length));
  };

  const handleStepChange = (step) => {
    setActiveStep(step);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const isTimeAvailable = (date, time) => {
    const dateTime = new Date(`${format(date, "yyyy-MM-dd")} ${time}`);
    const endTime = new Date(dateTime);
    endTime.setHours(endTime.getHours() + 1);
    return !events.some((evt) => {
      const start = new Date(evt.start);
      const end = new Date(evt.end);
      return (
        (dateTime >= start && dateTime < end) ||
        (endTime > start && endTime <= end) ||
        (dateTime < start && endTime > end)
      );
    });
  };

  return (
    <div className="monthly-sub-container">
      {/* 
      <div className="fluid customHeight">
        <Header />

        <div className="appointment-container">
          <div className="left-panel">
            <div className="header">
              <div className="icon">🤝</div>
              <h2>Make an appointment</h2>
              <p>30 min</p>
            </div>
            <p>
              Some description text goes here to describe the appointment details.
            </p>
          </div>

          <div className="right-panel">
            <h3>Select a Date & Time</h3>
            <div className="calendar-container">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                onMonthChange={handleMonthChange}
                minDate={addDays(new Date(), 1)}
                maxDate={maxDate}
                inline
                excludeDates={[...staticExcludedDates, ...excludedDynamicDates]}
                calendarClassName="custom-calendar"
                dayClassName={(date) =>
                  date.getDate() === selectedDate.getDate() &&
                  date.getMonth() === selectedDate.getMonth()
                    ? "selected-date"
                    : undefined
                }
              />
            </div>
            <div className="time-slots">
              {timeSlots
                .filter((time) => isTimeAvailable(selectedDate, time))
                .map((time) => (
                  <button
                    key={time}
                    className={`time-slot ${
                      selectedTime === time ? "active" : ""
                    }`}
                    onClick={() => handleTimeSelect(time)}
                  >
                    {time}
                  </button>
                ))}
              {timeSlots.every(
                (time) => !isTimeAvailable(selectedDate, time)
              ) && <div>No available times on this day</div>}
            </div>
          </div>
        </div>
      </div>
      */}

      <Header />

      {/* Breadcrumbs (desktop) */}
      <nav className="breadcrumb large-screen-only">
        <ul>
          {breadcrumbs.map((bc) => {
            const isCurrent = activeStep === bc.step;
            const isCompleted = activeStep > bc.step;
            const isNext = activeStep + 1 === bc.step;
            return (
              <li
                key={bc.step}
                className={`${isCurrent ? "current" : ""} ${
                  isCompleted ? "completed" : ""
                } ${isNext ? "next" : ""}`}
                onClick={() => handleStepChange(bc.step)}
              >
                <a>{bc.label}</a>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* Mobile back button */}
      <div className="navigation-buttons small-screen-only">
        {activeStep > 1 && (
          <button
            className="back-button"
            onClick={() => handleStepChange(activeStep - 1)}
          >
            {activeStep > 1 ? breadcrumbs[activeStep - 2]?.label : "<"}
          </button>
        )}
      </div>

      {/* Step 1: Car Type */}
      {activeStep === 1 && (
        <div className="service-options-container">
          <h1 className="service-header">Select Your Car Type</h1>
          <div className="service-options">
            {carType.map((ct, i) => (
              <div
                key={i}
                className="service-card"
                onClick={handleServiceClick}
              >
                <img src={ct.image} alt={ct.name} className="service-image" />
                <h2 className="service-name">{ct.name}</h2>
                <button className="view-options-button">View Options</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 2: Service */}
      {activeStep === 2 && (
        <div className="service-options-container">
          <h1 className="service-header">Select Your Service</h1>
          <div className="service-options">
            {services.map((svc, i) => (
              <div
                key={i}
                className="service-card"
                onClick={handleServiceClick}
              >
                <img src={svc.image} alt={svc.name} className="service-image" />
                <h2 className="service-name">{svc.name}</h2>
                <button className="view-options-button">View Options</button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Interior Packages */}
      {activeStep === 3 && (
        <div className="packages-container">
          <h1 className="packages-header">Interior Services</h1>
          <div className="packages-grid">
            <div
              className="package gold"
              style={{
                backgroundImage: `url(${goldBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="package-title">GOLD</h2>
              <p className="package-price">Starting at $149</p>
              <ul className="package-details" style={{ marginInline: "20px" }}>
                <li>
                  Agitate/wipe down doors, jambs, dash, console, and trims
                </li>
                <li>Vacuum seats, mats, floor, and trunk</li>
                <li>Clean all windows</li>
                <li>Deep clean/shampoo floor mats</li>
                <li>Deep cleaning - shampoo & condition seats</li>
                <li>UV Protection & Interior Shine</li>
                <li>Agitate and clean seat belts</li>
              </ul>
              <div className="locked-options">
                <h3 className="locked-header">Not Included</h3>
                <ul className="package-details locked">
                  <li>🔒 Deep clean & remove stains from the floor</li>
                  <li>🔒 Deep clean & remove stains from the headliner</li>
                  <li>🔒 Aids in reducing car odor</li>
                </ul>
              </div>
              <button className="package-button">Book</button>
            </div>

            <div
              className="package pressure"
              style={{
                backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.3)), url(${pressureBackground})`,
                backgroundRepeat: "no-repeat",
                backgroundSize: "cover",
                backgroundPosition: "center",
              }}
            >
              <h2 className="package-title">⚡ PRESSURE</h2>
              <p className="package-price">Starting at $249</p>
              <ul className="package-details">
                <li>
                  Agitate/wipe down doors, jambs, dash, console, and trims
                </li>
                <li>Vacuum seats, mats, floor, and trunk</li>
                <li>Clean all windows</li>
                <li>Deep clean/shampoo floor mats</li>
                <li>Deep cleaning - shampoo & condition seats</li>
                <li>UV Protection & Interior Shine</li>
                <li>Agitate and clean seat belts</li>
                <li>Deep clean & remove stains from the floor</li>
                <li>Deep clean & remove stains from the headliner</li>
                <li>Aids in reducing car odor</li>
              </ul>
              <button className="package-button">Book</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 4: Exterior Packages */}
      {activeStep === 4 && (
        <div className="packages-container">
          <h1 className="packages-header">Exterior Detail</h1>
          <div className="packages-grid">
            <div className="package">
              <h2 className="package-title">Paint Enhancement</h2>
              <div className="sub-package">
                <p className="package-price">Starting at $399</p>
                <ul className="package-details">
                  <li>Foam pre-rinse and bath</li>
                  <li>Full decontamination (clay/iron treatment)</li>
                  <li>Bug and tar removal</li>
                  <li>Shine all exterior surfaces</li>
                  <li>Apply 6-months protection</li>
                  <li>Reduce minor swirls and surface imperfections</li>
                  <li>Boost depth and clarity for showroom shine</li>
                  <li>Eliminate water spots and surface oxidation</li>
                </ul>
                <button className="package-button">Learn more</button>
              </div>
            </div>

            <div className="package">
              <h2 className="package-title">Wash & Wax</h2>
              <p className="package-price">Starting at $149</p>
              <ul className="package-details">
                <li>Foam pre-rinse and bath</li>
                <li>Full decontamination (clay/iron treatment)</li>
                <li>Bug and tar removal</li>
                <li>Shine all exterior surfaces</li>
                <li>Apply 6-months protection</li>
              </ul>
              <div className="locked-options">
                <h3 className="locked-header">Not Included</h3>
                <ul className="package-details locked">
                  <li>🔒 Reduce minor swirls and imperfections</li>
                  <li>🔒 Boost depth and clarity</li>
                  <li>🔒 Eliminate water spots and oxidation</li>
                </ul>
              </div>
              <button className="package-button">Book</button>
            </div>
          </div>
        </div>
      )}

      {/* Step 5 would go here if you add more */}
    </div>
  );
}

export default MonthlySub;
