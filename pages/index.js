import React from "react";
import Head from "next/head";
import Header from "../src/Component/Header";
import HomeForm from "../src/Pages/Home/HomeForm";
import AboutUs from "../src/Pages/Home/AboutUs/AboutUs";
import TestimonialSlider from "../src/Pages/Home/testimonials/testimonial";
import CallToAction from "../src/Pages/Home/CallToAction/CallToAction";
import Footer from "../src/Component/Footer";
import { homePageSEO } from "../src/Component/SEO";

export default function Home() {
  return (
    <>
      <Head>
        <title>{homePageSEO.title}</title>
        <meta name="description" content={homePageSEO.description} />
        <meta name="keywords" content={homePageSEO.keywords} />
        <meta property="og:title" content={homePageSEO.openGraph.title} />
        <meta
          property="og:description"
          content={homePageSEO.openGraph.description}
        />
        <meta property="og:type" content={homePageSEO.openGraph.type} />
        <meta property="og:url" content={homePageSEO.openGraph.url} />
        <meta property="og:image" content={homePageSEO.openGraph.image} />
        <meta
          property="og:site_name"
          content={homePageSEO.openGraph.siteName}
        />
        <meta name="twitter:card" content={homePageSEO.twitter.card} />
        <meta name="twitter:title" content={homePageSEO.twitter.title} />
        <meta
          name="twitter:description"
          content={homePageSEO.twitter.description}
        />
        <meta name="twitter:image" content={homePageSEO.twitter.image} />
        <link rel="canonical" href={homePageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(homePageSEO.structuredData),
          }}
        />
      </Head>
      <div
        style={{ backgroundColor: "black" }}
        className="fluid myCustomHeight fullPage"
      >
        <Header />
        <HomeForm />
        {/* Spacing section - optimized for performance while maintaining visual layout */}
        <div className="home-spacing-section"></div>
        <AboutUs />
        <TestimonialSlider />
        <CallToAction />
        <Footer />
      </div>
    </>
  );
}
