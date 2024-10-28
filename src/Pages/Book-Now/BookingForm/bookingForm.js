import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/action";
import { Popover } from "react-tiny-popover";
import "./bookingForm.css";
import Info from "./info.png";
import Select from "react-select";
import carPricing from "./carPricing.json";
import { ToastContainer } from "react-toastify";
import {
  carOptions,
  options,
  exteriorOptions,
  interiorOptions,
  selectStyles,
  computePriceRange,
  stateOptions,
  validateFields,
} from "./bookingForm.helper";

const BookingForm = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const bookingForm = useSelector((state) => state.bookingForm);

  const [selectedExteriorOption, setSelectedExteriorOption] = useState({
    label: "N/A",
    value: "NA",
  });
  const [selectedInteriorOption, setSelectedInteriorOption] = useState({
    label: "N/A",
    value: "NA",
  });

  const [selectedCar, setSelectedCar] = useState({
    label: "Sedan",
    value: "sedan",
  });

  const handleCarChange = (selectedCar) => {
    setSelectedCar(selectedCar);
    dispatch(setFormData({ ...bookingForm, car: selectedCar.value }));
  };

  useEffect(() => {
    if (selectedCar && selectedExteriorOption && selectedInteriorOption) {
      const newPriceRange = computePriceRange(
        selectedCar,
        selectedOptions,
        selectedExteriorOption,
        selectedInteriorOption,
        carPricing
      );

      setPriceRange(newPriceRange);
      dispatch(
        setFormData({
          ...bookingForm,
          priceRange: newPriceRange,
        })
      );
    }
  }, [
    selectedCar,
    selectedOptions,
    selectedExteriorOption,
    selectedInteriorOption,
  ]);

  const handleOptionChange = (selectedOptionValues) => {
    const values = selectedOptionValues.map((option) => option.value);
    setSelectedOptions(values);
    dispatch(setFormData({ ...bookingForm, plusServices: values }));
  };

  const handleExteriorOptionChange = (selectedOption) => {
    setSelectedExteriorOption(selectedOption);
    dispatch(
      setFormData({ ...bookingForm, exteriorOption: selectedOption.value })
    );
  };

  const handleInteriorOptionChange = (selectedOption) => {
    setSelectedInteriorOption(selectedOption);
    dispatch(
      setFormData({ ...bookingForm, interiorOption: selectedOption.value })
    );
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "name") {
      // eslint-disable-next-line no-undef
      fbq("trackCustom", "NameFieldChange", {
        fieldName: name,
        fieldValue: value,
      });
    }
    dispatch(setFormData({ ...bookingForm, [name]: value }));
  };

  const handleRadioChange = (e) => {
    const { value } = e.target;

    dispatch(
      setFormData({
        ...bookingForm,
        yes_no: value,
      })
    );
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validateFields(
      bookingForm,
      selectedInteriorOption,
      selectedExteriorOption
    );
    if (isValid) {
      // eslint-disable-next-line no-undef
      fbq("trackCustom", "AppointmentButtonClicked");
      handleOpen();
    }
  };

  return (
    <div className="customHeight contact-form-container bookformcontainer">
      <ToastContainer style={{ marginTop: "80px" }} />
      <h1 style={{ marginBottom: "20px", marginTop: "15px" }}>
        BOOK YOUR SERVICE
      </h1>
      <form onSubmit={handleSubmit}>
        <div className="testing1234">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={bookingForm.name}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={bookingForm.phoneNumber}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={bookingForm.address}
            onChange={handleChange}
            className="inputForm"
            required
          />
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={bookingForm.zipCode}
            onChange={handleChange}
            className="inputForm"
          />
          <label
            htmlFor="state"
            className="state-label"
            style={{
              position: "relative",
              display: "flex",
              alignItems: "center",
            }}
          >
            State:
            <Popover
              isOpen={isPopoverOpen}
              positions={["top", "right"]} // Keep the popover positioned above the label
              align="center" // Align the popover to the center of the label
              padding={5}
              containerStyle={{
                zIndex: 100,
                backgroundColor: "white",
              }}
              onClickOutside={() => setPopoverOpen(false)}
              reposition={true} // Automatically repositions if needed
              content={
                <div
                  style={{
                    padding: "5px",
                    backgroundColor: "white",
                    borderRadius: "10px",
                    boxShadow: "0 0 10px rgba(0, 0, 0, 0.2)",
                    position: "relative",
                  }}
                >
                  We only service NY and NJ addresses
                  <br />
                  Please Note: there may be a travel <br />
                  fee for up to $45 depending on distance
                </div>
              }
            >
              <img
                height={20}
                className=""
                src={Info}
                alt="info"
                onClick={() => setPopoverOpen(!isPopoverOpen)}
                style={{ cursor: "pointer", marginLeft: "5px" }}
              />
            </Popover>
          </label>
          <Select
            name="state"
            options={stateOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={(selectedOption) => {
              handleChange({
                target: {
                  name: "state",
                  value: selectedOption.value,
                },
              });
            }}
            value={stateOptions.find(
              (option) => option.value === bookingForm.state
            )}
            styles={selectStyles}
            required
          />
          <br /> <br />
          <div id="wrapper" style={{ marginBottom: 10 }}>
            <label htmlFor="yes_no">
              Is there any dog hair or spillage that may have caused odor
            </label>
            <div
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: "50px",
              }}
            >
              <p>
                <input
                  type="radio"
                  id="yes"
                  name="yes_no"
                  value="yes"
                  checked={bookingForm.yes_no === "yes"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="yes" className="yes-no-label">
                  Yes
                </label>
              </p>
              <p>
                <input
                  type="radio"
                  id="no"
                  name="yes_no"
                  value="no"
                  checked={bookingForm.yes_no === "no"}
                  onChange={handleRadioChange}
                />
                <label htmlFor="no" className="yes-no-label">
                  No
                </label>
              </p>
            </div>
            <br /> <br />
          </div>
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={bookingForm.email}
            onChange={handleChange}
            className="inputForm"
          />
          <label htmlFor="car">Car:</label>
          <Select
            name="car"
            options={carOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleCarChange}
            value={carOptions.find(
              (option) => option.value === selectedCar?.value
            )}
            styles={selectStyles}
          />
          <label htmlFor="exteriorOption">Exterior Option:</label>
          <Select
            name="exteriorOption"
            options={exteriorOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleExteriorOptionChange}
            value={exteriorOptions.find(
              (option) => option.value === selectedExteriorOption?.value
            )}
            styles={selectStyles}
          />
          <label htmlFor="interiorOption">Interior Option:</label>
          <Select
            name="interiorOption"
            options={interiorOptions}
            className="basic-single-select"
            classNamePrefix="select"
            onChange={handleInteriorOptionChange}
            value={interiorOptions.find(
              (option) => option.value === selectedInteriorOption?.value
            )}
            styles={selectStyles}
          />
          <label htmlFor="plusServices">Plus Services:</label>
          <Select
            isMulti
            name="plusServices"
            options={options}
            className="basic-multi-select"
            classNamePrefix="select"
            onChange={handleOptionChange}
            value={options.filter((option) =>
              selectedOptions.includes(option.value)
            )}
            styles={selectStyles}
          />
          <label htmlFor="message">Message:</label>
          <textarea
            name="message"
            value={bookingForm.message}
            onChange={handleChange}
            className={"inputForm"}
            style={{
              minHeight: 115,
              maxHeight: 115,
              minWidth: "100%",
              maxWidth: "100%",
            }}
          />
        </div>
        <button className="minecraft" onClick={handleSubmit}>
          Choose an Appointment
        </button>
      </form>
      <p>
        Based on your selected options, the estimated price range is between:
        <span
          style={{
            fontSize: "20px",
            fontWeight: "bold",
            display: "block",
            marginTop: "20px",
          }}
        >
          ${priceRange.min} - ${priceRange.max}.
        </span>
      </p>
      <div
        style={{
          marginTop: "20px",
          fontSize: "14px",
          color: "#000",
          fontStyle: "italic",
        }}
      >
        ***After job is complete we accept Apple Pay, Cash App, Cash Zelle, and
        Venmo.***
      </div>
    </div>
  );
};

export default BookingForm;
