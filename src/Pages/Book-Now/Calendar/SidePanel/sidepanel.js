import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./sidepanel.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useSelector } from "react-redux";

function Sidepanel(props) {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const {
    showPanel,
    selectedDate,
    setSelectedDate,
    events,
    setShowPanel,
    handleTimeSelect,
  } = props;
  const name = useSelector((state) => state.bookingForm.name);
  const dogHair = useSelector((state) => state.bookingForm.yes_no);
  const message = useSelector((state) => state.bookingForm.message) || "";
  const price = useSelector((state) => state.bookingForm.priceRange);
  const location = useSelector((state) => state.bookingForm.address);
  const carType = useSelector((state) => state.bookingForm.car);
  const phoneNumber = useSelector((state) => state.bookingForm.phoneNumber);
  const ExteriorPackage = useSelector(
    (state) => state.bookingForm.exteriorOption
  );
  const interiorPackage = useSelector(
    (state) => state.bookingForm.interiorOption
  );
  const email = useSelector((state) => state.bookingForm.email);
  const plusService = useSelector((state) => state.bookingForm.plusServices);
  const arrayAT = [
    "9:00 AM",
    "10:00 AM",
    "11:00 AM",
    "12:00 PM",
    "1:00 PM",
    "2:00 PM",
    "3:00 PM",
    "4:00 PM",
  ];

  const [cardNumber, setCardNumber] = useState("");
  const [cardName, setCardName] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [showCreditCardForm, setShowCreditCardForm] = useState(false);
  const [selectedTime, setSelectedTime] = useState("");

  const toggleCreditcard = (time) => {
    setSelectedTime(time);
    setShowCreditCardForm(true);
  };
  const disabledDates = [
    new Date(2024, 11, 11),
    new Date(2024, 11, 12),
    new Date(2024, 11, 15),
  ];

  const handleFormSubmit = async (e) => {
    let appointmentLength = 0;
    if (ExteriorPackage === "standardExterior") {
      appointmentLength = appointmentLength + 2;
    }
    if (ExteriorPackage === "washWax") {
      appointmentLength = appointmentLength + 2;
    }
    if (ExteriorPackage === "oneStep") {
      appointmentLength = appointmentLength + 4;
    }
    if (ExteriorPackage === "twoStep") {
      appointmentLength = appointmentLength + 6;
    }
    if (interiorPackage === "silverInterior") {
      appointmentLength = appointmentLength + 2;
    }

    if (interiorPackage === "goldInterior") {
      appointmentLength = appointmentLength + 3;
    }
    if (interiorPackage === "pressureSpecial") {
      appointmentLength = appointmentLength + 4;
    }
    appointmentLength += 1;
    e.preventDefault();
    setLoading(true);

    const selectedDateTimeString = `${selectedDate} ${selectedTime}`;
    const selectedDateTime = new Date(selectedDateTimeString);
    const endDateTime = new Date(selectedDateTime.getTime());
    const endTime = endDateTime.setHours(
      selectedDateTime.getHours() + appointmentLength
    );

    if (!selectedDate || !selectedTime) {
      console.error("Please select a date and time for the appointment.");
      return;
    }

    const newEvent = {
      email,
      name,
      phoneNumber,
      ExteriorPackage,
      interiorPackage,
      plusService,
      selectedDate,
      selectedTime,
      endTime,
      dogHair,
      message,
      description: `APL:OTheGeneral \n\n ${name} ${phoneNumber},\n\n ${carType},\n ${ExteriorPackage} ${interiorPackage} $ ${plusService}\n\n dog Hair/Smell:${dogHair}\n\n ${price.min}-${price.max},\n\nAPD:\n\n\n\n${message}`,
      location: `${location}`,
    };

    try {
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
        console.log("Appointment created successfully");
      } else {
        console.error("Failed to create appointment");
      }
    } catch (error) {
      console.error("Error creating appointment:", error);
    }
    setLoading(false);
    setShowCreditCardForm(false);
    handleClose();
    navigate(
      `/success?selectedDate=${selectedDate}&selectedTime=${selectedTime}`
    );
  };

  const handleClose = () => {
    setShowPanel(false);
    setShowCreditCardForm(false);
    setCardNumber("");
    setCardName("");
    setExpiryDate("");
    setCvv("");
  };
  const isTimeAvailable = (time) => {
    const selectedTimeString = `${selectedDate} ${time}`;
    const selectedTime = new Date(selectedTimeString);

    let appointmentLength = 0;
    const dayOfWeek = selectedTime.getDay();
    if (dayOfWeek === 5) {
      return false;
    }

    if (
      ExteriorPackage === "standardExterior" ||
      ExteriorPackage === "washWax"
    ) {
      appointmentLength = appointmentLength + 2;
    }
    if (ExteriorPackage === "oneStep") {
      appointmentLength = appointmentLength + 4;
    }
    if (ExteriorPackage === "twoStep") {
      appointmentLength = appointmentLength + 6;
    }
    if (interiorPackage === "silverInterior") {
      appointmentLength = appointmentLength + 2;
    }
    if (interiorPackage === "goldInterior") {
      appointmentLength = appointmentLength + 3;
    }
    if (interiorPackage === "pressureSpecial") {
      appointmentLength = appointmentLength + 4;
    }
    appointmentLength += 1;

    const endTime = new Date(selectedTime.getTime());
    endTime.setHours(selectedTime.getHours() + appointmentLength);
    if (endTime.getHours() > 21) {
      return false;
    }
    return !events.some((event) => {
      const eventStart = new Date(event.start);
      const eventEnd = new Date(event.end);

      const isConflicting =
        (selectedTime >= eventStart && selectedTime < eventEnd) ||
        (endTime > eventStart && endTime <= eventEnd) ||
        (selectedTime < eventStart && endTime > eventEnd);

      return isConflicting;
    });
  };
  const isDateDisabled = (date) => {
    return disabledDates.some(
      (disabledDate) =>
        date.getDate() === disabledDate.getDate() &&
        date.getMonth() === disabledDate.getMonth() &&
        date.getFullYear() === disabledDate.getFullYear()
    );
  };

  return (
    <>
      {showPanel && (
        <div className="panel slide-in">
          <button className="panel-close-button" onClick={handleClose}>
            <span className="inner-content">
              <span className="label">Close</span>
            </span>
          </button>
          {!showCreditCardForm ? (
            <>
              <div className="panel-title">
                Available times for {selectedDate}
                <DatePicker
                  selected={selectedDate}
                  onChange={(date) => setSelectedDate(date)}
                  filterDate={(date) => !isDateDisabled(date)}
                  dayClassName={(date) =>
                    isDateDisabled(date) ? "disabled-date" : undefined
                  }
                  inline
                />
              </div>
              <div
                className={` ${
                  arrayAT.some((time) => isTimeAvailable(time))
                    ? "available-times"
                    : "no-available-times"
                }`}
              >
                {arrayAT.some((time) => isTimeAvailable(time)) ? (
                  arrayAT.map((time) =>
                    isTimeAvailable(time) ? (
                      <button
                        className="available-time-button"
                        onClick={() => toggleCreditcard(time)}
                        key={time}
                      >
                        {time}
                      </button>
                    ) : null
                  )
                ) : (
                  <div>No available times on this day</div>
                )}
              </div>
            </>
          ) : (
            <>
              <div className="panel-title">
                Confirm Appointment for {selectedDate} at {selectedTime}
              </div>
              <form className="credit-card-form" onSubmit={handleFormSubmit}>
                Are you sure this is the appointment you'd like?
                <button type="submit" disabled={loading}>
                  {loading ? "Loading..." : "Submit"}
                </button>
                <br />
                <button
                  style={{
                    backgroundColor: "red",
                    width: "50%",
                    height: "30px",
                  }}
                  type="cancel"
                  disabled={loading}
                  onClick={handleClose}
                >
                  Cancel
                </button>
              </form>
            </>
          )}
        </div>
      )}
    </>
  );
}

export default Sidepanel;
