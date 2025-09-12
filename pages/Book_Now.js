import React from "react";
import Head from "next/head";
import MonthlySub from "../src/Pages/Monthly/MonthlySub";
import Footer from "../src/Component/Footer";
import { bookingPageSEO } from "../src/Component/SEO";

export default function BookNow() {
  return (
    <>
      <Head>
        <title>{bookingPageSEO.title}</title>
        <meta name="description" content={bookingPageSEO.description} />
        <meta name="keywords" content={bookingPageSEO.keywords} />
        <meta property="og:title" content={bookingPageSEO.openGraph.title} />
        <meta property="og:description" content={bookingPageSEO.openGraph.description} />
        <meta property="og:type" content={bookingPageSEO.openGraph.type} />
        <meta property="og:url" content={bookingPageSEO.openGraph.url} />
        <meta property="og:image" content={bookingPageSEO.openGraph.image} />
        <meta property="og:site_name" content={bookingPageSEO.openGraph.siteName} />
        <meta name="twitter:card" content={bookingPageSEO.twitter.card} />
        <meta name="twitter:title" content={bookingPageSEO.twitter.title} />
        <meta name="twitter:description" content={bookingPageSEO.twitter.description} />
        <meta name="twitter:image" content={bookingPageSEO.twitter.image} />
        <link rel="canonical" href={bookingPageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(bookingPageSEO.structuredData),
          }}
        />
      </Head>
      <MonthlySub />
      <Footer />
    </>
  );
}
