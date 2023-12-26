import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./Pages/Home/Home";
import BookNow from "./Pages/Book-Now/bookNow";
import FacebookPixel from "./Component/FacebookPixel";
import "./App.css";
import useTrackPageView from "./Component/useTrackPageView";
import ContactUs from "./Pages/ContactUs/ContactUs";
import SuccessPage from "./Success/SuccessPage";
import MonthlySub from "./Pages/Monthly/MonthlySub";

function App() {
  useTrackPageView();

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
