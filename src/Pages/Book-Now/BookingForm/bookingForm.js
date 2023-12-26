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
    <div className="myCustomHeight contact-form-container bookformcontainer">
      <ToastContainer style={{ marginTop: "50px" }} />
      <h1>Book Your Service</h1>
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
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={bookingForm.city}
            onChange={handleChange}
            className="inputForm"
            required
          />
          <label htmlFor="state">
            State:
            <img
              height={20}
              padding={10}
              className="invert"
              src={Info}
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(false)}
              alt="i"
            />
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
          <Popover
            isOpen={isPopoverOpen}
            positions={["top", "right"]}
            align={"end"}
            content={
              <div
                style={{
                  padding: "5px",
                  backgroundColor: "white",
                  borderRadius: "10px",
                }}
              >
                We only service NY and NJ addresses
                <br />
                Please Note: there may be a travel <br />
                fee for up to $45 depending on distance
              </div>
            }
            containerStyle={{
              zIndex: 100,
              backgroundColor: "white",
            }}
          >
            <div
              onMouseEnter={() => setPopoverOpen(true)}
              onMouseLeave={() => setPopoverOpen(true)} // Here, I assume you meant to setPopoverOpen to false.
            ></div>
          </Popover>
          <br /> <br />
          <div id="wrapper">
            <label for="yes_no">
              Is there any dog hair or spillage that may have caused odor
            </label>
            <div style={{ display: "inline-flex" }}>
              <p style={{ padding: "0 10px" }}>
                <input
                  type="radio"
                  id="yes"
                  name="yes_no"
                  value="yes"
                  checked={bookingForm.yes_no === "yes"}
                  onChange={handleRadioChange}
                />
                <label for="yes">Yes</label>
              </p>
              <p style={{ padding: "0 10px" }}>
                <input
                  type="radio"
                  id="no"
                  name="yes_no"
                  value="no"
                  checked={bookingForm.yes_no === "no"}
                  onChange={handleRadioChange}
                />
                <label for="no">No</label>
              </p>
            </div>
            <br /> <br />
          </div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={bookingForm.zipCode}
            onChange={handleChange}
            className="inputForm"
          />
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
          />
        </div>
        <button className="minecraft" onClick={handleSubmit}>
          Choose an Appointment
        </button>
      </form>
      <p>
        Based on your selected options, the estimated price range is between :
        <span style={{ fontSize: "20px" }}>
          ${priceRange.min} - ${priceRange.max}.
        </span>
        <div style={{ marginTop: "18%" }}>
          ***After job is complete we accept Apple Pay, Cash App, Cash Zelle,
          and Venmo.***
        </div>
      </p>
    </div>
  );
};

export default BookingForm;
