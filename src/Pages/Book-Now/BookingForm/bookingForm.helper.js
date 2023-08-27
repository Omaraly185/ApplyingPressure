import React, { useState, useEffect } from "react";
import { toast } from "react-toastify";

export const carOptions = [
  { label: "Sedan", value: "sedan" },
  { label: "2 Row Suv", value: "twoRow" },
  { label: "3 Row Suv", value: "threeRow" },
  { label: "Heavy Truck", value: "van" },
];

export const validateFields = (
  bookingForm,
  selectedInteriorOption,
  selectedExteriorOption
) => {
  const requiredFields = [
    "name",
    "phoneNumber",
    "address",
    "city",
    "state",
    "email",
    "zipCode",
    "yes_no",
  ];

  for (let field of requiredFields) {
    if (!bookingForm[field]) {
      toast.error("Please fill out all the fields.");
      return false;
    }
  }

  if (
    selectedInteriorOption.value === "NA" &&
    selectedExteriorOption.value === "NA"
  ) {
    toast.error(
      "Please select at least one option between Interior and Exterior."
    );
    return false;
  }

  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailPattern.test(bookingForm.email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phonePattern.test(bookingForm.phoneNumber)) {
    toast.error("Please enter a valid phone number.");
    return false;
  }
  const zipPattern = /^\d{5}(-\d{4})?$/;
  if (!zipPattern.test(bookingForm.zipCode)) {
    toast.error("Please provide a valid zip code.");
    return false;
  }

  return true; // Return true if all validations pass.
};

export const options = [
  { label: "Waxes", value: "wax" },
  { label: "Water Spot Removal", value: "waterSpot" },
  { label: "Engine Bay Clean", value: "engineClean" },
  { label: "Headlight Clean", value: "headlight" },
];

export const exteriorOptions = [
  { label: "N/A", value: "NA" },
  { label: "Standard Exterior", value: "standardExterior" },
  { label: "Standard Plus Exterior", value: "standardPlus" },
  { label: "1-Step Paint Correction", value: "oneStep" },
  { label: "2-Step Paint Correction", value: "twoStep" },
];

export const interiorOptions = [
  { label: "N/A", value: "NA" },
  { label: "Silver Interior", value: "silverInterior" },
  { label: "Gold Interior", value: "goldInterior" },
  { label: "Pressure Special", value: "pressureSpecial" },
];

export const selectStyles = {
  control: (base) => ({
    ...base,
    background: "#fff",
    borderColor: "#9e9e9e",
    boxShadow: "none",
    "&:hover": {
      borderColor: "#9e9e9e",
    },
  }),
  menu: (base) => ({
    ...base,
    color: "black",
    borderRadius: 0,
    marginTop: 0,
    height: "142px",
    overflow: "scroll",
  }),
  menuList: (base) => ({
    ...base,
    background: "#fff",
    padding: 0,
    maxHeight: "142px",
    overflow: "scroll",
  }),
};

export const stateOptions = [
  { label: "New York", value: "NY" },
  { label: "New Jersey", value: "NJ" },
];

export const computePriceRange = (
  selectedCar,
  selectedOptions,
  selectedExteriorOption,
  selectedInteriorOption,
  carPricing
) => {
  let minPrice = 0;
  let maxPrice = 0;

  if (selectedOptions.length > 0) {
    selectedOptions.forEach((option) => {
      const carPackage = carPricing[selectedCar.value]?.services[option];
      if (carPackage) {
        minPrice += carPackage.minPrice;
        maxPrice += carPackage.maxPrice;
      }
    });
  }

  const exteriorOptionPrice =
    carPricing[selectedCar.value]?.exteriors[selectedExteriorOption.value];
  if (exteriorOptionPrice) {
    minPrice += exteriorOptionPrice.minPrice;
    maxPrice += exteriorOptionPrice.maxPrice;
  }

  const interiorOptionPrice =
    carPricing[selectedCar.value]?.interiors[selectedInteriorOption.value];
  if (interiorOptionPrice) {
    minPrice += interiorOptionPrice.minPrice;
    maxPrice += interiorOptionPrice.maxPrice;
  }

  return { min: minPrice, max: maxPrice };
};
