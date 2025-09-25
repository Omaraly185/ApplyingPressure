// Structured Data configurations for different pages

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": "AutoRepair",
  "@id": "https://www.apdetailers.com/#organization",
  name: "Applying Pressure Mobile Detailing",
  alternateName: "AP Detailers",
  description:
    "Professional mobile car detailing services serving New York City, Long Island, and New Jersey. We come to you! Specializing in interior and exterior detailing, ceramic coating, and paint correction.",
  url: "https://www.apdetailers.com/",
  logo: "https://www.apdetailers.com/APLogo.png",
  image: "https://www.apdetailers.com/APLogo.png",
  telephone: "+1-929-528-5191",
  email: "applyingpressureaq@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "2065 Shore Blvd",
    addressLocality: "Astoria",
    addressRegion: "NY",
    postalCode: "11105",
    addressCountry: "US",
  },
  // Mobile service with business address
  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "40.7357",
      longitude: "-73.9564",
    },
    geoRadius: "50000", // 50km radius covering NYC, Long Island, and parts of NJ
  },
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
      sameAs: "https://en.wikipedia.org/wiki/New_York_City",
    },
    {
      "@type": "Place",
      name: "Long Island",
      sameAs: "https://en.wikipedia.org/wiki/Long_Island",
    },
    {
      "@type": "State",
      name: "New Jersey",
      sameAs: "https://en.wikipedia.org/wiki/New_Jersey",
    },
  ],
  serviceType: [
    "Mobile Car Detailing",
    "Ceramic Coating",
    "Paint Correction",
    "Interior Detailing",
    "Exterior Detailing",
  ],
  priceRange: "$$",
  openingHours: "Mo-Su 08:00-18:00",
  sameAs: [
    "https://www.facebook.com/Applyingpressurenyc/",
    "https://www.instagram.com/applyingpressurenyc/",
  ],
};

export const serviceSchema = (serviceName, serviceDescription, serviceUrl) => ({
  "@context": "https://schema.org",
  "@type": "Service",
  name: serviceName,
  description: serviceDescription,
  url: serviceUrl,
  provider: {
    "@type": "AutoRepair",
    name: "Applying Pressure Mobile Detailing",
    url: "https://www.apdetailers.com/",
  },
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
    },
    {
      "@type": "Place",
      name: "Long Island",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
  ],
  serviceType: serviceName,
});

export const ceramicCoatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ceramic Coating Services",
  description:
    "Professional ceramic coating application for cars in NYC, Long Island, and New Jersey. Long-lasting paint protection with hydrophobic properties.",
  url: "https://www.apdetailers.com/Ceramic-Coating",
  provider: {
    "@type": "AutoRepair",
    name: "Applying Pressure Mobile Detailing",
    url: "https://www.apdetailers.com/",
  },
  serviceType: "Ceramic Coating",
  category: "Automotive Services",
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
    },
    {
      "@type": "Place",
      name: "Long Island",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
  ],
  offers: {
    "@type": "Offer",
    description: "Professional ceramic coating services",
    availability: "https://schema.org/InStock",
  },
};

export const mobileDetailingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Mobile Car Detailing",
  description:
    "Professional mobile car detailing services that come to you in NYC, Long Island, and New Jersey. Interior and exterior detailing at your location.",
  url: "https://www.apdetailers.com/",
  provider: {
    "@type": "AutoRepair",
    name: "Applying Pressure Mobile Detailing",
    url: "https://www.apdetailers.com/",
  },
  serviceType: "Mobile Car Detailing",
  category: "Automotive Services",
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
    },
    {
      "@type": "Place",
      name: "Long Island",
    },
    {
      "@type": "State",
      name: "New Jersey",
    },
  ],
};

export const faqSchema = (faqItems) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqItems.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
});

export const breadcrumbSchema = (breadcrumbs) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: breadcrumbs.map((crumb, index) => ({
    "@type": "ListItem",
    position: index + 1,
    name: crumb.name,
    item: crumb.url,
  })),
});

// Enhanced local business schema with more specific location data
export const enhancedLocalBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoRepair", "LocalBusiness"],
  "@id": "https://www.apdetailers.com/#organization",
  name: "Applying Pressure Mobile Detailing",
  alternateName: ["AP Detailers", "Applying Pressure"],
  description:
    "Professional mobile car detailing services serving New York City, Long Island, and New Jersey. We come to you! Specializing in interior and exterior detailing, ceramic coating, and paint correction.",
  url: "https://www.apdetailers.com/",
  logo: {
    "@type": "ImageObject",
    url: "https://www.apdetailers.com/APLogo.png",
    width: "300",
    height: "300",
  },
  image: "https://www.apdetailers.com/APLogo.png",
  telephone: "+1-929-528-5191",
  email: "applyingpressureaq@gmail.com",
  address: {
    "@type": "PostalAddress",
    streetAddress: "20-65 Shore Blvd",
    addressLocality: "Astoria",
    addressRegion: "NY",
    postalCode: "11105",
    addressCountry: "US",
  },

  serviceArea: {
    "@type": "GeoCircle",
    geoMidpoint: {
      "@type": "GeoCoordinates",
      latitude: "40.7357",
      longitude: "-73.9564",
    },
    geoRadius: "50000", // 50km radius
  },

  // Detailed area served
  areaServed: [
    {
      "@type": "City",
      name: "New York City",
      sameAs: "https://en.wikipedia.org/wiki/New_York_City",
      containedInPlace: {
        "@type": "State",
        name: "New York",
      },
    },
    {
      "@type": "Place",
      name: "Manhattan",
      containedInPlace: {
        "@type": "City",
        name: "New York City",
      },
    },
    {
      "@type": "Place",
      name: "Brooklyn",
      containedInPlace: {
        "@type": "City",
        name: "New York City",
      },
    },
    {
      "@type": "Place",
      name: "Queens",
      containedInPlace: {
        "@type": "City",
        name: "New York City",
      },
    },
    {
      "@type": "Place",
      name: "Bronx",
      containedInPlace: {
        "@type": "City",
        name: "New York City",
      },
    },
    {
      "@type": "Place",
      name: "Staten Island",
      containedInPlace: {
        "@type": "City",
        name: "New York City",
      },
    },
    {
      "@type": "Place",
      name: "Long Island",
      sameAs: "https://en.wikipedia.org/wiki/Long_Island",
      containedInPlace: {
        "@type": "State",
        name: "New York",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Nassau County",
      containedInPlace: {
        "@type": "Place",
        name: "Long Island",
      },
    },
    {
      "@type": "AdministrativeArea",
      name: "Suffolk County",
      containedInPlace: {
        "@type": "Place",
        name: "Long Island",
      },
    },
    {
      "@type": "State",
      name: "New Jersey",
      sameAs: "https://en.wikipedia.org/wiki/New_Jersey",
    },
  ],

  // Services offered
  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile Car Detailing Services",
    itemListElement: [
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Mobile Car Detailing",
          description:
            "Complete interior and exterior car detailing at your location",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ceramic Coating",
          description:
            "Professional ceramic coating application for long-lasting paint protection",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Paint Correction",
          description:
            "Professional paint correction to remove swirls and scratches",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Interior Detailing",
          description: "Deep cleaning and protection of vehicle interior",
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Exterior Detailing",
          description: "Complete exterior washing, polishing, and protection",
        },
      },
    ],
  },

  serviceType: [
    "Mobile Car Detailing",
    "Ceramic Coating",
    "Paint Correction",
    "Interior Detailing",
    "Exterior Detailing",
    "Car Washing",
    "Auto Detailing",
    "Car Detailing",
  ],

  priceRange: "$$",
  openingHours: "Mo-Su 08:00-18:00",

  // Business attributes
  paymentAccepted: ["Cash", "Credit Card", "Debit Card"],
  currenciesAccepted: "USD",

  sameAs: [
    "https://www.facebook.com/Applyingpressurenyc/",
    "https://www.instagram.com/applyingpressurenyc/",
  ],
};

// Review schema for testimonials/reviews
export const reviewSchema = (reviews) => ({
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "Applying Pressure Mobile Detailing",
  aggregateRating: {
    "@type": "AggregateRating",
    ratingValue: "5.0",
    reviewCount: reviews?.length || "50",
    bestRating: "5",
    worstRating: "1",
  },
  review:
    reviews?.map((review) => ({
      "@type": "Review",
      author: {
        "@type": "Person",
        name: review.author,
      },
      reviewRating: {
        "@type": "Rating",
        ratingValue: review.rating,
        bestRating: "5",
        worstRating: "1",
      },
      reviewBody: review.text,
      datePublished: review.date,
    })) || [],
});
