import { Html, Head, Main, NextScript } from "next/document";

export default function Document() {
  return (
    <Html lang="en">
      <Head>
        <meta name="google-site-verification" content="26a2dbd97c5957bf" />
        <meta
          name="apple-domain-verification"
          content="CPOVj8d9FxlBcN6d_ePxf786NwApV1fG72LR0Ijya2Y"
        />
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
        <link
          rel="preload"
          as="image"
          href="/images/About5.jpg"
          fetchPriority="high"
        />
        <link rel="icon" href="/APLogo.png" />
        <link rel="manifest" href="/manifest.json" />
        <link rel="apple-touch-icon" href="/APLogo.png" />
        <meta name="theme-color" content="#000000" />
      </Head>
      <body>
        <Main />
        <NextScript />
      </body>
    </Html>
  );
}
