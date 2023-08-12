import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setFormData } from "../../../redux/action";
import { Popover } from "react-tiny-popover";
import "./bookingForm.css";
import Info from "./info.png";
import Select from "react-select";

const BookingForm = ({ handleOpen }) => {
  const dispatch = useDispatch();
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [isPopoverOpen, setPopoverOpen] = useState(false);

  const [priceRange, setPriceRange] = useState({ min: 0, max: 0 });
  const bookingForm = useSelector((state) => state.bookingForm);

  const carPricing = {
    sedan: {
      services: {
        wax: { minPrice: 35, maxPrice: 35 },
        waterSpot: { minPrice: 30, maxPrice: 30 },
        engineClean: { minPrice: 35, maxPrice: 35 },
        headlight: { minPrice: 40, maxPrice: 40 },
      },
      exteriors: {
        NA: { minPrice: 0, maxPrice: 0 },
        standardExterior: { minPrice: 50, maxPrice: 50 },
        standardPlus: { minPrice: 125, maxPrice: 125 },
        oneStep: { minPrice: 400, maxPrice: 400 },
        twoStep: { minPrice: 600, maxPrice: 600 },
      },
      interiors: {
        NA: { minPrice: 0, maxPrice: 0 },
        silverInterior: { minPrice: 55, maxPrice: 95 },
        goldInterior: { minPrice: 100, maxPrice: 200 },
        pressureSpecial: { minPrice: 200, maxPrice: 350 },
      },
    },
    twoRow: {
      services: {
        wax: { minPrice: 80, maxPrice: 120 },
        waterSpot: { minPrice: 30, maxPrice: 30 },
        engineClean: { minPrice: 35, maxPrice: 35 },
        headlight: { minPrice: 40, maxPrice: 40 },
      },
      exteriors: {
        NA: { minPrice: 0, maxPrice: 0 },
        standardExterior: { minPrice: 55, maxPrice: 55 },
        standardPlus: { minPrice: 140, maxPrice: 140 },
        oneStep: { minPrice: 450, maxPrice: 450 },
        twoStep: { minPrice: 675, maxPrice: 675 },
      },
      interiors: {
        NA: { minPrice: 0, maxPrice: 0 },
        silverInterior: { minPrice: 60, maxPrice: 100 },
        goldInterior: { minPrice: 120, maxPrice: 220 },
        pressureSpecial: { minPrice: 240, maxPrice: 390 },
      },
    },
    threeRow: {
      services: {
        wax: { minPrice: 80, maxPrice: 120 },
        waterSpot: { minPrice: 30, maxPrice: 30 },
        engineClean: { minPrice: 35, maxPrice: 35 },
        headlight: { minPrice: 40, maxPrice: 40 },
      },
      exteriors: {
        NA: { minPrice: 0, maxPrice: 0 },
        standardExterior: { minPrice: 70, maxPrice: 70 },
        standardPlus: { minPrice: 175, maxPrice: 175 },
        oneStep: { minPrice: 550, maxPrice: 550 },
        twoStep: { minPrice: 825, maxPrice: 825 },
      },
      interiors: {
        NA: { minPrice: 0, maxPrice: 0 },
        silverInterior: { minPrice: 70, maxPrice: 110 },
        goldInterior: { minPrice: 140, maxPrice: 240 },
        pressureSpecial: { minPrice: 280, maxPrice: 430 },
      },
    },
    van: {
      services: {
        wax: { minPrice: 80, maxPrice: 120 },
        waterSpot: { minPrice: 30, maxPrice: 30 },
        engineClean: { minPrice: 35, maxPrice: 35 },
        headlight: { minPrice: 40, maxPrice: 40 },
      },
      exteriors: {
        NA: { minPrice: 0, maxPrice: 0 },
        standardExterior: { minPrice: 95, maxPrice: 95 },
        standardPlus: { minPrice: 240, maxPrice: 240 },
        oneStep: { minPrice: 600, maxPrice: 600 },
        twoStep: { minPrice: 900, maxPrice: 900 },
      },
      interiors: {
        NA: { minPrice: 0, maxPrice: 0 },
        silverInterior: { minPrice: 95, maxPrice: 105 },
        goldInterior: { minPrice: 185, maxPrice: 240 },
        pressureSpecial: { minPrice: 300, maxPrice: 430 },
      },
    },
  };

  const carOptions = [
    { label: "Sedan", value: "sedan" },
    { label: "2 Row Suv", value: "twoRow" },
    { label: "3 Row Suv", value: "threeRow" },
    { label: "Heavy Truck", value: "van" },
  ];

  const [selectedExteriorOption, setSelectedExteriorOption] = useState({
    label: "N/A",
    value: "NA",
  });
  const [selectedInteriorOption, setSelectedInteriorOption] = useState({
    label: "N/A",
    value: "NA",
  });
  const stateOptions = [
    { label: "New York", value: "NY" },
    { label: "New Jersey", value: "NJ" },
  ];

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

      setPriceRange({ min: minPrice, max: maxPrice });
      dispatch(
        setFormData({
          ...bookingForm,
          priceRange: { min: minPrice, max: maxPrice },
        })
      );
    }
  }, [
    selectedCar,
    selectedOptions,
    selectedExteriorOption,
    selectedInteriorOption,
  ]);

  const [errors, setErrors] = useState({
    name: false,
    phoneNumber: false,
    address: false,
    zipCode: false,
    city: false,
    state: false,
    email: false,
    plusServices: false,
    exteriorOption: false,
    interiorOption: false,
  });

  const options = [
    { label: "Waxes", value: "wax" },
    { label: "Water Spot Removal", value: "waterSpot" },
    { label: "Engine Bay Clean", value: "engineClean" },
    { label: "Headlight Clean", value: "headlight" },
  ];

  const exteriorOptions = [
    { label: "N/A", value: "NA" },
    { label: "Standard Exterior", value: "standardExterior" },
    { label: "Standard Plus Exterior", value: "standardPlus" },
    { label: "1-Step Paint Correction", value: "oneStep" },
    { label: "2-Step Paint Correction", value: "twoStep" },
  ];

  const interiorOptions = [
    { label: "N/A", value: "NA" },
    { label: "Silver Interior", value: "silverInterior" },
    { label: "Gold Interior", value: "goldInterior" },
    { label: "Pressure Special", value: "pressureSpecial" },
  ];

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
    setErrors((prevErrors) => ({ ...prevErrors, [name]: false }));
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
    const newErrors = Object.keys(bookingForm).reduce((result, field) => {
      if (field !== "message") {
        result[field] = !bookingForm[field];
      }
      return result;
    }, {});

    if (Object.values(newErrors).includes(true)) {
      setErrors(newErrors);
    } else {
      handleOpen();
    }
  };

  const selectStyles = {
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
      height: "100px",
      overflow: "scroll",
    }),
    menuList: (base) => ({
      ...base,
      padding: 0,
      maxHeight: "100px",
      overflow: "scroll",
    }),
  };

  return (
    <div className="myCustomHeight contact-form-container bookformcontainer">
      <h1>Book Your Service</h1>
      <form onSubmit={handleSubmit}>
        <div className="testing1234">
          <label htmlFor="name">Name:</label>
          <input
            type="text"
            name="name"
            value={bookingForm.name}
            onChange={handleChange}
            className={errors.name ? "error" : "inputForm"}
          />
          <label htmlFor="phoneNumber">Phone Number:</label>
          <input
            type="text"
            name="phoneNumber"
            value={bookingForm.phoneNumber}
            onChange={handleChange}
            className={errors.phoneNumber ? "error" : "inputForm"}
          />
          <label htmlFor="address">Address:</label>
          <input
            type="text"
            name="address"
            value={bookingForm.address}
            onChange={handleChange}
            className={errors.address ? "error" : "inputForm"}
            required
          />
          <label htmlFor="city">City:</label>
          <input
            type="text"
            name="city"
            value={bookingForm.city}
            onChange={handleChange}
            className={errors.city ? "error" : "inputForm"}
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
          <br />
          <br />
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

            <br />
            <br />
          </div>
          <label htmlFor="zipCode">Zip Code:</label>
          <input
            type="text"
            name="zipCode"
            value={bookingForm.zipCode}
            onChange={handleChange}
            className={errors.zipCode ? "error" : "inputForm"}
          />
          <label htmlFor="email">Email:</label>
          <input
            type="text"
            name="email"
            value={bookingForm.email}
            onChange={handleChange}
            className={errors.email ? "error" : "inputForm"}
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
        <br />
        <br />
        <br />
        ***Once your appointment has been completed, we accept payments through
        Apple Pay, Cash App, Zelle, and Venmo.***
      </p>
    </div>
  );
};

export default BookingForm;
