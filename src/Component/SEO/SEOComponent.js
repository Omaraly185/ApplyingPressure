import React from 'react';
import { Helmet } from 'react-helmet-async';

const SEOComponent = ({
  title = "Applying Pressure Mobile Detailing - Professional Car Detailing NYC",
  description = "Professional mobile car detailing services in New York City and New Jersey. Interior & exterior detailing, ceramic coating, paint correction. Book online today!",
  keywords = "mobile detailing NYC, car detailing New York, ceramic coating NYC, auto detailing Manhattan, mobile car wash NYC, paint correction New York, car detailing Brooklyn, mobile detailing Queens, auto detailing Bronx, car wash NYC",
  canonicalUrl = "https://www.apdetailers.com/",
  ogTitle,
  ogDescription,
  ogImage = "https://www.apdetailers.com/APLogo.png",
  ogType = "website",
  twitterCard = "summary_large_image",
  structuredData,
  noindex = false,
  nofollow = false
}) => {
  const finalOgTitle = ogTitle || title;
  const finalOgDescription = ogDescription || description;
  
  const robotsContent = `${noindex ? 'noindex' : 'index'},${nofollow ? 'nofollow' : 'follow'}`;

  return (
    <Helmet>
      {/* Basic Meta Tags */}
      <title>{title}</title>
      <meta name="description" content={description} />
      <meta name="keywords" content={keywords} />
      <meta name="robots" content={robotsContent} />
      <link rel="canonical" href={canonicalUrl} />
      
      {/* Open Graph Meta Tags */}
      <meta property="og:title" content={finalOgTitle} />
      <meta property="og:description" content={finalOgDescription} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:url" content={canonicalUrl} />
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Applying Pressure Mobile Detailing" />
      <meta property="og:locale" content="en_US" />
      
      {/* Twitter Card Meta Tags (for general social sharing) */}
      <meta name="twitter:card" content={twitterCard} />
      <meta name="twitter:title" content={finalOgTitle} />
      <meta name="twitter:description" content={finalOgDescription} />
      <meta name="twitter:image" content={ogImage} />
      
      {/* Additional Meta Tags */}
      <meta name="author" content="Applying Pressure Mobile Detailing" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      <meta name="language" content="English" />
      <meta name="revisit-after" content="7 days" />
      
      {/* Geo Meta Tags for Local SEO */}
      <meta name="geo.region" content="US-NY" />
      <meta name="geo.placename" content="New York City" />
      <meta name="geo.position" content="40.7128;-74.0060" />
      <meta name="ICBM" content="40.7128, -74.0060" />
      
      {/* Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {JSON.stringify(structuredData)}
        </script>
      )}
    </Helmet>
  );
};

export default SEOComponent;
