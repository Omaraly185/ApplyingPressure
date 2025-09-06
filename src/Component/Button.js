import React from "react";
import Link from "next/link";

function Button() {
  return (
    <div className="container">
      <div className="btn">
        <Link href="/Book_Now">BOOK-NOW</Link>
      </div>
    </div>
  );
}

export default Button;
