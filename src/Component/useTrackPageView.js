import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const useTrackPageView = () => {
  const location = useLocation();

  useEffect(() => {
    // eslint-disable-next-line no-undef
    fbq("track", "PageView"); // Track page view with Facebook Pixel
  }, [location]); // Triggered on location change
};

export default useTrackPageView;
