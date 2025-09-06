import { useEffect } from "react";
import Head from "next/head";

export default function Review() {
  useEffect(() => {
    window.location.href =
      "https://search.google.com/local/writereview?placeid=ChIJZfCgNDa1AaUReXadfzxTu7g";
  }, []);

  return (
    <>
      <Head>
        <title>Leave a Review - Applying Pressure Mobile Detailing</title>
        <meta name="description" content="Leave a review for Applying Pressure Mobile Detailing" />
        <meta name="robots" content="noindex, nofollow" />
      </Head>
      <div>
        <p>Redirecting to Google Reviews...</p>
      </div>
    </>
  );
}
