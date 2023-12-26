import { useEffect } from "react";

const FacebookPixel = () => {
  useEffect(() => {
    const script = document.createElement("script");
    script.innerHTML = `
      !function(f,b,e,v,n,t,s)
      {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
      n.callMethod.apply(n,arguments):n.queue.push(arguments)};
      if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
      n.queue=[];t=b.createElement(e);t.async=!0;
      t.src='https://connect.facebook.net/en_US/fbevents.js';
      s=b.getElementsByTagName(e)[0];
      s.parentNode.insertBefore(t,s)}(window, document,'script');
      fbq('init', '320731947534964'); // Your Facebook Pixel ID
      fbq('track', 'PageView');
    `;
    document.head.appendChild(script);
  }, []);

  return null;
};

export default FacebookPixel;
