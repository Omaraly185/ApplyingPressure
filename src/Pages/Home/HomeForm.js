import React from "react";

import Button from "../../Component/Button";

function HomeForm() {
  return (
    <main>
      <section className="content" style={{ marginTop: "80px" }}>
        <video
          autoPlay
          loop
          muted
          playsInline
          aria-label="Background video showing detailing service"
        >
          <source src="/Homevideo.mp4" type="video/mp4" />
        </video>
        <div className="parent">
          <header className="title">
            <h1>Applying<br />Pressure <span className="mobile-detailing">Mobile Detailing</span></h1>
            <div className="tagline">
            </div>
            <Button />
          </header>
        </div>
      </section>
    </main>
  );
}

export default HomeForm;
