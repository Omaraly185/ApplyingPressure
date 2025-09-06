import React from "react";
import Head from "next/head";
import CeramicCoating from "../src/Pages/Ceramic-Coating/ceramic-coating";
import { ceramicCoatingPageSEO } from "../src/Component/SEO";

export default function CeramicCoatingPage() {
  return (
    <>
      <Head>
        <title>{ceramicCoatingPageSEO.title}</title>
        <meta name="description" content={ceramicCoatingPageSEO.description} />
        <meta name="keywords" content={ceramicCoatingPageSEO.keywords} />
        <meta property="og:title" content={ceramicCoatingPageSEO.openGraph.title} />
        <meta property="og:description" content={ceramicCoatingPageSEO.openGraph.description} />
        <meta property="og:type" content={ceramicCoatingPageSEO.openGraph.type} />
        <meta property="og:url" content={ceramicCoatingPageSEO.openGraph.url} />
        <meta property="og:image" content={ceramicCoatingPageSEO.openGraph.image} />
        <meta property="og:site_name" content={ceramicCoatingPageSEO.openGraph.siteName} />
        <meta name="twitter:card" content={ceramicCoatingPageSEO.twitter.card} />
        <meta name="twitter:title" content={ceramicCoatingPageSEO.twitter.title} />
        <meta name="twitter:description" content={ceramicCoatingPageSEO.twitter.description} />
        <meta name="twitter:image" content={ceramicCoatingPageSEO.twitter.image} />
        <link rel="canonical" href={ceramicCoatingPageSEO.canonical} />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(ceramicCoatingPageSEO.structuredData),
          }}
        />
      </Head>
      <CeramicCoating />
    </>
  );
}
