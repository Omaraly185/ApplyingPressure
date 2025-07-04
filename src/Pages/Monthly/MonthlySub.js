import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
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
import carPricing from "../Book-Now/BookingForm/carPricing.json";

import { format, startOfMonth, addMonths, addDays } from "date-fns";

function MonthlySub() {
  const navigate = useNavigate();
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTime, setSelectedTime] = useState("");
  const [events, setEvents] = useState([]);
  const [excludedDynamicDates, setExcludedDynamicDates] = useState([]);
  const [currentMonth, setCurrentMonth] = useState(startOfMonth(new Date()));
  const [activeStep, setActiveStep] = useState(1);
  const [selectedService, setSelectedService] = useState("");
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [zip, setZip] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [selectedCar, setSelectedCar] = useState(null);

  const [selectedPackage, setSelectedPackage] = useState(null);
  const [showPlusServices, setShowPlusServices] = useState(false);
  const [selectedPlusServices, setSelectedPlusServices] = useState([]);
  const [confirmedInteriorPackage, setConfirmedInteriorPackage] =
    useState(null);
  const [confirmedExteriorPackage, setConfirmedExteriorPackage] =
    useState(null);
  const [confirmedInteriorPlusServices, setConfirmedInteriorPlusServices] =
    useState([]);
  const [confirmedExteriorPlusServices, setConfirmedExteriorPlusServices] =
    useState([]);

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

  const handlePackageClick = (pkg) => {
    setSelectedPackage(pkg);
    setShowPlusServices(true);
  };

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

  // Dynamic breadcrumbs based on selected service
  const getBreadcrumbs = () => {
    const baseBreadcrumbs = [
      { label: "Car Type", step: 1 },
      { label: "Service", step: 2 },
    ];

    if (selectedService === "Interior Only") {
      return [
        ...baseBreadcrumbs,
        { label: "Interior Package", step: 3 },
        { label: "Date & Time", step: 5 },
      ];
    } else if (selectedService === "Exterior Only") {
      return [
        ...baseBreadcrumbs,
        { label: "Exterior Package", step: 4 },
        { label: "Date & Time", step: 5 },
      ];
    } else if (selectedService === "Exterior and Interior") {
      return [
        ...baseBreadcrumbs,
        { label: "Interior Package", step: 3 },
        { label: "Exterior Package", step: 4 },
        { label: "Date & Time", step: 5 },
      ];
    } else {
      // Default breadcrumbs when no service is selected
      return [
        ...baseBreadcrumbs,
        { label: "Interior Package", step: 3 },
        { label: "Exterior Package", step: 4 },
        { label: "Date & Time", step: 5 },
      ];
    }
  };

  const breadcrumbs = getBreadcrumbs();

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
    if (selectedService === "Interior Only" && step === 4) {
      setActiveStep(2);
      return;
    } else if (selectedService === "Exterior Only" && step === 3) {
      setActiveStep(2);
      return;
    } else if (
      selectedService === "Exterior and Interior" &&
      step === 4 &&
      !confirmedInteriorPackage
    ) {
      // For both services: must complete interior before exterior, but allow navigation
      return;
    }

    setActiveStep(step);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  // Function to get car type key for pricing
  const getCarTypeKey = (carName) => {
    const carTypeMap = {
      Sedan: "sedan",
      "2 Row SUV": "twoRow",
      "3 Row/ Pickup truck": "threeRow",
      Van: "van",
    };
    return carTypeMap[carName] || "sedan";
  };

  // Function to get price range for a service
  const getPriceRange = (serviceType, serviceKey) => {
    if (!selectedCar) return { min: 0, max: 0 };

    const carKey = getCarTypeKey(selectedCar.name);
    const carData = carPricing[carKey];

    if (
      !carData ||
      !carData[serviceType] ||
      !carData[serviceType][serviceKey]
    ) {
      return { min: 0, max: 0 };
    }

    const pricing = carData[serviceType][serviceKey];
    return { min: pricing.minPrice, max: pricing.maxPrice };
  };

  const calculateAppointmentDuration = () => {
    let totalHours = 0;

    if (confirmedInteriorPackage) {
      switch (confirmedInteriorPackage.name) {
        case "PRESSURE":
          totalHours += 3;
          break;
        case "GOLD":
          totalHours += 2;
          break;
        default:
          totalHours += 1.5;
      }

      confirmedInteriorPlusServices.forEach((serviceName) => {
        switch (serviceName) {
          case "Dog Hair Removal":
          case "Heavy Spills/Odor Removal":
            totalHours += 0.5;
            break;
          case "Flooring":
          case "Headliner":
            totalHours += 0.5;
            break;
          default:
            totalHours += 0.25;
        }
      });
    }

    if (confirmedExteriorPackage) {
      switch (confirmedExteriorPackage.name) {
        case "Paint Enhancement":
          totalHours += 4;
          break;
        case "Wash & Wax":
          totalHours += 2;
          break;
        case "Standard Exterior":
          totalHours += 1.5;
          break;
        default:
          totalHours += 2;
      }

      confirmedExteriorPlusServices.forEach((serviceName) => {
        switch (serviceName) {
          case "Engine Bay Cleaning":
            totalHours += 0.5;
            break;
          case "Headlight Restoration":
            totalHours += 0.5;
            break;
          case "Ceramic Coating":
            totalHours += 1;
            break;
          default:
            totalHours += 0.25;
        }
      });
    }

    const hours = Math.floor(totalHours);
    const minutes = Math.round((totalHours - hours) * 60);

    if (hours === 0) {
      return `${minutes} min`;
    } else if (minutes === 0) {
      return `${hours} hr`;
    } else {
      return `${hours} hr ${minutes} min`;
    }
  };

  const calculateTotalPriceRange = () => {
    let minTotal = 0;
    let maxTotal = 0;

    if (confirmedInteriorPackage) {
      minTotal += confirmedInteriorPackage.price;
      maxTotal +=
        confirmedInteriorPackage.maxPrice || confirmedInteriorPackage.price;

      confirmedInteriorPlusServices.forEach((serviceName) => {
        const service = plusServicesByPackage[
          confirmedInteriorPackage.name
        ]?.find((s) => s.name === serviceName);
        if (service) {
          if (typeof service.price === "number") {
            minTotal += service.price;
            maxTotal += service.price;
          } else if (
            typeof service.price === "string" &&
            service.price.includes("-")
          ) {
            const [min, max] = service.price
              .split("-")
              .map((p) => parseFloat(p.trim()));
            minTotal += min || 0;
            maxTotal += max || min || 0;
          } else {
            const price = parseFloat(service.price) || 0;
            minTotal += price;
            maxTotal += price;
          }
        }
      });
    }

    if (confirmedExteriorPackage) {
      minTotal += confirmedExteriorPackage.price;
      maxTotal +=
        confirmedExteriorPackage.maxPrice || confirmedExteriorPackage.price;

      confirmedExteriorPlusServices.forEach((serviceName) => {
        const service = plusServicesByPackage[
          confirmedExteriorPackage.name
        ]?.find((s) => s.name === serviceName);
        if (service) {
          if (typeof service.price === "number") {
            minTotal += service.price;
            maxTotal += service.price;
          } else if (
            typeof service.price === "string" &&
            service.price.includes("-")
          ) {
            const [min, max] = service.price
              .split("-")
              .map((p) => parseFloat(p.trim()));
            minTotal += min || 0;
            maxTotal += max || min || 0;
          } else {
            const price = parseFloat(service.price) || 0;
            minTotal += price;
            maxTotal += price;
          }
        }
      });
    }

    return { min: minTotal, max: maxTotal };
  };

  const isTimeAvailable = (date, time) => {
    const dateTime = new Date(`${format(date, "yyyy-MM-dd")} ${time}`);
    const endTime = new Date(dateTime);

    // Calculate duration in hours based on confirmed packages
    let durationHours = 1; // default 1 hour
    if (confirmedInteriorPackage || confirmedExteriorPackage) {
      const durationStr = calculateAppointmentDuration();
      // Parse duration string to get hours
      const hourMatch = durationStr.match(/(\d+)\s*hr/);
      const minMatch = durationStr.match(/(\d+)\s*min/);

      let totalHours = 0;
      if (hourMatch) totalHours += parseInt(hourMatch[1]);
      if (minMatch) totalHours += parseInt(minMatch[1]) / 60;

      durationHours = Math.max(totalHours, 1); // minimum 1 hour
    }

    endTime.setHours(endTime.getHours() + Math.ceil(durationHours));

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
    <div className="monthly-sub-wrapper">
      {/* Invisible overlay for closing modal */}
      {showPlusServices && (
        <div
          className="modal-overlay"
          onClick={() => setShowPlusServices(false)}
        />
      )}

      <div
        className={`monthly-sub-container ${
          showPlusServices ? "blur-background" : ""
        }`}
      >
        <ToastContainer style={{ marginTop: "80px" }} />
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
                  onClick={() => {
                    setSelectedCar(ct);
                    setActiveStep(2);
                  }}
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
                  <img
                    src={svc.image}
                    alt={svc.name}
                    className="service-image"
                  />
                  <h2 className="service-name">{svc.name}</h2>
                </div>
              ))}
            </div>
          </div>
        )}
        {activeStep === 3 &&
          (selectedService === "Interior Only" ||
            selectedService === "Exterior and Interior") && (
            <div className="packages-container">
              <h1 className="packages-header">Interior Services</h1>
              <div className="packages-grid">
                <div className="package pressure">
                  <h2 className="package-title">PRESSURE</h2>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "interiors",
                            "pressureSpecial"
                          );
                          return `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $200"}
                  </p>
                  <div className="package-list">
                    <ul className="package-details">
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Agitate/wipe down doors, jambs, dash, console, and trims
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Vacuum seats, mats, floor, and trunk
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Clean all windows
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean/shampoo floor mats
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep cleaning - shampoo & condition seats
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        UV Protection & Interior Shine
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Agitate and clean seat belts
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean & remove stains from the floor
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean & remove stains from the headliner
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Aids in reducing car odor
                      </li>
                    </ul>
                  </div>
                  <button
                    className="package-button"
                    onClick={() => {
                      const priceRange = getPriceRange(
                        "interiors",
                        "pressureSpecial"
                      );
                      handlePackageClick({
                        name: "PRESSURE",
                        price: priceRange.min,
                        maxPrice: priceRange.max,
                      });
                    }}
                  >
                    Book
                  </button>
                </div>
                <div className="package gold">
                  <h2 className="package-title">GOLD</h2>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "interiors",
                            "goldInterior"
                          );
                          return `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $100"}
                  </p>
                  <div className="package-list">
                    <ul
                      className="package-details"
                      style={{ marginInline: "20px" }}
                    >
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Agitate/wipe down doors, jambs, dash, console, and trims
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Vacuum seats, mats, floor, and trunk
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Clean all windows
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean/shampoo floor mats
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep cleaning - shampoo & condition seats
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        UV Protection & Interior Shine
                      </li>
                      <li>
                        {" "}
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Agitate and clean seat belts
                      </li>
                    </ul>
                    <div className="locked-options">
                      <h3 className="locked-header">Not Included</h3>
                      <ul className="package-details locked">
                        <li>🔒 Deep clean & remove stains from the floor</li>
                        <li>
                          🔒 Deep clean & remove stains from the headliner
                        </li>
                        <li>🔒 Aids in reducing car odor</li>
                      </ul>
                    </div>
                  </div>
                  <button
                    className="package-button"
                    onClick={() => {
                      const priceRange = getPriceRange(
                        "interiors",
                        "goldInterior"
                      );
                      handlePackageClick({
                        name: "GOLD",
                        price: priceRange.min,
                        maxPrice: priceRange.max,
                      });
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}
        {activeStep === 4 &&
          (selectedService === "Exterior Only" ||
            (selectedService === "Exterior and Interior" &&
              confirmedInteriorPackage)) && (
            <div className="packages-container">
              <h1 className="packages-header">Exterior Detail</h1>
              <div className="packages-grid">
                <div className="package pressure">
                  <h2 className="package-title">Paint Enhancement</h2>
                  <div className="sub-package">
                    <p className="package-price">
                      {selectedCar
                        ? (() => {
                            const priceRange = getPriceRange(
                              "exteriors",
                              "oneStep"
                            );
                            return `$${priceRange.min} - $${priceRange.max}`;
                          })()
                        : "Starting at $400"}
                    </p>
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
                      onClick={() => {
                        const priceRange = getPriceRange(
                          "exteriors",
                          "oneStep"
                        );
                        handlePackageClick({
                          name: "Paint Enhancement",
                          price: priceRange.min,
                          maxPrice: priceRange.max,
                        });
                      }}
                    >
                      Learn more
                    </button>
                  </div>
                </div>
                <div className="package standard">
                  <h2 className="package-title">Wash & Wax</h2>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "exteriors",
                            "washWax"
                          );
                          return `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $125"}
                  </p>
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
                    onClick={() => {
                      const priceRange = getPriceRange("exteriors", "washWax");
                      handlePackageClick({
                        name: "Wash & Wax",
                        price: priceRange.min,
                        maxPrice: priceRange.max,
                      });
                    }}
                  >
                    Book
                  </button>
                </div>
                <div className="package standard">
                  <h2 className="package-title">Standard Exterior</h2>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "exteriors",
                            "standardExterior"
                          );
                          return `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $60"}
                  </p>
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
                    onClick={() => {
                      const priceRange = getPriceRange(
                        "exteriors",
                        "standardExterior"
                      );
                      handlePackageClick({
                        name: "Standard Exterior",
                        price: priceRange.min,
                        maxPrice: priceRange.max,
                      });
                    }}
                  >
                    Book
                  </button>
                </div>
              </div>
            </div>
          )}
        {activeStep === 5 && (
          <div className="appointment-container">
            <div className="left-panel">
              <div className="header">
                <div className="icon">🤝</div>
                <h2>Make an appointment</h2>
                <p>
                  Approx.{" "}
                  {confirmedInteriorPackage || confirmedExteriorPackage
                    ? calculateAppointmentDuration()
                    : "30 min"}
                </p>
                {(confirmedInteriorPackage || confirmedExteriorPackage) && (
                  <div className="total-price-display">
                    {(() => {
                      const priceRange = calculateTotalPriceRange();
                      return priceRange.min === priceRange.max ? (
                        <h3>Total Price: ${priceRange.min}</h3>
                      ) : (
                        <h3>
                          Total Price: ${priceRange.min} - ${priceRange.max}
                        </h3>
                      );
                    })()}
                  </div>
                )}
              </div>
              <form
                className="customer-form"
                onSubmit={(e) => {
                  e.preventDefault();
                }}
              >
                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input
                    id="address"
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="zip">Zip Code</label>
                  <input
                    id="zip"
                    type="text"
                    value={zip}
                    onChange={(e) => setZip(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="phone">Phone Number</label>
                  <input
                    id="phone"
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email">Email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
              </form>

              <p>Select a date and an available time slot to finish booking.</p>
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
                  excludeDates={[
                    ...staticExcludedDates,
                    ...excludedDynamicDates,
                  ]}
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
      </div>

      <div
        className={`plus-services-panel ${showPlusServices ? "slide-up" : ""}`}
      >
        {showPlusServices && (
          <>
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
            <p className="package-summary">
              {(() => {
                let minTotal = selectedPackage.price;
                let maxTotal =
                  selectedPackage.maxPrice || selectedPackage.price;

                selectedPlusServices.forEach((serviceName) => {
                  const service = currentPlusServices.find(
                    (s) => s.name === serviceName
                  );
                  if (service) {
                    if (typeof service.price === "number") {
                      minTotal += service.price;
                      maxTotal += service.price;
                    } else if (
                      typeof service.price === "string" &&
                      service.price.includes("-")
                    ) {
                      const [min, max] = service.price
                        .split("-")
                        .map((p) => parseFloat(p.trim()));
                      minTotal += min || 0;
                      maxTotal += max || min || 0;
                    } else {
                      const price = parseFloat(service.price) || 0;
                      minTotal += price;
                      maxTotal += price;
                    }
                  }
                });

                return minTotal === maxTotal
                  ? `Total: $${minTotal}`
                  : `Total: $${minTotal} - $${maxTotal}`;
              })()}
            </p>
            <div className="panel-buttons">
              <button
                className="confirm-button"
                onClick={() => {
                  const isInteriorPackage = ["PRESSURE", "GOLD"].includes(
                    selectedPackage.name
                  );

                  if (isInteriorPackage) {
                    setConfirmedInteriorPackage(selectedPackage);
                    setConfirmedInteriorPlusServices([...selectedPlusServices]);

                    if (selectedService === "Exterior and Interior") {
                      setActiveStep(4);
                    } else {
                      setActiveStep(5);
                    }
                  } else {
                    setConfirmedExteriorPackage(selectedPackage);
                    setConfirmedExteriorPlusServices([...selectedPlusServices]);

                    setActiveStep(5);
                  }

                  setShowPlusServices(false);
                  setSelectedPlusServices([]);
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
