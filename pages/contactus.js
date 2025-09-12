import React from "react";
import Head from "next/head";
import ContactUs from "../src/Pages/Contact/ContactUs";
import { contactPageSEO } from "../src/Component/SEO";

export default function ContactUsPage() {
  return (
    <>
      <Head>
        <title>{contactPageSEO.title}</title>
        <meta name="description" content={contactPageSEO.description} />
        <meta name="keywords" content={contactPageSEO.keywords} />
        <meta property="og:title" content={contactPageSEO.openGraph.title} />
        <meta
          property="og:description"
          content={contactPageSEO.openGraph.description}
        />
        <meta property="og:type" content={contactPageSEO.openGraph.type} />
        <meta property="og:url" content={contactPageSEO.openGraph.url} />
        <meta property="og:image" content={contactPageSEO.openGraph.image} />
        <meta
          property="og:site_name"
          content={contactPageSEO.openGraph.siteName}
        />
        <meta name="twitter:card" content={contactPageSEO.twitter.card} />
        <meta name="twitter:title" content={contactPageSEO.twitter.title} />
        <meta
          name="twitter:description"
          content={contactPageSEO.twitter.description}
        />
        <meta name="twitter:image" content={contactPageSEO.twitter.image} />
        <link rel="canonical" href={contactPageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(contactPageSEO.structuredData),
          }}
        />
      </Head>
      <ContactUs />
    </>
  );
}
