import React from "react";
import Header from "../../Component/Header";
import "./ContactUs.css";
import { useState } from "react";
import AP from "./AP.png";
import Instgram from "./Instagram.svg";
import FaceBook from "./Facebook.svg";
import Tiktok from "./Tiktok.svg";
import Twitter from "./Twitter.svg";
import Phone from "./phone.png";

function ContactUs() {
  const imgStyle = {
    marginTop: -25,
  };
  const imgeStyle = {
    maxWidth: 25,
  };
  return (
    <>
      <div className="myCustomHeight backGround-Img">
        <Header />
        <div className="Section2">
          <div className="controller-img">
            <img src={AP} className="ContactImg" />
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
                <img style={imgeStyle} src={Instgram} />
              </div>
              <div style={imgStyle}>Instagram</div>
            </a>
            <a
              href="https://www.facebook.com/Applyingpressurenyc"
              className="game-link facebook"
            >
              <div className="svgLogo">
                <img max-width="25px" src={FaceBook} />
              </div>
              <div style={imgStyle}>Facebook</div>
            </a>
            <a
              href="https://www.tiktok.com/@applyingpressurenyc"
              className="game-link tiktok"
            >
              <div className="svgLogo noboxing">
                <img max-width="25px" src={Tiktok} />
              </div>
              <div className="boxing" style={imgStyle}>
                TikTok
              </div>
            </a>
            {/* #81fb6b */}
            <a href="tel:7186353758" className="game-link phoneNumber">
              <div className="svgLogo">
                <img width="25px" src={Phone} />
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
