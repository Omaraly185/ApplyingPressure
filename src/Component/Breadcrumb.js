import React from "react";
import Link from "next/link";
import { trackButtonClick } from "../utils/analytics";

const Breadcrumb = ({ items }) => {
  const handleBreadcrumbClick = (itemName) => {
    trackButtonClick(`Breadcrumb - ${itemName}`, window.location.pathname);
  };

  return (
    <nav aria-label="Breadcrumb" className="breadcrumb-container">
      <ol className="breadcrumb-list">
        {items.map((item, index) => (
          <li key={index} className="breadcrumb-item">
            {index < items.length - 1 ? (
              <>
                <Link 
                  href={item.url} 
                  className="breadcrumb-link"
                  onClick={() => handleBreadcrumbClick(item.name)}
                >
                  {item.name}
                </Link>
                <span className="breadcrumb-separator" aria-hidden="true">
                  {" / "}
                </span>
              </>
            ) : (
              <span className="breadcrumb-current" aria-current="page">
                {item.name}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;

