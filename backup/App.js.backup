import React, { useEffect, useState } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import { HelmetProvider } from "react-helmet-async";
import Home from "./Pages/Home/Home";
import { v4 as uuidv4 } from "uuid";
import ScrollToTop from "./Component/ScrollTotop";
import "./App.css";
import ContactUs from "./Pages/ContactUs/ContactUs";
import MonthlySub from "./Pages/Monthly/MonthlySub";
import CeramicCoating from "./Pages/Ceramic-Coating/ceramic-coating";
import PrivacyPolicy from "./Pages/Privacy-Policy/privacy-policy";
import TermsAndConditions from "./Pages/Privacy-Policy/terms-condtions";

const RedirectToGoogle = () => {
  useEffect(() => {
    window.location.href =
      "https://search.google.com/local/writereview?placeid=ChIJZfCgNDa1AaUReXadfzxTu7g";
  }, []);
  return null;
};

function App() {
  const [sessionId, setSessionId] = useState(
    localStorage.getItem("session_id")
  );

  useEffect(() => {
    if (!sessionId) {
      const newSessionId = uuidv4();
      localStorage.setItem("session_id", newSessionId);
      setSessionId(newSessionId);
    }
  }, [sessionId]);

  return (
    <HelmetProvider>
      <div className="App">
        <ScrollToTop />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route exact path="/Book_Now" element={<MonthlySub />} />
          <Route exact path="/Ceramic-Coating" element={<CeramicCoating />} />
          <Route exact path="/ContactUs" element={<ContactUs />} />
          <Route exact path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route
            exact
            path="/terms-conditions"
            element={<TermsAndConditions />}
          />
          <Route exact path="/review" element={<RedirectToGoogle />} />
          {/* Catch-all route - redirects any unmatched routes to home */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </div>
    </HelmetProvider>
  );
}

export default App;
