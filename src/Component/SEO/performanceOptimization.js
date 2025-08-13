// Performance optimization utilities for better SEO

// Lazy loading component for images
export const LazyImage = ({ src, alt, className, ...props }) => {
  return (
    <img
      src={src}
      alt={alt}
      className={className}
      loading="lazy"
      decoding="async"
      {...props}
    />
  );
};

// Preload critical resources
export const preloadCriticalResources = () => {
  // Preload critical fonts
  const fontPreloads = [
    "/fonts/American_Captain.otf",
    "/fonts/Anurati-Regular.otf",
  ];

  fontPreloads.forEach((font) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = font;
    link.as = "font";
    link.type = "font/otf";
    link.crossOrigin = "anonymous";
    document.head.appendChild(link);
  });

  // Preload critical images
  const imagePreloads = ["/APLogo.png"];

  imagePreloads.forEach((image) => {
    const link = document.createElement("link");
    link.rel = "preload";
    link.href = image;
    link.as = "image";
    document.head.appendChild(link);
  });
};

// Generate optimized meta tags for Core Web Vitals
export const coreWebVitalsOptimization = {
  // Largest Contentful Paint (LCP) optimization
  lcpOptimization: {
    preloadHero: true,
    optimizeImages: true,
    criticalCSS: true,
  },

  // First Input Delay (FID) optimization
  fidOptimization: {
    deferNonCriticalJS: true,
    optimizeEventHandlers: true,
    reduceJavaScript: true,
  },

  // Cumulative Layout Shift (CLS) optimization
  clsOptimization: {
    setImageDimensions: true,
    reserveSpaceForAds: true,
    avoidDynamicContent: true,
  },
};

// SEO-friendly URL generation
export const generateSEOFriendlyURL = (
  title,
  baseUrl = "https://www.apdetailers.com"
) => {
  const slug = title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "") // Remove special characters
    .replace(/\s+/g, "-") // Replace spaces with hyphens
    .replace(/-+/g, "-") // Replace multiple hyphens with single
    .trim("-"); // Remove leading/trailing hyphens

  return `${baseUrl}/${slug}`;
};

// Generate breadcrumb JSON-LD
export const generateBreadcrumbJSONLD = (breadcrumbs) => {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: crumb.url,
    })),
  };
};

// Mobile-first optimization helpers
export const mobileOptimization = {
  // Viewport meta tag optimization
  viewport:
    "width=device-width, initial-scale=1.0, maximum-scale=5.0, user-scalable=yes",

  // Touch optimization
  touchAction: "manipulation",

  // Mobile-specific meta tags
  appleMobileWebAppCapable: "yes",
  appleMobileWebAppStatusBarStyle: "black-translucent",
  appleMobileWebAppTitle: "AP Detailers",

  // Format detection
  formatDetection: "telephone=yes, email=yes, address=yes",
};

// Local SEO optimization helpers
export const localSEOOptimization = {
  // NAP (Name, Address, Phone) consistency
  businessInfo: {
    name: "Applying Pressure Mobile Detailing",
    phone: "+1-929-528-5191",
    email: "applyingpressureaq@gmail.com",
    serviceAreas: [
      "New York City, NY",
      "Long Island, NY",
      "Nassau County, NY",
      "Suffolk County, NY",
      "New Jersey",
    ],
  },

  // Local business schema
  generateLocalBusinessSchema: (additionalData = {}) => ({
    "@context": "https://schema.org",
    "@type": "AutoRepair",
    name: "Applying Pressure Mobile Detailing",
    telephone: "+1-929-528-5191",
    email: "applyingpressureaq@gmail.com",
    url: "https://www.apdetailers.com/",
    serviceType: "Mobile Car Detailing",
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
    ...additionalData,
  }),
};

// Analytics and tracking optimization
export const analyticsOptimization = {
  // Google Analytics 4 setup
  setupGA4: (measurementId) => {
    // Add GA4 script
    const script1 = document.createElement("script");
    script1.async = true;
    script1.src = `https://www.googletagmanager.com/gtag/js?id=${measurementId}`;
    document.head.appendChild(script1);

    // Add GA4 config
    const script2 = document.createElement("script");
    script2.innerHTML = `
      window.dataLayer = window.dataLayer || [];
      function gtag(){dataLayer.push(arguments);}
      gtag('js', new Date());
      gtag('config', '${measurementId}');
    `;
    document.head.appendChild(script2);
  },

  // Track Core Web Vitals
  trackCoreWebVitals: () => {
    // This would integrate with web-vitals library
    // to track LCP, FID, CLS metrics
  },
};
