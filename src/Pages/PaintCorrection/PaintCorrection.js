import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./PaintCorrection.scss";
import CheckIcon from "./check.png";
import carPricing from "../Book-Now/BookingForm/carPricing.json";

function PaintCorrection() {
  const navigate = useNavigate();
  const [selectedCar, setSelectedCar] = useState(null);

  const carTypes = [
    { name: "Sedan/Coupe", key: "sedan", image: "/path/to/sedan.png" },
    { name: "2 Row SUV", key: "twoRow", image: "/path/to/suv.png" },
    { name: "3 Row SUV", key: "threeRow", image: "/path/to/3row.png" },
    { name: "Full Size Van", key: "van", image: "/path/to/van.png" },
  ];

  const getPriceForCarType = (carKey, serviceType) => {
    return (
      carPricing[carKey]?.paintCorrection?.[serviceType] || {
        minPrice: 0,
        maxPrice: 0,
      }
    );
  };

  const handleBookNow = (serviceType) => {
    if (!selectedCar) {
      alert("Please select your car type first");
      return;
    }

    navigate("/book-now", {
      state: {
        selectedService: "Paint Correction",
        serviceType: serviceType,
        carType: selectedCar,
      },
    });
  };

  return (
    <div className="paint-correction-container">
      <div className="hero-section">
        <h1>PAINT CORRECTION</h1>
        <p>
          Professional paint correction services to restore your vehicle's
          finish
        </p>
      </div>

      {/* Car Type Selection */}
      <div className="car-selection-section">
        <h2>Select Your Vehicle Type</h2>
        <div className="car-types-grid">
          {carTypes.map((car) => (
            <div
              key={car.key}
              className={`car-type-card ${
                selectedCar?.key === car.key ? "selected" : ""
              }`}
              onClick={() => setSelectedCar(car)}
            >
              <img src={car.image} alt={car.name} className="car-image" />
              <h3>{car.name}</h3>
            </div>
          ))}
        </div>
      </div>

      {/* Paint Correction Services */}
      <div className="services-section">
        <h2>Choose Your Paint Correction Service</h2>
        <div className="services-grid">
          {/* ONE STEP */}
          <div className="service-card one-step">
            <div className="service-header">
              <h3>ONE STEP</h3>
              <p className="swirl-removal">40-60% Swirl & Scratch Removal</p>
            </div>

            <div className="service-features">
              <div className="feature-item">
                <img src={CheckIcon} alt="check" className="check-icon" />
                <span>Standard and Wash & wax included</span>
              </div>
            </div>

            <div className="pricing-section">
              <h4>VEHICLE PRICES</h4>
              <div className="price-list">
                <div className="price-item">
                  <span>Sedan/coups</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType(selectedCar.key, "oneStep").minPrice
                      : "400"}
                  </span>
                </div>
                <div className="price-item">
                  <span>2 Row SUV</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("twoRow", "oneStep").minPrice
                      : "450"}
                  </span>
                </div>
                <div className="price-item">
                  <span>3 Row SUV</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("threeRow", "oneStep").minPrice
                      : "550"}
                  </span>
                </div>
                <div className="price-item">
                  <span>Full size van</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("van", "oneStep").minPrice
                      : "600"}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="book-button"
              onClick={() => handleBookNow("oneStep")}
            >
              Book Now
            </button>
          </div>

          {/* TWO STEP */}
          <div className="service-card two-step">
            <div className="service-header">
              <h3>TWO STEP</h3>
              <p className="swirl-removal">60-80% Swirl & Scratch Removal</p>
            </div>

            <div className="service-features">
              <div className="feature-item">
                <img src={CheckIcon} alt="check" className="check-icon" />
                <span>Standard and Wash & wax included.</span>
              </div>
            </div>

            <div className="pricing-section">
              <h4>VEHICLE PRICES</h4>
              <div className="price-list">
                <div className="price-item">
                  <span>Sedan/coups</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType(selectedCar.key, "twoStep").minPrice
                      : "600"}
                  </span>
                </div>
                <div className="price-item">
                  <span>2 Row SUV.</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("twoRow", "twoStep").minPrice
                      : "675"}
                  </span>
                </div>
                <div className="price-item">
                  <span>3 Row SUV.</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("threeRow", "twoStep").minPrice
                      : "825"}
                  </span>
                </div>
                <div className="price-item">
                  <span>Full size van</span>
                  <span>
                    $
                    {selectedCar
                      ? getPriceForCarType("van", "twoStep").minPrice
                      : "900"}
                  </span>
                </div>
              </div>
            </div>

            <button
              className="book-button"
              onClick={() => handleBookNow("twoStep")}
            >
              Book Now
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PaintCorrection;
