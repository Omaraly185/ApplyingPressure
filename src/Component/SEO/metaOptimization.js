// Advanced meta tag configurations for different platforms and devices

export const generateMetaTags = (pageConfig) => {
  const {
    title,
    description,
    keywords,
    canonicalUrl,
    ogImage = "https://www.apdetailers.com/APLogo.png",
    ogType = "website"
  } = pageConfig;

  return {
    // Basic SEO
    title,
    description,
    keywords,
    canonical: canonicalUrl,
    
    // Open Graph (Facebook, LinkedIn, etc.)
    openGraph: {
      title,
      description,
      url: canonicalUrl,
      type: ogType,
      siteName: "Applying Pressure Mobile Detailing",
      locale: "en_US",
      images: [
        {
          url: ogImage,
          width: 1200,
          height: 630,
          alt: "Applying Pressure Mobile Detailing Logo"
        }
      ]
    },
    
    // Twitter Cards (keeping for general social sharing)
    twitter: {
      card: "summary_large_image",
      title,
      description,
      image: ogImage
    },
    
    // Mobile optimization
    viewport: "width=device-width, initial-scale=1.0, maximum-scale=5.0",
    
    // Apple specific
    appleMobileWebAppCapable: "yes",
    appleMobileWebAppStatusBarStyle: "black-translucent",
    appleMobileWebAppTitle: "AP Detailers",
    
    // Microsoft specific
    msApplicationTileColor: "#000000",
    msApplicationTileImage: ogImage,
    
    // Additional meta tags
    robots: "index,follow,max-image-preview:large,max-snippet:-1,max-video-preview:-1",
    googlebot: "index,follow",
    bingbot: "index,follow",
    
    // Language and region
    language: "en-US",
    geo: {
      region: "US-NY",
      placename: "New York City",
      position: "40.7357;-73.9564",
      ICBM: "40.7357, -73.9564"
    }
  };
};

// Location-specific meta tag variations
export const locationMetaTags = {
  nyc: {
    keywords: "mobile detailing NYC, car detailing New York City, mobile car wash NYC, auto detailing Manhattan, car detailing Brooklyn, mobile detailing Queens, car wash Bronx, mobile auto detailing NYC",
    geoRegion: "US-NY",
    geoPlacename: "New York City"
  },
  
  longIsland: {
    keywords: "mobile detailing Long Island, car detailing Nassau County, mobile detailing Suffolk County, auto detailing Hempstead, car detailing Huntington, mobile car wash Long Island",
    geoRegion: "US-NY", 
    geoPlacename: "Long Island"
  },
  
  newJersey: {
    keywords: "mobile detailing New Jersey, car detailing NJ, mobile car wash New Jersey, auto detailing Bergen County, car detailing Essex County, mobile detailing Hudson County",
    geoRegion: "US-NJ",
    geoPlacename: "New Jersey"
  }
};

// Service-specific meta tag variations
export const serviceMetaTags = {
  mobileDetailing: {
    keywords: "mobile detailing, mobile car wash, mobile auto detailing, car detailing at home, mobile vehicle cleaning, on-site car detailing",
    serviceType: "Mobile Car Detailing"
  },
  
  ceramicCoating: {
    keywords: "ceramic coating, paint protection, ceramic car coating, nano coating, paint sealant, car protection coating, hydrophobic coating",
    serviceType: "Ceramic Coating"
  },
  
  paintCorrection: {
    keywords: "paint correction, scratch removal, swirl removal, paint polishing, car paint restoration, automotive paint repair",
    serviceType: "Paint Correction"
  },
  
  interiorDetailing: {
    keywords: "interior detailing, car interior cleaning, upholstery cleaning, leather conditioning, dashboard cleaning, carpet cleaning",
    serviceType: "Interior Detailing"
  },
  
  exteriorDetailing: {
    keywords: "exterior detailing, car washing, waxing, polishing, tire cleaning, wheel cleaning, exterior protection",
    serviceType: "Exterior Detailing"
  }
};

// Generate combined keywords for location + service combinations
export const generateLocationServiceKeywords = (location, service) => {
  const locationKeys = locationMetaTags[location]?.keywords || "";
  const serviceKeys = serviceMetaTags[service]?.keywords || "";
  
  return `${serviceKeys}, ${locationKeys}`.replace(/^,\s*/, "").replace(/,\s*$/, "");
};

// Schema.org markup helpers
export const generateSchemaMarkup = (type, data) => {
  const baseSchema = {
    "@context": "https://schema.org",
    "@type": type,
    ...data
  };
  
  return JSON.stringify(baseSchema, null, 2);
};
