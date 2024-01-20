import { useEffect } from "react";

const useTrackPageExit = () => {
  useEffect(() => {
    const handleBeforeUnload = () => {
      const currentPageUrl = window.location.href;

      // eslint-disable-next-line no-undef
      fbq("trackCustom", `PageExit ${currentPageUrl}`, {
        url: currentPageUrl,
      });
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, []);
};

export default useTrackPageExit;
