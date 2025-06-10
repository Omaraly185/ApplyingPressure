// src/pages/MonthlySub/MonthlySub.jsx
import React, { useState, useEffect } from "react";
import Header from "../../Component/Header";
import "./MonthlySub.scss";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import Sedan from "./aha.png";
import SUV from "./2row-ap.png";
import Mini from "./mini-van-ap.png";
import Van from "./van-ap.png";
import exterior from "./Exterior-only.png";
import interior from "./Interior-only.png";
import exteriorInterior from "./Exterior-and-interior.png";
import ceramic from "./ceramic-coating.png";
import polish from "./polish.png";
import CheckIcon from "./check.png";
// import goldBackground from "./gold-opacity.png";
// import pressureBackground from "./pressure_opacity.png";

import { format, startOfMonth, addMonths, addDays } from "date-fns";

function MonthlySub() {
  // existing state
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [events, setEvents] = useState([]);
  const [excludedDynamicDates, setExcludedDynamicDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [activeStep, setActiveStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPlusServices, setShowPlusServices] = useState(false);
  const [selectedPlusServices, setSelectedPlusServices] = useState([]);

  const plusServicesByPackage = {
    GOLD: [
      { name: "Flooring", price: 50, image: Sedan },
      { name: "Headliner", price: 50, image: Sedan },
      { name: "Dog Hair Removal", price: "50-150", image: Sedan },
      {
        name: "Heavy Spills/Odor Removal",
        price: "50-150",
        image: Sedan,
      },
    ],
    PRESSURE: [
      { name: "Dog Hair Removal", price: "50-150", image: Sedan },
      {
        name: "Heavy Spills/Odor Removal",
        price: "50-150",
        image: Sedan,
      },
    ],
    Standard: [
      { name: "Ceramic Sealant", price: 40, image: Sedan },
      { name: "Trim Restoration", price: "75-150", image: Sedan },
      { name: "Engine Bay Cleaning", price: 50, image: Sedan },
      { name: "Headlight Restoration", price: "40-80", image: Sedan },
    ],
    "Wash & Wax": [
      { name: "Trim Restoration", price: "75-150", image: Sedan },
      { name: "Engine Bay Cleaning", price: 50, image: Sedan },
      { name: "Headlight Restoration", price: "40-80", image: Sedan },
    ],
    "Paint Enhancement": [
      { name: "Trim Restoration", price: "75-150", image: Sedan },
      { name: "Engine Bay Cleaning", price: 50, image: Sedan },
      { name: "Headlight Restoration", price: "40-80", image: Sedan },
    ],
  };

  // handle clicking on any package
  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowPlusServices(true);
  };

  // toggle a plus-service
  const handleTogglePlusService = (svc) => {
    setSelectedPlusServices((prev) =>
      prev.includes(svc.name)
        ? prev.filter((s) => s !== svc.name)
        : [...prev, svc.name]
    );
  };

  const currentPlusServices =
    plusServicesByPackage[selectedPackage?.name] || [];
  const totalPrice =
    selectedPackage?.price +
    selectedPlusServices.reduce((sum, name) => {
      const svc = currentPlusServices.find((s) => s.name === name);
      const price =
        typeof svc?.price === "number"
          ? svc.price
          : parseFloat(svc?.price) || 0;
      return sum + price;
    }, 0);

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

  const findNextAvailableDate = () => {
    const today = new Date();
    for (let i = 1; i <= 120; i++) {
      const date = addDays(today, i);
      if (timeSlots.some((slot) => isTimeAvailable(date, slot))) {
        setSelectedDate(date);
        break;
      }
    }
  };
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
  const staticExcludedDates = [];

  const breadcrumbs = [
    { label: "Car Type", step: 1 },
    { label: "Service", step: 2 },
    { label: "Package", step: 3 },
    { label: "Confirmation", step: 4 },
    { label: "Date & Time", step: 5 },
  ];

  useEffect(() => {
    async function fetchEvents() {
      try {
        const res = await fetch(
          "https://applyingpressure-api-production.up.railway.app/events"
        );
        const data = await res.json();
        setEvents(data);
        findNextAvailableDate();
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

  const handleServiceClick = (serviceName) => {
    setSelectedService(serviceName);
    if (serviceName === "Exterior Only") {
      setActiveStep(4);
    } else {
      setActiveStep(3);
    }
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
      {activeStep === 1 && (
        <div className="service-options-container">
          <h1 className="service-header">Select Your Car Type</h1>
          <div className="service-options">
            {carType.map((ct, i) => (
              <div
                key={i}
                className="service-card"
                onClick={() => setActiveStep(2)}
              >
                <img src={ct.image} alt={ct.name} className="service-image" />
                <h2 className="service-name">{ct.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* STEP 2: Service */}
      {activeStep === 2 && (
        <div className="service-options-container">
          <h1 className="service-header">Select Your Service</h1>
          <div className="service-options">
            {services.map((svc, i) => (
              <div
                key={i}
                className="service-card"
                onClick={() => handleServiceClick(svc.name)}
              >
                <img src={svc.image} alt={svc.name} className="service-image" />
                <h2 className="service-name">{svc.name}</h2>
              </div>
            ))}
          </div>
        </div>
      )}
      {/* STEP 3: Interior Packages */}
      {activeStep === 3 &&
        (selectedService === "Interior Only" ||
          selectedService === "Exterior and Interior") && (
          <div className="packages-container">
            <h1 className="packages-header">Interior Services</h1>
            <div className="packages-grid">
              <div
                className="package pressure"
                // style={{
                //   backgroundImage: `linear-gradient(to bottom, rgba(255,255,255,0.5), rgba(0,0,0,0.3)), url(${pressureBackground})`,
                //   backgroundRepeat: "no-repeat",
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
              >
                <h2 className="package-title">PRESSURE</h2>
                <p className="package-price">Starting at $249</p>
                <div className="package-list">
                  <ul className="package-details">
                    <li>
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Agitate/wipe down doors, jambs, dash, console, and trims
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Vacuum seats, mats, floor, and trunk
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Clean all windows
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep clean/shampoo floor mats
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep cleaning - shampoo & condition seats
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      UV Protection & Interior Shine
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Agitate and clean seat belts
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep clean & remove stains from the floor
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep clean & remove stains from the headliner
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Aids in reducing car odor
                    </li>
                  </ul>
                </div>
                <button
                  className="package-button"
                  onClick={() =>
                    handlePackageClick({ name: "PRESSURE", price: 249 })
                  }
                >
                  Book
                </button>
              </div>
              <div
                className="package gold"
                // style={{
                //   backgroundImage: `url(${goldBackground})`,
                //   backgroundRepeat: "no-repeat",
                //   backgroundSize: "cover",
                //   backgroundPosition: "center",
                // }}
              >
                <h2 className="package-title">GOLD</h2>
                <p className="package-price">Starting at $149</p>
                <div className="package-list">
                  <ul
                    className="package-details"
                    style={{ marginInline: "20px" }}
                  >
                    <li>
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Agitate/wipe down doors, jambs, dash, console, and trims
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Vacuum seats, mats, floor, and trunk
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Clean all windows
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep clean/shampoo floor mats
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Deep cleaning - shampoo & condition seats
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      UV Protection & Interior Shine
                    </li>
                    <li>
                      {" "}
                      <img src={CheckIcon} alt="check" className="check-icon" />
                      Agitate and clean seat belts
                    </li>
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
                <button
                  className="package-button"
                  onClick={() =>
                    handlePackageClick({ name: "GOLD", price: 149 })
                  }
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        )}
      {/* STEP 4: Exterior Packages */}
      {activeStep === 4 &&
        (selectedService === "Exterior Only" ||
          selectedService === "Exterior and Interior") && (
          <div className="packages-container">
            <h1 className="packages-header">Exterior Detail</h1>
            <div className="packages-grid">
              <div className="package pressure">
                <h2 className="package-title">Paint Enhancement</h2>
                <div className="sub-package">
                  <p className="package-price">Starting at $399</p>
                  <div className="package-list">
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
                  </div>
                  <button
                    className="package-button"
                    onClick={() =>
                      handlePackageClick({
                        name: "Paint Enhancement",
                        price: 399,
                      })
                    }
                  >
                    Learn more
                  </button>
                </div>
              </div>
              <div className="package gold">
                <h2 className="package-title">Wash & Wax</h2>
                <p className="package-price">Starting at $149</p>
                <div className="package-list">
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
                </div>
                <button
                  className="package-button"
                  onClick={() =>
                    handlePackageClick({ name: "Wash & Wax", price: 149 })
                  }
                >
                  Book
                </button>
              </div>
              <div className="package standard">
                <h2 className="package-title">Standard Exterior</h2>
                <p className="package-price">Starting at $129</p>
                <div className="package-list">
                  <ul className="package-details">
                    <li>Foam pre-rinse & contact wash</li>
                    <li>Bug & tar removal</li>
                    <li>Full decontamination (clay / iron treatment)</li>
                    <li>Apply 3-month spray-wax protection</li>
                  </ul>

                  <div className="locked-options">
                    <h3 className="locked-header">Not Included</h3>
                    <ul className="package-details locked">
                      <li>🔒 6-month sealant upgrade</li>
                      <li>🔒 Swirl-mark reduction / paint correction</li>
                      <li>🔒 Water-spot / oxidation removal</li>
                      <li>🔒 Depth-&-gloss enhancement</li>
                    </ul>
                  </div>
                </div>
                <button
                  className="package-button"
                  onClick={() =>
                    handlePackageClick({
                      name: "Standard Exterior",
                      price: 129,
                    })
                  }
                >
                  Book
                </button>
              </div>
            </div>
          </div>
        )}
      {/* STEP 5: Date & Time */}
      {activeStep === 5 && (
        <div className="appointment-container">
          <div className="left-panel">
            <div className="header">
              <div className="icon">🤝</div>
              <h2>Make an appointment</h2>
              <p>Approx. 30 min</p>
            </div>
            <p>Select a date and an available time slot to finish booking.</p>
          </div>

          <div className="right-panel">
            <h3>Select a Date & Time</h3>

            {/* — Calendar — */}
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

            {/* — Time slots — */}
            <div className="time-slots">
              {timeSlots
                .filter((t) => isTimeAvailable(selectedDate, t))
                .map((t) => (
                  <button
                    key={t}
                    className={`time-slot ${
                      selectedTime === t ? "active" : ""
                    }`}
                    onClick={() => handleTimeSelect(t)}
                  >
                    {t}
                  </button>
                ))}
              {timeSlots.every((t) => !isTimeAvailable(selectedDate, t)) && (
                <div>No available times on this day</div>
              )}
            </div>
          </div>
        </div>
      )}
      <div
        className={`plus-services-panel ${showPlusServices ? "slide-up" : ""}`}
      >
        {showPlusServices && (
          <>
            <h2>{selectedPackage.name} Summary</h2>
            <p className="package-summary">
              Base Price: ${selectedPackage.price}
            </p>

            <h3>Add Plus Services</h3>
            <div className="plus-services-grid">
              {(plusServicesByPackage[selectedPackage.name] || []).map(
                (svc) => {
                  const isSelected = selectedPlusServices.includes(svc.name);
                  return (
                    <div
                      key={svc.name}
                      className={`plus-service-card ${
                        isSelected ? "selected" : ""
                      }`}
                      onClick={() => handleTogglePlusService(svc)}
                    >
                      <img
                        src={svc.image}
                        alt={svc.name}
                        className="svc-image"
                      />
                      <h4 className="svc-name">{svc.name}</h4>
                      <p className="svc-price">
                        ${typeof svc.price === "number" ? svc.price : svc.price}
                      </p>
                      {isSelected && <span className="check-overlay">✓</span>}
                    </div>
                  );
                }
              )}
            </div>
            <p className="package-summary">Total: ${totalPrice}</p>
            <div className="panel-buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  /* TODO: fire your booking API with selectedPackage, selectedPlusServices, etc. */
                  setShowPlusServices(false);
                }}
              >
                Confirm
              </button>
              <button
                className="close-panel"
                onClick={() => setShowPlusServices(false)}
              >
                Cancel
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default MonthlySub;
