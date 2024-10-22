import React, { useState } from "react";
import "./package.css";
import ReactCSSTransitionGroup from "react-addons-css-transition-group";
import Exterior from "./Exterior.jpeg";
import Interior from "./Interior.jpeg";
import Special from "./plusServices.png";

const Packages = () => {
  const [items, setItems] = useState([Exterior, Interior, Special]);
  const [current, setCurrent] = useState(0);
  const [isNext, setIsNext] = useState(true);

  const handlerPrev = () => {
    let index = current;
    let length = items.length;

    if (index < 1) {
      index = length;
    }

    index = index - 1;

    setCurrent(index);
    setIsNext(false);
  };

  const handlerNext = () => {
    let index = current;
    let length = items.length - 1;

    if (index === length) {
      index = -1;
    }

    index = index + 1;

    setCurrent(index);
    setIsNext(true);
  };

  const goToHistoryClick = (curIndex, index) => {
    let next = curIndex < index;
    setCurrent(index);
    setIsNext(next);
  };

  const handleNavigationButtonClick = (index) => {
    setCurrent(index);
    setIsNext(index > current);
  };

  const History = ({ current, items, changeSilde }) => {
    let modifiedItems = items.map((el, index) => {
      let name = index === current ? "active" : "";
      return (
        <li key={index}>
          <button
            className={name}
            onClick={() => changeSilde(current, index)}
          ></button>
        </li>
      );
    });

    return <ul>{modifiedItems}</ul>;
  };

  let index = current;
  let isnext = isNext;
  let src = items[index];

  return (
    <div className="myCustomHeight backborder-leftmm">
      <div className="navigation-buttons" style={{ marginLeft: 20 }}>
        <button
          className={`navigation-button ${current === 0 ? "active-nav" : ""}`}
          onClick={() => handleNavigationButtonClick(0)} // Go to Exterior
        >
          Exterior
        </button>
        <button
          className={`navigation-button ${current === 1 ? "active-nav" : ""}`}
          onClick={() => handleNavigationButtonClick(1)} // Go to Interior
        >
          Interior
        </button>
        <button
          className={`navigation-button ${current === 2 ? "active-nav" : ""}`}
          onClick={() => handleNavigationButtonClick(2)} // Go to Special
        >
          Plus Services
        </button>
      </div>
      <div className="carousel">
        <ReactCSSTransitionGroup
          transitionName={{
            enter: isnext ? "enter-next" : "enter-prev",
            enterActive: "enter-active",
            leave: "leave",
            leaveActive: isnext ? "leave-active-next" : "leave-active-prev",
          }}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="carousel_slide" key={index}>
            <img
              style={{ minWidth: "100%" }}
              src={src}
              alt={`Slide ${index}`}
            />
          </div>
        </ReactCSSTransitionGroup>
        <button
          className="carousel_control carousel_control__prev"
          onClick={handlerPrev}
        >
          <span />
        </button>
        <button
          className="carousel_control carousel_control__next"
          onClick={handlerNext}
        >
          <span />
        </button>
        <div className="carousel_history">
          <History
            current={current}
            items={items}
            changeSilde={goToHistoryClick}
          />
        </div>
      </div>
    </div>
  );
};

export default Packages;
