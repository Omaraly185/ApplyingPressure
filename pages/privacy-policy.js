import React from "react";
import Head from "next/head";
import PrivacyPolicy from "../src/Pages/Privacy-Policy/privacy-policy";
import { privacyPolicyPageSEO } from "../src/Component/SEO";

export default function PrivacyPolicyPage() {
  return (
    <>
      <Head>
        <title>{privacyPolicyPageSEO.title}</title>
        <meta name="description" content={privacyPolicyPageSEO.description} />
        <meta name="keywords" content={privacyPolicyPageSEO.keywords} />
        <meta property="og:title" content={privacyPolicyPageSEO.openGraph.title} />
        <meta property="og:description" content={privacyPolicyPageSEO.openGraph.description} />
        <meta property="og:type" content={privacyPolicyPageSEO.openGraph.type} />
        <meta property="og:url" content={privacyPolicyPageSEO.openGraph.url} />
        <meta property="og:image" content={privacyPolicyPageSEO.openGraph.image} />
        <meta property="og:site_name" content={privacyPolicyPageSEO.openGraph.siteName} />
        <meta name="twitter:card" content={privacyPolicyPageSEO.twitter.card} />
        <meta name="twitter:title" content={privacyPolicyPageSEO.twitter.title} />
        <meta name="twitter:description" content={privacyPolicyPageSEO.twitter.description} />
        <meta name="twitter:image" content={privacyPolicyPageSEO.twitter.image} />
        <link rel="canonical" href={privacyPolicyPageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(privacyPolicyPageSEO.structuredData),
          }}
        />
      </Head>
      <PrivacyPolicy />
    </>
  );
}
