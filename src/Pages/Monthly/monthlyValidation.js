import { toast } from "react-toastify";

export const validateMonthlyFields = (
  name,
  address,
  zip,
  phone,
  email,
  selectedDate,
  selectedTime,
  confirmedInteriorPackage,
  confirmedExteriorPackage
) => {
  // Check if name is filled
  if (!name || name.trim() === "") {
    toast.error("Please enter your name.");
    return false;
  }

  // Check if address is filled
  if (!address || address.trim() === "") {
    toast.error("Please enter your address.");
    return false;
  }

  // Check if zip code is filled
  if (!zip || zip.trim() === "") {
    toast.error("Please enter your zip code.");
    return false;
  }

  // Validate zip code format
  const zipPattern = /^\d{5}(-\d{4})?$/;
  if (!zipPattern.test(zip)) {
    toast.error("Please provide a valid zip code (e.g., 12345 or 12345-6789).");
    return false;
  }

  // Check if phone number is filled
  if (!phone || phone.trim() === "") {
    toast.error("Please enter your phone number.");
    return false;
  }

  // Validate phone number format
  const phonePattern = /^\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}$/;
  if (!phonePattern.test(phone)) {
    toast.error("Please enter a valid phone number.");
    return false;
  }

  // Check if email is filled
  if (!email || email.trim() === "") {
    toast.error("Please enter your email address.");
    return false;
  }

  // Validate email format
  const emailPattern = /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i;
  if (!emailPattern.test(email)) {
    toast.error("Please enter a valid email address.");
    return false;
  }

  // Validate service selection
  if (!confirmedInteriorPackage && !confirmedExteriorPackage) {
    toast.error("Please select at least one service package.");
    return false;
  }

  // Validate date selection
  if (!selectedDate) {
    toast.error("Please select an appointment date.");
    return false;
  }

  // Validate time selection
  if (!selectedTime) {
    toast.error("Please select an appointment time.");
    return false;
  }

  return true;
};

export const formatPhoneNumber = (value) => {
  // Remove all non-digit characters
  const phoneNumber = value.replace(/\D/g, "");
  
  // Format as (XXX) XXX-XXXX
  if (phoneNumber.length >= 6) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
  } else if (phoneNumber.length >= 3) {
    return `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
  } else {
    return phoneNumber;
  }
};

export const formatZipCode = (value) => {
  // Remove all non-digit characters except hyphens
  const zipCode = value.replace(/[^\d-]/g, "");
  
  // Limit to 10 characters (12345-6789 format)
  if (zipCode.length > 10) {
    return zipCode.slice(0, 10);
  }
  
  return zipCode;
};
