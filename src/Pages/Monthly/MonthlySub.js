import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Header from "../../Component/Header";
import "./MonthlySub.scss";
import { SEOComponent, bookingPageSEO } from "../../Component/SEO";
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
import engineBayClean from "./engine-bay-clean.png";
import trimRestoration from "./trim-restoration.png";
import headlightRestoration from "./headlight-restoration.png";
import headliner from "./headliner.png";
import flooring from "./flooring.png";
import dogHair from "./dog-hair.png";
import odor from "./odor.png";
import carPricing from "../Book-Now/BookingForm/carPricing.json";
import {
  validateMonthlyFields,
  formatPhoneNumber,
  formatZipCode,
} from "./monthlyValidation";

import { startOfMonth, addMonths, addDays } from "date-fns";

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
  const [message, setMessage] = useState("");
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
  const [showPriceBreakdown, setShowPriceBreakdown] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [showPriceInfo, setShowPriceInfo] = useState(false);
  const [setPriceInfoPackage] = useState(null);

  const plusServicesByPackage = {
    GOLD: [
      { name: "Flooring", price: 50, image: flooring },
      { name: "Headliner", price: 50, image: headliner },
      { name: "Dog Hair Removal", price: "50-150", image: dogHair },
      {
        name: "Heavy Spills/Odor Removal",
        price: "50-150",
        image: odor,
      },
    ],
    SILVER: [
      { name: "Flooring", price: 50, image: flooring },
      { name: "Headliner", price: 50, image: headliner },
      { name: "Dog Hair Removal", price: "50-150", image: dogHair },
      {
        name: "Heavy Spills/Odor Removal",
        price: "50-150",
        image: odor,
      },
    ],
    PRESSURE: [
      { name: "Dog Hair Removal", price: "50-150", image: dogHair },
      {
        name: "Heavy Spills/Odor Removal",
        price: "50-150",
        image: odor,
      },
    ],
    Standard: [
      { name: "Ceramic Sealant", price: 40, image: Sedan },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
      { name: "Engine Bay Cleaning", price: 50, image: Sedan },
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
    ],
    "Wash & Wax": [
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
      { name: "Engine Bay Cleaning", price: 50, image: engineBayClean },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
    ],
    "Paint Enhancement": [
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
      { name: "Engine Bay Cleaning", price: 50, image: engineBayClean },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
      {
        name: "Ceramic Coating",
        price: "ceramic-coating-dynamic",
        image: ceramic,
      },
    ],
    "One Step Paint Correction": [
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
      { name: "Engine Bay Cleaning", price: 50, image: engineBayClean },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
      {
        name: "Ceramic Coating",
        price: "ceramic-coating-dynamic",
        image: ceramic,
      },
    ],
    "Two Step Paint Correction": [
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
      { name: "Engine Bay Cleaning", price: 50, image: engineBayClean },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
      {
        name: "Ceramic Coating",
        price: "ceramic-coating-dynamic",
        image: ceramic,
      },
    ],
    "Standard Exterior": [
      { name: "6-8 Month Sealant", price: 25, image: Sedan },
      {
        name: "Headlight Restoration",
        price: "40-80",
        image: headlightRestoration,
      },
      { name: "Engine Bay Cleaning", price: 50, image: engineBayClean },
      { name: "Trim Restoration", price: "75-150", image: trimRestoration },
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

  const getCarTypeKey = (carName) => {
    const carTypeMap = {
      "Sedan/Coupe": "sedan",
      "2 Row SUV": "twoRow",
      "3 Row/ Pickup truck": "threeRow",
      Van: "van",
    };
    return carTypeMap[carName] || "sedan";
  };

  const getCeramicCoatingPrice = () => {
    if (!selectedCar) return 350;
    const carTypeKey = getCarTypeKey(selectedCar.name);
    return carPricing[carTypeKey]?.services?.ceramicCoating?.minPrice || 350;
  };

  const currentPlusServices =
    plusServicesByPackage[selectedPackage?.name] || [];
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
    { name: "Sedan/Coupe", image: Sedan },
    { name: "2 Row SUV", image: SUV },
    { name: "3 Row/ Pickup truck", image: Mini },
    { name: "Van", image: Van },
  ];

  const services = [
    { name: "Exterior Only", image: exterior },
    { name: "Interior Only", image: interior },
    { name: "Exterior and Interior", image: exteriorInterior },
    { name: "Paint Correction", image: polish },
    { name: "Ceramic Coating", image: ceramic },
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
    } else if (selectedService === "Paint Correction") {
      return [
        ...baseBreadcrumbs,
        { label: "Paint Correction", step: 3 },
        { label: "Date & Time", step: 4 },
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
      const availableSlots = timeSlots.filter((slot) =>
        isTimeAvailable(date, slot)
      );

      if (availableSlots.length === 0) {
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
    if (serviceName === "Ceramic Coating") {
      // Route to ceramic coating page
      navigate("/ceramic-coating");
      return;
    }

    setSelectedService(serviceName);
    if (serviceName === "Exterior Only") {
      setActiveStep(4);
    } else if (serviceName === "Paint Correction") {
      setActiveStep(3);
    } else {
      setActiveStep(3);
    }
  };

  const handleStepChange = (step) => {
    if (step >= activeStep) {
      return; // Prevent forward navigation
    }

    if (step < activeStep) {
      if (step <= 1) {
        setSelectedCar(null);
        setSelectedService("");
        setConfirmedInteriorPackage(null);
        setConfirmedExteriorPackage(null);
        setConfirmedInteriorPlusServices([]);
        setConfirmedExteriorPlusServices([]);
        setSelectedDate(null);
        setSelectedTime("");
        setName("");
        setAddress("");
        setZip("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else if (step <= 2) {
        // Going back to service selection - clear packages and form data
        setSelectedService("");
        setConfirmedInteriorPackage(null);
        setConfirmedExteriorPackage(null);
        setConfirmedInteriorPlusServices([]);
        setConfirmedExteriorPlusServices([]);
        setSelectedDate(null);
        setSelectedTime("");
        setName("");
        setAddress("");
        setZip("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else if (step <= 3) {
        // Going back to interior packages - clear interior confirmation, exterior and form data
        setConfirmedInteriorPackage(null);
        setConfirmedInteriorPlusServices([]);
        setConfirmedExteriorPackage(null);
        setConfirmedExteriorPlusServices([]);
        setSelectedDate(null);
        setSelectedTime("");
        setName("");
        setAddress("");
        setZip("");
        setPhone("");
        setEmail("");
        setMessage("");
      } else if (step <= 4) {
        // Going back to exterior packages - clear form data only
        setSelectedDate(null);
        setSelectedTime("");
        setName("");
        setAddress("");
        setZip("");
        setPhone("");
        setEmail("");
        setMessage("");
      }
    }

    setActiveStep(step);
  };

  const handleTimeSelect = (time) => {
    setSelectedTime(time);
  };

  const handlePhoneChange = (e) => {
    const formattedPhone = formatPhoneNumber(e.target.value);
    setPhone(formattedPhone);
  };

  const handleZipChange = (e) => {
    const formattedZip = formatZipCode(e.target.value);
    setZip(formattedZip);
  };

  const submitMonthlyBooking = async () => {
    setIsLoading(true);
    try {
      // Get appointment duration from existing function and parse to hours
      const durationString = calculateAppointmentDuration();
      const appointmentDurationHours = (() => {
        const hourMatch = durationString.match(/(\d+)\s*hr/);
        const minMatch = durationString.match(/(\d+)\s*min/);

        let totalHours = 0;
        if (hourMatch) totalHours += parseInt(hourMatch[1]);
        if (minMatch) totalHours += parseInt(minMatch[1]) / 60;

        return Math.max(totalHours, 1); // Minimum 1 hour
      })();

      const selectedDateString = selectedDate.toLocaleDateString("en-US", {
        month: "long",
        day: "numeric",
        year: "numeric",
      });

      const selectedDateTimeString = `${selectedDateString} ${selectedTime}`;
      const selectedDateTime = new Date(selectedDateTimeString);
      const endDateTime = new Date(selectedDateTime.getTime());
      const endTime = endDateTime.setHours(
        selectedDateTime.getHours() + appointmentDurationHours
      );

      const interiorPackageName = confirmedInteriorPackage
        ? confirmedInteriorPackage.name
        : "";
      const exteriorPackageName = confirmedExteriorPackage
        ? confirmedExteriorPackage.name
        : "";
      const interiorPlusServices = confirmedInteriorPlusServices.join(", ");
      const exteriorPlusServices = confirmedExteriorPlusServices.join(", ");
      const allPlusServices = [
        ...confirmedInteriorPlusServices,
        ...confirmedExteriorPlusServices,
      ].join(", ");

      // Calculate price range
      const priceRange = calculateTotalPriceRange();

      // Create the booking object similar to sidepanel.js
      const newEvent = {
        email,
        name,
        phoneNumber: phone,
        ExteriorPackage: exteriorPackageName,
        interiorPackage: interiorPackageName,
        plusService: allPlusServices,
        selectedDate: selectedDateString,
        selectedTime,
        endTime,
        dogHair: "",
        message: message || "",
        description: `APL: Detail \n\n ${name} ${phone},\n\n ${selectedCar?.name},\n ${exteriorPackageName} ${interiorPackageName} $ ${allPlusServices}\n\n Service: ${selectedService}\n\n ${priceRange.min}-${priceRange.max},\n\nAddress: ${address}, ${zip}\n\nMonthly Subscription Booking`,
        location: `${address}, ${zip}`,
      };

      const response = await fetch(
        "https://applyingpressure-api-production.up.railway.app/events",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(newEvent),
        }
      );

      if (response.ok) {
        toast.success("Appointment booked successfully!");
        setTimeout(() => {
          navigate("/");
        }, 2000);
      } else {
        toast.error("Failed to book monthly subscription. Please try again.");
        console.error("Failed to create monthly subscription");
      }
    } catch (error) {
      toast.error("Error booking monthly subscription. Please try again.");
      console.error("Error creating monthly subscription:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateMonthlyFields(
      name,
      address,
      zip,
      phone,
      email,
      selectedDate,
      selectedTime,
      confirmedInteriorPackage,
      confirmedExteriorPackage
    );

    if (isValid) {
      // Create booking request
      await submitMonthlyBooking();
    }
  };

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

    // Base time for exterior packages
    if (confirmedExteriorPackage) {
      switch (confirmedExteriorPackage.name) {
        case "Paint Enhancement":
          totalHours += 4;
          break;
        case "Wash & Wax":
          totalHours += 2;
          break;
        case "Standard Exterior":
          totalHours += 1.5; // 1.5 hours for standard
          break;
        default:
          totalHours += 2; // default exterior time
      }

      // Add time for exterior plus services
      confirmedExteriorPlusServices.forEach((serviceName) => {
        switch (serviceName) {
          case "Engine Bay Cleaning":
            totalHours += 0.5; // 30 minutes
            break;
          case "Headlight Restoration":
            totalHours += 0.5; // 30 minutes
            break;
          case "Ceramic Coating":
            totalHours += 2; // 1 hour
            break;
          default:
            totalHours += 0.25; // 15 minutes for other services
        }
      });
    }

    // Convert to hours and minutes
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

  // Function to calculate total confirmed price range
  const calculateTotalPriceRange = () => {
    let minTotal = 0;
    let maxTotal = 0;

    // Add interior package price
    if (confirmedInteriorPackage) {
      minTotal += confirmedInteriorPackage.price;
      maxTotal +=
        confirmedInteriorPackage.maxPrice || confirmedInteriorPackage.price;

      // Add interior plus services
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
            // Handle range prices like "50-150"
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

    // Add exterior package price
    if (confirmedExteriorPackage) {
      minTotal += confirmedExteriorPackage.price;
      maxTotal +=
        confirmedExteriorPackage.maxPrice || confirmedExteriorPackage.price;

      // Add exterior plus services
      confirmedExteriorPlusServices.forEach((serviceName) => {
        const service = plusServicesByPackage[
          confirmedExteriorPackage.name
        ]?.find((s) => s.name === serviceName);
        if (service) {
          if (service.price === "ceramic-coating-dynamic") {
            // Handle dynamic ceramic coating pricing
            const ceramicPrice = getCeramicCoatingPrice();
            minTotal += ceramicPrice;
            maxTotal += ceramicPrice;
          } else if (typeof service.price === "number") {
            minTotal += service.price;
            maxTotal += service.price;
          } else if (
            typeof service.price === "string" &&
            service.price.includes("-")
          ) {
            // Handle range prices like "50-150"
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
    // Check if date is valid before formatting
    if (!date || !(date instanceof Date) || isNaN(date.getTime())) {
      return false;
    }

    // Safari-compatible date parsing
    const parseTimeToDateTime = (date, timeString) => {
      try {
        // Parse time string (e.g., "9:00 AM" or "2:00 PM")
        const timeMatch = timeString.match(/^(\d{1,2}):(\d{2})\s*(AM|PM)$/i);
        if (!timeMatch) {
          console.error("Invalid time format:", timeString);
          return null;
        }

        let hours = parseInt(timeMatch[1]);
        const minutes = parseInt(timeMatch[2]);
        const period = timeMatch[3].toUpperCase();

        // Convert to 24-hour format
        if (period === "PM" && hours !== 12) {
          hours += 12;
        } else if (period === "AM" && hours === 12) {
          hours = 0;
        }

        // Create new date object with explicit values (Safari-compatible)
        const dateTime = new Date(date);
        dateTime.setHours(hours, minutes, 0, 0);

        return dateTime;
      } catch (error) {
        console.error("Error parsing date/time:", error, { date, timeString });
        return null;
      }
    };

    const dateTime = parseTimeToDateTime(date, time);
    if (!dateTime || isNaN(dateTime.getTime())) {
      console.error("Failed to parse dateTime for availability check:", {
        date,
        time,
      });
      return false;
    }

    const endTime = new Date(dateTime);

    let durationHours = 1;
    if (confirmedInteriorPackage || confirmedExteriorPackage) {
      const durationStr = calculateAppointmentDuration();
      const hourMatch = durationStr.match(/(\d+)\s*hr/);
      const minMatch = durationStr.match(/(\d+)\s*min/);

      let totalHours = 0;
      if (hourMatch) totalHours += parseInt(hourMatch[1]);
      if (minMatch) totalHours += parseInt(minMatch[1]) / 60;

      durationHours = Math.max(totalHours, 1);
    }

    endTime.setHours(endTime.getHours() + Math.ceil(durationHours));

    const isAvailable = !events.some((evt) => {
      try {
        const start = new Date(evt.start);
        const end = new Date(evt.end);

        // Additional validation for event dates
        if (isNaN(start.getTime()) || isNaN(end.getTime())) {
          console.warn("Invalid event dates:", evt);
          return false;
        }

        return (
          (dateTime >= start && dateTime < end) ||
          (endTime > start && endTime <= end) ||
          (dateTime < start && endTime > end)
        );
      } catch (error) {
        console.error("Error checking event overlap:", error, evt);
        return false;
      }
    });

    return isAvailable;
  };

  return (
    <>
      <SEOComponent {...bookingPageSEO} />
      <div className="monthly-sub-container">
        <Header />
        <ToastContainer style={{ marginTop: "80px" }} />

        <div className={`main-content ${showPlusServices ? "blurred" : ""}`}>
          {/* Breadcrumbs (desktop) */}
          <nav className="breadcrumb large-screen-only">
            <ul>
              {breadcrumbs.map((bc) => {
                const isCurrent = activeStep === bc.step;
                const isCompleted = activeStep > bc.step;
                const isNext = activeStep + 1 === bc.step;
                const isClickable = bc.step < activeStep; // Only previous steps are clickable

                return (
                  <li
                    key={bc.step}
                    className={`${isCurrent ? "current" : ""} ${
                      isCompleted ? "completed" : ""
                    } ${isNext ? "next" : ""} ${
                      !isClickable && !isCurrent ? "disabled" : ""
                    }`}
                    onClick={() =>
                      isClickable ? handleStepChange(bc.step) : null
                    }
                    style={{ cursor: isClickable ? "pointer" : "default" }}
                  >
                    <span>{bc.label}</span>
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
                onClick={() => {
                  // Find the actual previous step that exists in breadcrumbs
                  const sortedBreadcrumbs = breadcrumbs.sort(
                    (a, b) => a.step - b.step
                  );
                  const currentIndex = sortedBreadcrumbs.findIndex(
                    (bc) => bc.step === activeStep
                  );
                  const previousStep =
                    currentIndex > 0
                      ? sortedBreadcrumbs[currentIndex - 1].step
                      : activeStep - 1;
                  handleStepChange(previousStep);
                }}
              >
                {(() => {
                  // Find the actual previous step label
                  const sortedBreadcrumbs = breadcrumbs.sort(
                    (a, b) => a.step - b.step
                  );
                  const currentIndex = sortedBreadcrumbs.findIndex(
                    (bc) => bc.step === activeStep
                  );
                  const previousBreadcrumb =
                    currentIndex > 0
                      ? sortedBreadcrumbs[currentIndex - 1]
                      : null;
                  return previousBreadcrumb
                    ? `← ${previousBreadcrumb.label}`
                    : "← Back";
                })()}
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
                    <img
                      src={ct.image}
                      alt={ct.name}
                      className="service-image"
                    />
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
          {/* STEP 3: Interior Packages */}
          {activeStep === 3 &&
            (selectedService === "Interior Only" ||
              selectedService === "Exterior and Interior") && (
              <div className="packages-container">
                <h1 className="packages-header">Interior Services</h1>
                <div className="packages-grid">
                  {/* Silver package - only show for "Exterior and Interior" */}
                  {selectedService === "Exterior and Interior" && (
                    <div className="package silver">
                      <h2 className="package-title">SILVER</h2>
                      <div className="package-price-container">
                        <p className="package-price">
                          {selectedCar
                            ? (() => {
                                const priceRange = getPriceRange(
                                  "interiors",
                                  "silverInterior"
                                );
                                return priceRange.min === priceRange.max
                                  ? `$${priceRange.min}`
                                  : `$${priceRange.min} - $${priceRange.max}`;
                              })()
                            : "Starting at $55"}
                        </p>
                        {selectedCar &&
                          (() => {
                            const priceRange = getPriceRange(
                              "interiors",
                              "silverInterior"
                            );
                            return priceRange.min !== priceRange.max;
                          })() && (
                            <button
                              className="price-info-icon"
                              onClick={() => {
                                setShowPriceInfo(true);
                                setPriceInfoPackage("SILVER");
                              }}
                            >
                              ℹ️
                            </button>
                          )}
                      </div>
                      <div className="package-list">
                        <ul className="package-details">
                          <li>
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Agitate/wipe down doors, jambs, dash, console, and
                            trims
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
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Deep clean/shampoo floor mats
                          </li>
                        </ul>

                        <div className="locked-options">
                          <h3 className="locked-header">Not Included</h3>
                          <ul className="package-details locked">
                            <li>
                              🔒 Deep cleaning - shampoo & condition seats
                            </li>
                            <li>🔒 UV Protection & Interior Shine</li>
                            <li>🔒 Agitate and clean seat belts</li>
                            <li>
                              🔒 Deep clean & remove stains from the floor
                            </li>
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
                            "silverInterior"
                          );
                          handlePackageClick({
                            name: "SILVER",
                            price: priceRange.min,
                            maxPrice: priceRange.max,
                          });
                        }}
                      >
                        Book
                      </button>
                    </div>
                  )}

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
                    <div className="package-price-container">
                      <p className="package-price">
                        {selectedCar
                          ? (() => {
                              const priceRange = getPriceRange(
                                "interiors",
                                "goldInterior"
                              );
                              return priceRange.min === priceRange.max
                                ? `$${priceRange.min}`
                                : `$${priceRange.min} - $${priceRange.max}`;
                            })()
                          : "Starting at $100"}
                      </p>
                      {selectedCar &&
                        (() => {
                          const priceRange = getPriceRange(
                            "interiors",
                            "goldInterior"
                          );
                          return priceRange.min !== priceRange.max;
                        })() && (
                          <button
                            className="price-info-icon"
                            onClick={() => {
                              setShowPriceInfo(true);
                              setPriceInfoPackage("GOLD");
                            }}
                          >
                            ℹ️
                          </button>
                        )}
                    </div>
                    <div className="package-list">
                      <ul className="package-details">
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Agitate/wipe down doors, jambs, dash, console, and
                          trims
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

                  <div className="package pressure">
                    <h2 className="package-title">PRESSURE</h2>
                    <div className="package-price-container">
                      <p className="package-price">
                        {selectedCar
                          ? (() => {
                              const priceRange = getPriceRange(
                                "interiors",
                                "pressureSpecial"
                              );
                              return priceRange.min === priceRange.max
                                ? `$${priceRange.min}`
                                : `$${priceRange.min} - $${priceRange.max}`;
                            })()
                          : "Starting at $200"}
                      </p>
                      {selectedCar &&
                        (() => {
                          const priceRange = getPriceRange(
                            "interiors",
                            "pressureSpecial"
                          );
                          return priceRange.min !== priceRange.max;
                        })() && (
                          <button
                            className="price-info-icon"
                            onClick={() => {
                              setShowPriceInfo(true);
                              setPriceInfoPackage("PRESSURE");
                            }}
                          >
                            ℹ️
                          </button>
                        )}
                    </div>
                    <div className="package-list">
                      <ul className="package-details">
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Agitate/wipe down doors, jambs, dash, console, and
                          trims
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Vacuum seats, mats, floor, and trunk
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Clean all windows
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep clean/shampoo floor mats
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep cleaning - shampoo & condition seats
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          UV Protection & Interior Shine
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Agitate and clean seat belts
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep clean & remove stains from the floor
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep clean & remove stains from the headliner
                        </li>
                        <li>
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
                </div>
              </div>
            )}

          {/* Price Info Tooltip */}
          {showPriceInfo && (
            <div
              className="price-info-tooltip"
              onClick={() => setShowPriceInfo(false)}
            >
              <div
                className="price-info-content"
                onClick={(e) => e.stopPropagation()}
              >
                <h4>Why is there a price range?</h4>
                <p>
                  Interior pricing varies based on the current condition of your
                  vehicle's interior. Factors like stains, wear, pet hair, and
                  overall cleanliness affect the time and effort required for
                  the service.
                </p>
                <ul>
                  <li>
                    <strong>Lower range:</strong> Well-maintained interiors
                  </li>
                  <li>
                    <strong>Higher range:</strong> Heavily soiled or stained
                    interiors
                  </li>
                </ul>
                <button
                  className="close-info-btn"
                  onClick={() => setShowPriceInfo(false)}
                >
                  ✕
                </button>
              </div>
            </div>
          )}

          {/* STEP 4: Exterior Packages */}
          {activeStep === 4 &&
            (selectedService === "Exterior Only" ||
              (selectedService === "Exterior and Interior" &&
                confirmedInteriorPackage)) && (
              <div className="packages-container">
                <h1 className="packages-header">Exterior Detail</h1>
                <div className="packages-grid">
                  {/* Standard Exterior package - only show for "Exterior and Interior" */}
                  {selectedService === "Exterior and Interior" && (
                    <div className="package standard">
                      <h2 className="package-title">Standard Exterior</h2>
                      <p className="package-price">
                        {selectedCar
                          ? (() => {
                              const priceRange = getPriceRange(
                                "exteriors",
                                "standardExterior"
                              );
                              return priceRange.min === priceRange.max
                                ? `$${priceRange.min}`
                                : `$${priceRange.min} - $${priceRange.max}`;
                            })()
                          : "Starting at $60"}
                      </p>
                      <div className="package-list">
                        <ul className="package-details">
                          <li>
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Foam pre-rinse & contact wash
                          </li>

                          <li>
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Deep clean wheels and shine tires
                          </li>
                          <li>
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Pressure rinse all door jambs
                          </li>
                          <li>
                            <img
                              src={CheckIcon}
                              alt="check"
                              className="check-icon"
                            />
                            Apply spray-wax protection
                          </li>
                        </ul>

                        <div className="locked-options">
                          <h3 className="locked-header">Not Included</h3>
                          <ul className="package-details locked">
                            <li>🔒 Shine all exterior trims</li>
                            <li>🔒 Agitate and declog door jambs</li>
                            <li>
                              🔒 Full decontamination (clay/iron treatment)
                            </li>
                            <li>🔒 Bug and tar removal</li>
                            <li>🔒 6-8 month sealant upgrade</li>
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
                  )}

                  <div className="package gold">
                    <h2 className="package-title">Wash & Wax</h2>
                    <p className="package-price">
                      {selectedCar
                        ? (() => {
                            const priceRange = getPriceRange(
                              "exteriors",
                              "washWax"
                            );
                            return priceRange.min === priceRange.max
                              ? `$${priceRange.min}`
                              : `$${priceRange.min} - $${priceRange.max}`;
                          })()
                        : "Starting at $125"}
                    </p>
                    <div className="package-list">
                      <ul className="package-details">
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Foam pre-rinse and bath
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep clean wheels and shine tires
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Agitate and declog door jambs
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Bug and tar removal
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Full decontamination (clay/iron treatment)
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Shine all exterior trims
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Apply 6 to 8 months protection
                        </li>
                      </ul>
                      <div className="locked-options">
                        <h3 className="locked-header">Not Included</h3>
                        <ul className="package-details locked">
                          <li>🔒 Reduce minor swirls and imperfections</li>
                          <li>
                            🔒 Boost depth and clarity of paint for showroom
                            shine
                          </li>
                          <li>🔒 Eliminate water spots and oxidation</li>
                        </ul>
                      </div>
                    </div>
                    <button
                      className="package-button"
                      onClick={() => {
                        const priceRange = getPriceRange(
                          "exteriors",
                          "washWax"
                        );
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
                  <div className="package pressure">
                    <h2 className="package-title">Paint Enhancement</h2>
                    <p className="package-price">
                      {selectedCar
                        ? (() => {
                            const priceRange = getPriceRange(
                              "exteriors",
                              "paintEnhancement"
                            );
                            return priceRange.min === priceRange.max
                              ? `$${priceRange.min}`
                              : `$${priceRange.min} - $${priceRange.max}`;
                          })()
                        : "Starting at $300"}
                    </p>
                    <div className="package-list">
                      <ul className="package-details">
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Foam pre-rinse and bath
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Deep clean wheels and shine tires
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Agitate and declog door jambs
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Bug and tar removal
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Full decontamination (clay/iron treatment)
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Shine all exterior surfaces
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Apply 6-months protection
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Reduce minor swirls and surface imperfections
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Boost depth and clarity for showroom shine
                        </li>
                        <li>
                          <img
                            src={CheckIcon}
                            alt="check"
                            className="check-icon"
                          />
                          Eliminate water spots and surface oxidation
                        </li>
                      </ul>
                    </div>
                    <button
                      className="package-button"
                      onClick={() => {
                        const priceRange = getPriceRange(
                          "exteriors",
                          "paintEnhancement"
                        );
                        handlePackageClick({
                          name: "Paint Enhancement",
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

          {/* STEP 3: Paint Correction Packages */}
          {activeStep === 3 && selectedService === "Paint Correction" && (
            <div className="packages-container">
              <h1 className="packages-header">Paint Correction Services</h1>
              <div className="packages-grid">
                {/* ONE STEP */}
                <div className="package silver">
                  <h2 className="package-title">ONE STEP</h2>
                  <p className="package-subtitle">
                    50-70% Swirl & Scratch Removal
                  </p>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "exteriors",
                            "oneStep"
                          );
                          return priceRange.min === priceRange.max
                            ? `$${priceRange.min}`
                            : `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $400"}
                  </p>
                  <div className="package-list">
                    <ul className="package-details">
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Foam pre-rinse & contact wash
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean wheels and shine tires
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Power wash all door jambs
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Apply 6-8 month sealant protection
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Single-stage paint correction process
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Remove 50-70% of swirls & scratches
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Water spot and oxidation removal
                      </li>
                    </ul>
                  </div>
                  <button
                    className="package-button"
                    onClick={() => {
                      const priceRange = getPriceRange("exteriors", "oneStep");
                      handlePackageClick({
                        name: "One Step Paint Correction",
                        price: priceRange.min,
                        maxPrice: priceRange.max,
                      });
                    }}
                  >
                    Book
                  </button>
                </div>

                {/* TWO STEP */}
                <div className="package gold">
                  <h2 className="package-title">TWO STEP</h2>
                  <p className="package-subtitle">
                    80-90% Swirl & Scratch Removal
                  </p>
                  <p className="package-price">
                    {selectedCar
                      ? (() => {
                          const priceRange = getPriceRange(
                            "exteriors",
                            "twoStep"
                          );
                          return priceRange.min === priceRange.max
                            ? `$${priceRange.min}`
                            : `$${priceRange.min} - $${priceRange.max}`;
                        })()
                      : "Starting at $600"}
                  </p>
                  <div className="package-list">
                    <ul className="package-details">
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Foam pre-rinse & contact wash
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Deep clean wheels and shine tires
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Power wash all door jambs
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Apply 6-8 month sealant protection
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Two-stage paint correction process
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Remove 80-90% of swirls & scratches
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Enhanced paint depth & clarity
                      </li>
                      <li>
                        <img
                          src={CheckIcon}
                          alt="check"
                          className="check-icon"
                        />
                        Water spot and oxidation removal
                      </li>
                    </ul>
                  </div>
                  <button
                    className="package-button"
                    onClick={() => {
                      const priceRange = getPriceRange("exteriors", "twoStep");
                      handlePackageClick({
                        name: "Two Step Paint Correction",
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

          {(activeStep === 5 ||
            (activeStep === 4 && selectedService === "Paint Correction")) && (
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

                      {/* Collapsible Price Breakdown */}
                      <div className="price-breakdown-container">
                        <button
                          className="price-breakdown-toggle"
                          onClick={() =>
                            setShowPriceBreakdown(!showPriceBreakdown)
                          }
                          type="button"
                        >
                          <span>
                            {showPriceBreakdown ? "Hide" : "Show"} Price
                            Breakdown
                          </span>
                          <span
                            className={`breakdown-arrow ${
                              showPriceBreakdown ? "up" : "down"
                            }`}
                          >
                            {showPriceBreakdown ? "▲" : "▼"}
                          </span>
                        </button>

                        {showPriceBreakdown && (
                          <div className="price-breakdown-details">
                            <div className="breakdown-section">
                              <h4>Selected Services:</h4>

                              {confirmedInteriorPackage && (
                                <div className="service-item">
                                  <span className="service-name">
                                    Interior: {confirmedInteriorPackage.name}
                                  </span>
                                  <span className="service-price">
                                    ${confirmedInteriorPackage.price}
                                    {confirmedInteriorPackage.maxPrice &&
                                      confirmedInteriorPackage.maxPrice !==
                                        confirmedInteriorPackage.price &&
                                      ` - $${confirmedInteriorPackage.maxPrice}`}
                                  </span>
                                </div>
                              )}

                              {confirmedExteriorPackage && (
                                <div className="service-item">
                                  <span className="service-name">
                                    Exterior: {confirmedExteriorPackage.name}
                                  </span>
                                  <span className="service-price">
                                    ${confirmedExteriorPackage.price}
                                    {confirmedExteriorPackage.maxPrice &&
                                      confirmedExteriorPackage.maxPrice !==
                                        confirmedExteriorPackage.price &&
                                      ` - $${confirmedExteriorPackage.maxPrice}`}
                                  </span>
                                </div>
                              )}

                              {(confirmedInteriorPlusServices.length > 0 ||
                                confirmedExteriorPlusServices.length > 0) && (
                                <div className="plus-services-section">
                                  <h5>Plus Services:</h5>

                                  {confirmedInteriorPlusServices.map(
                                    (serviceName) => {
                                      const service = plusServicesByPackage[
                                        confirmedInteriorPackage?.name
                                      ]?.find((s) => s.name === serviceName);
                                      return service ? (
                                        <div
                                          key={serviceName}
                                          className="service-item plus-service"
                                        >
                                          <span className="service-name">
                                            {serviceName}
                                          </span>
                                          <span className="service-price">
                                            $
                                            {typeof service.price === "number"
                                              ? service.price
                                              : service.price}
                                          </span>
                                        </div>
                                      ) : null;
                                    }
                                  )}

                                  {confirmedExteriorPlusServices.map(
                                    (serviceName) => {
                                      const service = plusServicesByPackage[
                                        confirmedExteriorPackage?.name
                                      ]?.find((s) => s.name === serviceName);
                                      return service ? (
                                        <div
                                          key={serviceName}
                                          className="service-item plus-service"
                                        >
                                          <span className="service-name">
                                            {serviceName}
                                          </span>
                                          <span className="service-price">
                                            $
                                            {service.price ===
                                            "ceramic-coating-dynamic"
                                              ? getCeramicCoatingPrice()
                                              : typeof service.price ===
                                                "number"
                                              ? service.price
                                              : service.price}
                                          </span>
                                        </div>
                                      ) : null;
                                    }
                                  )}
                                </div>
                              )}

                              <div className="breakdown-total">
                                <div className="service-item total">
                                  <span className="service-name">Total:</span>
                                  <span className="service-price">
                                    {(() => {
                                      const priceRange =
                                        calculateTotalPriceRange();
                                      return priceRange.min === priceRange.max
                                        ? `$${priceRange.min}`
                                        : `$${priceRange.min} - $${priceRange.max}`;
                                    })()}
                                  </span>
                                </div>
                              </div>
                            </div>
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>
                {/* — Your Info Form — */}
                <form className="customer-form" onSubmit={handleFormSubmit}>
                  <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input
                      id="name"
                      type="text"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Enter your full name"
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
                      placeholder="Enter your street address"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="zip">Zip Code</label>
                    <input
                      id="zip"
                      type="text"
                      value={zip}
                      onChange={handleZipChange}
                      placeholder="12345 or 12345-6789"
                      maxLength="10"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="phone">Phone Number</label>
                    <input
                      id="phone"
                      type="tel"
                      value={phone}
                      onChange={handlePhoneChange}
                      placeholder="(123) 456-7890"
                      maxLength="14"
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
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="form-group">
                    <label htmlFor="message">Message (Optional)</label>
                    <textarea
                      id="message"
                      className="message-textarea"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder="Any special requests or notes..."
                      style={{
                        width: "100%",
                        padding: "12px",
                        border: "1px solid #ddd",
                        borderRadius: "4px",
                        fontSize: "16px",
                        fontFamily: "inherit",
                        backgroundColor: "rgba(0, 0, 0, 0.2)",
                        color: "white",
                        outline: "none",
                        transition: "border-color 0.3s ease",
                        resize: "none",
                        minHeight: "80px",
                        lineHeight: "1.4",
                      }}
                      onFocus={(e) => (e.target.style.borderColor = "#007bff")}
                      onBlur={(e) => (e.target.style.borderColor = "#ddd")}
                    />
                  </div>
                </form>

                <p>
                  Select a date and an available time slot to finish booking.
                </p>
                <div className="form-requirements">
                  <p
                    style={{
                      fontSize: "12px",
                      color: "rgba(255, 255, 255, 0.7)",
                      marginTop: "15px",
                    }}
                  >
                    * All fields are required. Please ensure your contact
                    information is accurate for appointment confirmation.
                  </p>
                </div>
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
                      selectedDate &&
                      date.getDate() === selectedDate.getDate() &&
                      date.getMonth() === selectedDate.getMonth()
                        ? "selected-date"
                        : undefined
                    }
                  />
                </div>

                {/* — Time slots — */}
                <div className="time-slots">
                  {selectedDate ? (
                    (() => {
                      const availableSlots = timeSlots.filter((t) =>
                        isTimeAvailable(selectedDate, t)
                      );

                      return availableSlots.length > 0 ? (
                        availableSlots.map((t) => (
                          <button
                            key={t}
                            className={`time-slot ${
                              selectedTime === t ? "selected" : ""
                            }`}
                            onClick={() => handleTimeSelect(t)}
                          >
                            {t}
                          </button>
                        ))
                      ) : (
                        <div>No available times on this day</div>
                      );
                    })()
                  ) : (
                    <div>Please select a date to see available times</div>
                  )}
                </div>

                {/* Book Monthly Subscription Button */}
                <div className="booking-button-container">
                  <button
                    type="button"
                    className="submit-booking-btn"
                    disabled={isLoading}
                    onClick={(e) => {
                      if (isLoading) return;

                      if (!selectedDate || !selectedTime) {
                        if (!selectedDate) {
                          toast.error("Please select a date first");
                        } else if (!selectedTime) {
                          toast.error("Please select a time slot");
                        }
                        return;
                      }
                      // Create a fake event object for handleFormSubmit
                      const fakeEvent = { preventDefault: () => {} };
                      handleFormSubmit(fakeEvent);
                    }}
                  >
                    {isLoading ? (
                      <>
                        <div className="loading-spinner"></div>
                        Processing...
                      </>
                    ) : (
                      "Schedule Appointment"
                    )}
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Plus Services Modal Backdrop */}
        {showPlusServices && (
          <div
            className="plus-services-backdrop"
            onClick={() => setShowPlusServices(false)}
          />
        )}

        <div
          className={`plus-services-panel ${
            showPlusServices ? "slide-up" : ""
          }`}
          onClick={(e) => e.stopPropagation()}
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
                          $
                          {svc.price === "ceramic-coating-dynamic"
                            ? getCeramicCoatingPrice()
                            : typeof svc.price === "number"
                            ? svc.price
                            : svc.price}
                        </p>
                        {isSelected && <span className="check-overlay">✓</span>}
                      </div>
                    );
                  }
                )}
              </div>
              <p className="package-summary">
                {(() => {
                  // Calculate current package total with plus services
                  let minTotal = selectedPackage.price;
                  let maxTotal =
                    selectedPackage.maxPrice || selectedPackage.price;

                  selectedPlusServices.forEach((serviceName) => {
                    const service = currentPlusServices.find(
                      (s) => s.name === serviceName
                    );
                    if (service) {
                      if (service.price === "ceramic-coating-dynamic") {
                        const ceramicPrice = getCeramicCoatingPrice();
                        minTotal += ceramicPrice;
                        maxTotal += ceramicPrice;
                      } else if (typeof service.price === "number") {
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
                    // Determine if this is an interior, exterior, or paint correction package
                    const isInteriorPackage = [
                      "PRESSURE",
                      "GOLD",
                      "SILVER",
                    ].includes(selectedPackage.name);
                    const isPaintCorrectionPackage = [
                      "One Step Paint Correction",
                      "Two Step Paint Correction",
                    ].includes(selectedPackage.name);

                    if (isInteriorPackage) {
                      // Save interior package and plus services
                      setConfirmedInteriorPackage(selectedPackage);
                      setConfirmedInteriorPlusServices([
                        ...selectedPlusServices,
                      ]);

                      // If user selected "Exterior and Interior", move to exterior step
                      if (selectedService === "Exterior and Interior") {
                        setActiveStep(4); // Move to exterior packages
                      } else {
                        // If only interior, move to date/time
                        setActiveStep(5);
                      }
                    } else if (isPaintCorrectionPackage) {
                      // Save paint correction package and plus services
                      setConfirmedExteriorPackage(selectedPackage);
                      setConfirmedExteriorPlusServices([
                        ...selectedPlusServices,
                      ]);

                      // Move to date/time step
                      setActiveStep(4); // Paint Correction goes to step 4 (calendar)
                    } else {
                      // Save exterior package and plus services
                      setConfirmedExteriorPackage(selectedPackage);
                      setConfirmedExteriorPlusServices([
                        ...selectedPlusServices,
                      ]);

                      // Move to date/time step
                      setActiveStep(5);
                    }

                    setShowPlusServices(false);
                    setSelectedPlusServices([]); // Reset for next package
                  }}
                >
                  Continue
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
    </>
  );
}

export default MonthlySub;
