import React from "react";
import Header from "../../Component/Header";
import "./home.css";
import HomeForm from "./HomeForm";
import AboutUs from "./AboutUs/AboutUs";
import TestimonialSlider from "./testimonials/testimonial";
import CallToAction from "./CallToAction/CallToAction";
import Footer from "../../Component/Footer";
import { SEOComponent, homePageSEO } from "../../Component/SEO";

function Home() {
  return (
    <>
      <SEOComponent {...homePageSEO} />
      <div
        style={{ backgroundColor: "black" }}
        className="fluid myCustomHeight fullPage"
      >
        <Header />
        <HomeForm />
        <div></div>
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />{" "}
        <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br /> <br />
        <br /> <br />
        <AboutUs />
        <TestimonialSlider />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}

export default Home;
