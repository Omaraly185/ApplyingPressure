import {
  enhancedLocalBusinessSchema,
  ceramicCoatingSchema,
  mobileDetailingSchema,
  serviceSchema,
  breadcrumbSchema,
  faqSchema,
} from "./structuredData";
import { mobileDetailingFAQs, ceramicCoatingFAQs } from "./faqData";

export const homePageSEO = {
  title: "Mobile Car Detailing NYC, Long Island & NJ | Applying Pressure",
  description:
    "Professional mobile car detailing serving NYC, Long Island & New Jersey. Interior/exterior detailing, ceramic coating, paint correction. We come to you! Book online today.",
  keywords:
    "mobile detailing NYC, car detailing Long Island, mobile detailing New Jersey, car detailing New York City, mobile car wash NYC, auto detailing Manhattan, car detailing Brooklyn, mobile detailing Queens, mobile detailing Nassau County, mobile detailing Suffolk County",
  canonicalUrl: "https://www.apdetailers.com/",
  structuredData: [
    enhancedLocalBusinessSchema,
    mobileDetailingSchema,
    faqSchema(mobileDetailingFAQs),
  ],
};

export const ceramicCoatingPageSEO = {
  title:
    "Ceramic Coating NYC, Long Island & NJ | Professional Paint Protection",
  description:
    "Premium ceramic coating services in NYC, Long Island & New Jersey. Long-lasting paint protection, hydrophobic coating, UV protection. Mobile service - we come to you!",
  keywords:
    "ceramic coating NYC, ceramic coating Long Island, ceramic coating New Jersey, paint protection NYC, ceramic coating Manhattan, ceramic coating Brooklyn, ceramic coating Queens, ceramic coating Nassau County, ceramic coating Suffolk County",
  canonicalUrl: "https://www.apdetailers.com/Ceramic-Coating",
  structuredData: [
    ceramicCoatingSchema,
    faqSchema(ceramicCoatingFAQs),
    breadcrumbSchema([
      { name: "Home", url: "https://www.apdetailers.com/" },
      {
        name: "Ceramic Coating",
        url: "https://www.apdetailers.com/Ceramic-Coating",
      },
    ]),
  ],
};

export const bookingPageSEO = {
  title: "Book Mobile Detailing NYC, Long Island & NJ | Online Booking",
  description:
    "Book professional mobile car detailing services in NYC, Long Island & New Jersey. Easy online booking, flexible scheduling. Interior, exterior, ceramic coating available.",
  keywords:
    "book mobile detailing NYC, book mobile detailing Long Island, schedule car detailing New York, mobile detailing booking NYC, car wash appointment NYC, auto detailing booking Manhattan, mobile detailing Nassau County",
  canonicalUrl: "https://www.apdetailers.com/Book_Now",
  structuredData: [
    serviceSchema(
      "Mobile Car Detailing Booking",
      "Online booking for professional mobile car detailing services in NYC, Long Island, and New Jersey",
      "https://www.apdetailers.com/Book_Now"
    ),
    breadcrumbSchema([
      { name: "Home", url: "https://www.apdetailers.com/" },
      { name: "Book Now", url: "https://www.apdetailers.com/Book_Now" },
    ]),
  ],
};

export const contactPageSEO = {
  title: "Contact Applying Pressure Mobile Detailing | NYC, Long Island & NJ",
  description:
    "Contact Applying Pressure for professional mobile car detailing in NYC, Long Island & New Jersey. Get quotes, schedule services, or ask questions. We come to you!",
  keywords:
    "contact mobile detailing NYC, contact mobile detailing Long Island, car detailing contact New York, mobile detailing phone number NYC, auto detailing contact Manhattan, mobile detailing contact Nassau County",
  canonicalUrl: "https://www.apdetailers.com/ContactUs",
  structuredData: [
    breadcrumbSchema([
      { name: "Home", url: "https://www.apdetailers.com/" },
      { name: "Contact Us", url: "https://www.apdetailers.com/ContactUs" },
    ]),
  ],
};

export const privacyPolicySEO = {
  title: "Privacy Policy | Applying Pressure Mobile Detailing",
  description:
    "Privacy policy for Applying Pressure Mobile Detailing. Learn how we protect your personal information and data.",
  keywords: "privacy policy, data protection, mobile detailing privacy",
  canonicalUrl: "https://www.apdetailers.com/privacy-policy",
  noindex: false,
  structuredData: [
    breadcrumbSchema([
      { name: "Home", url: "https://www.apdetailers.com/" },
      {
        name: "Privacy Policy",
        url: "https://www.apdetailers.com/privacy-policy",
      },
    ]),
  ],
};

export const termsConditionsSEO = {
  title: "Terms & Conditions | Applying Pressure Mobile Detailing",
  description:
    "Terms and conditions for Applying Pressure Mobile Detailing services in NYC and New Jersey.",
  keywords: "terms conditions, mobile detailing terms, service agreement",
  canonicalUrl: "https://www.apdetailers.com/terms-conditions",
  noindex: false, // Keep indexed for transparency
  structuredData: [
    breadcrumbSchema([
      { name: "Home", url: "https://www.apdetailers.com/" },
      {
        name: "Terms & Conditions",
        url: "https://www.apdetailers.com/terms-conditions",
      },
    ]),
  ],
};
