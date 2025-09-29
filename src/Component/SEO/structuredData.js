// Structured Data configurations for different pages

export const localBusinessSchema = {
  "@context": "https://schema.org",
  "@type": ["AutoWash", "LocalBusiness"],
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
    streetAddress: "20-65 Shore Blvd",
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
  serviceOutput: "Clean and restored vehicle",
  provider: {
    "@type": "AutoWash",
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
  category: ["Mobile Detailing", "Car Detailing", "Auto Detailing"],
  additionalType: "https://schema.org/AutoWash",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
  },
});

export const ceramicCoatingSchema = {
  "@context": "https://schema.org",
  "@type": "Service",
  name: "Ceramic Coating Services",
  description:
    "Professional ceramic coating application for cars in NYC, Long Island, and New Jersey. Long-lasting paint protection with hydrophobic properties.",
  url: "https://www.apdetailers.com/Ceramic-Coating",
  serviceOutput: "Paint protection lasting up to 5 years",
  provider: {
    "@type": "AutoWash",
    name: "Applying Pressure Mobile Detailing",
    url: "https://www.apdetailers.com/",
  },
  category: [
    "Mobile Detailing",
    "Car Detailing",
    "Auto Detailing",
    "Vehicle Maintenance",
  ],
  additionalType: "https://schema.org/AutoWash",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
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
  serviceOutput: "Clean and restored vehicle at your location",
  provider: {
    "@type": "AutoWash",
    name: "Applying Pressure Mobile Detailing",
    url: "https://www.apdetailers.com/",
  },
  category: ["Mobile Detailing", "Car Detailing", "Auto Detailing"],
  additionalType: "https://schema.org/AutoWash",
  offers: {
    "@type": "Offer",
    availability: "https://schema.org/InStock",
    priceCurrency: "USD",
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
  "@type": ["AutoWash", "LocalBusiness"],
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

  geo: {
    "@type": "GeoCoordinates",
    latitude: "40.7357",
    longitude: "-73.9564",
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

  additionalType: [
    "https://schema.org/AutoWash",
    "https://schema.org/LocalBusiness",
  ],

  hasOfferCatalog: {
    "@type": "OfferCatalog",
    name: "Mobile Car Detailing Services",
    itemListElement: [
      // Interior Packages
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "SILVER Interior Package",
          description:
            "Complete interior detailing with vacuum, wipe down, and UV protection",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "GOLD Interior Package",
          description:
            "Deep interior cleaning with stain removal and odor elimination",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "PRESSURE Interior Package",
          description:
            "Premium interior detailing with deep cleaning and restoration",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      // Exterior Packages
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Standard Exterior Package",
          description: "Basic exterior wash with wheel cleaning and tire shine",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Exterior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Wash & Wax Package",
          description:
            "Exterior wash with wax protection and shine enhancement",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Exterior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Paint Enhancement Package",
          description: "Paint correction with decontamination and protection",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Paint Correction",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "One Step Paint Correction",
          description:
            "Single-stage paint correction to remove light swirls and scratches",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Paint Correction",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Two Step Paint Correction",
          description:
            "Multi-stage paint correction for maximum gloss and clarity",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Paint Correction",
          ],
        },
      },
      // Plus Services - Interior
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Flooring Deep Clean",
          description: "Deep clean and remove stains from vehicle flooring",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Headliner Cleaning",
          description: "Deep clean and remove stains from vehicle headliner",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Dog Hair Removal",
          description: "Specialized pet hair removal from vehicle interior",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Heavy Spills/Odor Removal",
          description: "Professional odor elimination and heavy stain removal",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Interior Detailing",
          ],
        },
      },
      // Plus Services - Exterior
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ceramic Coating",
          description:
            "Long-lasting paint protection with hydrophobic properties",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Ceramic Coating",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Engine Bay Cleaning",
          description:
            "Professional engine compartment cleaning and degreasing",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Engine Detailing",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Headlight Restoration",
          description: "Restore clarity and brightness to oxidized headlights",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Vehicle Maintenance",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Trim Restoration",
          description:
            "Restore faded plastic and rubber trim to original condition",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Vehicle Maintenance",
          ],
        },
      },
      {
        "@type": "Offer",
        itemOffered: {
          "@type": "Service",
          name: "Ceramic Sealant",
          description: "6-8 month paint protection sealant application",
          category: [
            "Mobile Detailing",
            "Car Detailing",
            "Auto Detailing",
            "Vehicle Maintenance",
          ],
        },
      },
    ],
  },

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
