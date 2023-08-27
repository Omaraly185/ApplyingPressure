import React, { useState } from "react";
import "./NetflixReel.scss";
import car1 from "./carPictures/car1.jpg";
import car2 from "./carPictures/car2.jpg";
import car3 from "./carPictures/car3.jpg";
import car4 from "./carPictures/car4.jpg";
import car5 from "./carPictures/car5.jpg";
import car6 from "./carPictures/car6.jpg";
import car7 from "./carPictures/car7.jpg";
import car8 from "./carPictures/car8.jpg";
import car9 from "./carPictures/car9.jpg";
import car10 from "./carPictures/car10.jpg";
import car11 from "./carPictures/car11.jpg";
import car12 from "./carPictures/car12.jpg";
import car13 from "./carPictures/car13.jpg";
import car14 from "./carPictures/car14.jpg";
import car15 from "./carPictures/car15.jpg";
import car16 from "./carPictures/car16.jpg";
import car17 from "./carPictures/car17.jpg";
import car18 from "./carPictures/car18.jpg";

const NetflixReel = () => {
  const [expandedImage, setExpandedImage] = useState(null);

  return (
    <div>
      <h1>Our Work</h1>
      <div className="wrapper">
        {/* Section 1 */}
        <section id="section1">
          <a href="#section3" className="arrow__btn">
            ‹
          </a>
          <div className="item">
            <img
              src={car1}
              alt="Describe Image"
              onClick={() => setExpandedImage(car1)}
            />
          </div>
          <div className="item">
            <img
              src={car2}
              alt="Describe Image"
              onClick={() => setExpandedImage(car2)}
            />
          </div>
          <div className="item">
            <img
              src={car3}
              alt="Describe Image"
              onClick={() => setExpandedImage(car3)}
            />
          </div>
          <div className="item">
            <img
              src={car18}
              alt="Describe Image"
              onClick={() => setExpandedImage(car18)}
            />
          </div>
          <div className="item">
            <img
              src={car17}
              alt="Describe Image"
              onClick={() => setExpandedImage(car17)}
            />
          </div>
          <a href="#section2" className="arrow__btn">
            ›
          </a>
        </section>

        {/* Section 2 */}
        <section id="section2">
          <a href="#section1" className="arrow__btn">
            ‹
          </a>
          <div className="item">
            <img
              src={car4}
              alt="Describe Image"
              onClick={() => setExpandedImage(car4)}
            />
          </div>
          <div className="item">
            <img
              src={car5}
              alt="Describe Image"
              onClick={() => setExpandedImage(car5)}
            />
          </div>
          <div className="item">
            <img
              src={car6}
              alt="Describe Image"
              onClick={() => setExpandedImage(car6)}
            />
          </div>
          <div className="item">
            <img
              src={car7}
              alt="Describe Image"
              onClick={() => setExpandedImage(car7)}
            />
          </div>
          <div className="item">
            <img
              src={car8}
              alt="Describe Image"
              onClick={() => setExpandedImage(car8)}
            />
          </div>
          <a href="#section3" className="arrow__btn">
            ›
          </a>
        </section>

        {/* Section 3 */}
        <section id="section3">
          <a href="#section2" className="arrow__btn">
            ‹
          </a>
          <div className="item">
            <img
              src={car9}
              alt="Describe Image"
              onClick={() => setExpandedImage(car9)}
            />
          </div>
          <div className="item">
            <img
              src={car10}
              alt="Describe Image"
              onClick={() => setExpandedImage(car10)}
            />
          </div>
          <div className="item">
            <img
              src={car11}
              alt="Describe Image"
              onClick={() => setExpandedImage(car11)}
            />
          </div>
          <div className="item">
            <img
              src={car12}
              alt="Describe Image"
              onClick={() => setExpandedImage(car12)}
            />
          </div>
          <div className="item">
            <img
              src={car13}
              alt="Describe Image"
              onClick={() => setExpandedImage(car13)}
            />
          </div>
          <a href="#section1" className="arrow__btn">
            ›
          </a>
        </section>
      </div>

      {/* Modal */}
      {expandedImage && (
        <div
          className="modal-background"
          onClick={() => setExpandedImage(null)}
        >
          <div className="modal-content">
            <img src={expandedImage} alt="Expanded" />
          </div>
        </div>
      )}
    </div>
  );
};

export default NetflixReel;
