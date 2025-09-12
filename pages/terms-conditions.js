import React from "react";
import Head from "next/head";
import TermsAndConditions from "../src/Pages/Privacy-Policy/terms-condtions";
import Footer from "../src/Component/Footer";
import { termsConditionsPageSEO } from "../src/Component/SEO";

export default function TermsConditionsPage() {
  return (
    <>
      <Head>
        <title>{termsConditionsPageSEO.title}</title>
        <meta name="description" content={termsConditionsPageSEO.description} />
        <meta name="keywords" content={termsConditionsPageSEO.keywords} />
        <meta property="og:title" content={termsConditionsPageSEO.openGraph.title} />
        <meta property="og:description" content={termsConditionsPageSEO.openGraph.description} />
        <meta property="og:type" content={termsConditionsPageSEO.openGraph.type} />
        <meta property="og:url" content={termsConditionsPageSEO.openGraph.url} />
        <meta property="og:image" content={termsConditionsPageSEO.openGraph.image} />
        <meta property="og:site_name" content={termsConditionsPageSEO.openGraph.siteName} />
        <meta name="twitter:card" content={termsConditionsPageSEO.twitter.card} />
        <meta name="twitter:title" content={termsConditionsPageSEO.twitter.title} />
        <meta name="twitter:description" content={termsConditionsPageSEO.twitter.description} />
        <meta name="twitter:image" content={termsConditionsPageSEO.twitter.image} />
        <link rel="canonical" href={termsConditionsPageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(termsConditionsPageSEO.structuredData),
          }}
        />
      </Head>
      <TermsAndConditions />
      <Footer />
    </>
  );
}
