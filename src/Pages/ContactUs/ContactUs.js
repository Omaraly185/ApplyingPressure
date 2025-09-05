import React from "react";
import Header from "../../Component/Header";
import "./ContactUs.css";
import AP from "./AP.png";
import Instgram from "./Instagram.svg";
import FaceBook from "./Facebook.svg";
import Tiktok from "./Tiktok.svg";
import Phone from "./phone.png";
import { SEOComponent, contactPageSEO } from "../../Component/SEO";

function ContactUs() {
  const imgStyle = {
    marginTop: -25,
  };
  const imgeStyle = {
    maxWidth: 25,
  };
  return (
    <>
      <SEOComponent {...contactPageSEO} />
      <div className="customHeight backGround-Img">
        <Header />
        <div className="Section2" style={{ marginTop: "80px" }}>
          <div className="controller-img">
            <img
              src={AP}
              className="ContactImg"
              alt="Applying Pressure Mobile Detailing Logo"
            />
          </div>
          <div className="Bro">Find Us On Social Media</div>
        </div>
        <div className="Section2">
          <div className="games">
            <a
              href="https://www.instagram.com/applyingpressurenyc/"
              className="game-link instagram"
            >
              <div className="svgLogo">
                <img style={imgeStyle} src={Instgram} alt="Instagram icon" />
              </div>
              <div style={imgStyle}>Instagram</div>
            </a>
            <a
              href="https://www.facebook.com/Applyingpressurenyc"
              className="game-link facebook"
            >
              <div className="svgLogo">
                <img max-width="25px" src={FaceBook} alt="Facebook icon" />
              </div>
              <div style={imgStyle}>Facebook</div>
            </a>
            <a
              href="https://www.tiktok.com/@applyingpressurenyc"
              className="game-link tiktok"
            >
              <div className="svgLogo noboxing">
                <img max-width="25px" src={Tiktok} alt="TikTok icon" />
              </div>
              <div className="boxing" style={imgStyle}>
                TikTok
              </div>
            </a>
            {/* #81fb6b */}
            <a href="tel:+19295285191" className="game-link phoneNumber">
              <div className="svgLogo">
                <img width="25px" src={Phone} alt="Phone icon" />
              </div>
              <div style={imgStyle}>Call Us</div>
            </a>
          </div>
        </div>
      </div>
    </>
  );
}

export default ContactUs;
