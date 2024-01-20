import React, { useEffect, useState } from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BookNow from "./Pages/Book-Now/bookNow";
import FacebookPixel from "./Component/FacebookPixel";
import { v4 as uuidv4 } from "uuid";
import "./App.css";
import useTrackPageView from "./Component/useTrackPageView";
import ContactUs from "./Pages/ContactUs/ContactUs";
import SuccessPage from "./Success/SuccessPage";
import MonthlySub from "./Pages/Monthly/MonthlySub";
import useTrackPageExit from "./Component/useTrackPageExit";

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

  useTrackPageView(sessionId);
  useTrackPageExit();

  return (
    <div className="App">
      <FacebookPixel />
      <Routes>
        <Route exact path="/" element={<Home />} />
        <Route exact path="/Book_Now" element={<BookNow />} />
        <Route exact path="/ContactUs" element={<ContactUs />} />
        <Route exact path="/Monthly" element={<MonthlySub />} />
        <Route exact path="/success" element={<SuccessPage />} />
      </Routes>
    </div>
  );
}

export default App;
