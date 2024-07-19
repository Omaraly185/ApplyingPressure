import React, { useState, useRef } from "react";
import Header from "../../Component/Header";
import "./ceramic-coating.scss";
import video1 from "./cc.mp4";

function CeramicCoating() {
  const formRef = useRef(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phoneNumber: "",
    carType: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const scrollToForm = () => {
    formRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const response = await fetch(
        "https://applyingpressure-api-production.up.railway.app/cermaic-quote",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        }
      );
      if (response.ok) {
        alert("Quote request submitted successfully!");
        setFormData({
          name: "",
          email: "",
          phoneNumber: "",
          carType: "",
        });
      } else {
        alert(
          "Failed to submit quote request. Please try again or give us a call."
        );
      }
    } catch (error) {
      console.error("Error submitting form:", error);
      alert("An error occurred. Please try again later.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="fluid myCustomHeight2 black-background">
      <Header />
      <div className="video-container">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Promotional video showing ceramic coating process"
        >
          <source src={video1} type="video/mp4" />
        </video>
        <div className="overlay">
          <div className="ceramic-coating-container">
            <h1 className="ceramic-coating">
              Ceramic Coating Experts: Shine & Protect Your Vehicle Today
            </h1>
            <div className="buttons">
              <button
                className="custom-button learn-more"
                onClick={scrollToForm}
              >
                Get a Quote
              </button>
              <a href="tel:7186353758" className="custom-button get-quote">
                Call (718) 635-3758
              </a>
            </div>
          </div>
        </div>
      </div>
      <div className="content-container">
        <div className="description-container">
          <h2 className="CeramicCoatingDescription">Why Choose Us?</h2>
          <p>
            We offer the best ceramic coating services to protect your vehicle
            and give it a high-gloss finish. Our experts use top-of-the-line
            products to ensure durability and shine.
          </p>
          <h2 className="CeramicCoatingDescription2">Why A Ceramic Coating?</h2>
          <ul>
            <li className="ceramic-coating-bullets">
              Durable Protection: Shields paint from dirt, grime, and road salt.
            </li>
            <li className="ceramic-coating-bullets">
              High-Gloss Finish: Enhances shine and vibrancy.
            </li>
            <li className="ceramic-coating-bullets">
              Hydrophobic: Repels water, making cleaning easier.
            </li>
            <li className="ceramic-coating-bullets">
              UV Protection: Prevents paint fading and oxidation.
            </li>
            <li className="ceramic-coating-bullets">
              Scratch Resistance: Guards against minor abrasions.
            </li>
            <li className="ceramic-coating-bullets">
              Chemical Resistant: Defends against stains and etching.
            </li>
            <li className="ceramic-coating-bullets">
              Easy Maintenance: Less frequent and simpler washes.
            </li>
            <li className="ceramic-coating-bullets">
              Cost-Effective: Reduces need for waxing and polishing.
            </li>
            <li className="ceramic-coating-bullets">
              Boosts Resale Value: Keeps your vehicle looking newer, longer.
            </li>
          </ul>
        </div>
        <div className="form-container" ref={formRef}>
          <div className="form">
            <p className="header">Request A Quote</p>
            <form style={{ width: "100%" }} onSubmit={handleSubmit}>
              <div className="fitem namecont">
                <label htmlFor="name" className="visually-hidden">
                  Name
                </label>
                <input
                  className="ceramic-input"
                  id="name"
                  name="name"
                  placeholder="Name"
                  value={formData.name}
                  onChange={handleChange}
                />
              </div>
              <div className="fitem emailcont">
                <label htmlFor="email" className="visually-hidden">
                  Email
                </label>
                <input
                  className="ceramic-input"
                  id="email"
                  name="email"
                  placeholder="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fitem phoneNumbercont">
                <label htmlFor="phoneNumber" className="visually-hidden">
                  Phone Number
                </label>
                <input
                  className="ceramic-input"
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  value={formData.phoneNumber}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="fitem carTypecont">
                <label htmlFor="carType" className="visually-hidden">
                  Car Type
                </label>
                <input
                  className="ceramic-input"
                  id="carType"
                  name="carType"
                  placeholder="Car Type"
                  value={formData.carType}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="buttoncont">
                <button
                  className="ReqQuote"
                  type="submit"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Submitting..." : "Submit"}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CeramicCoating;
