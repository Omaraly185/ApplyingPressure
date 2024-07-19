import React from "react";
import video1 from "./HomeVideo.mp4";
import "./home.css";
import Button from "../../Component/Button";

function HomeForm() {
  return (
    <main>
      <section className="content">
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Background video showing detailing service"
        >
          <source src={video1} type="video/mp4" />
        </video>
        <div className="parent">
          <header className="title">
            <h2>Applying</h2>
            <h1>Pressure</h1>
            <div className="tagline">
              <p className="letter-spacing">
                We wash and wax while you sit and relax!
              </p>
            </div>
            <Button />
          </header>
        </div>
      </section>
    </main>
  );
}

export default HomeForm;
