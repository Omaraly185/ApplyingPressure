import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        {/* Google verification */}
        {/* Preconnect to external domains */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="true"
        />
        <link
          rel="preconnect"
          href="https://applyingpressure-api-production.up.railway.app"
        />

        {/* Favicon and manifest */}
        <link rel="icon" href="/APLogo.png" />
        <link rel="manifest" href="/manifest.json" />

        {/* Apple touch icon */}
        <link rel="apple-touch-icon" href="/APLogo.png" />

        {/* Theme color */}
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
