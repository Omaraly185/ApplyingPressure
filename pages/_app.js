import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "../src/redux/store";
import ScrollToTop from "../src/Component/ScrollTotop";
import "../src/index.css";
import "../src/App.css";
import "../src/Component/Button.css";
import "../src/Component/Header.css";
import "../src/Component/footer.css";
import "../src/Pages/Home/home.css";
import "../src/Pages/Monthly/MonthlySub.scss";
import "react-datepicker/dist/react-datepicker.css";
import "react-toastify/dist/ReactToastify.css";
import "../src/Pages/CeramicCoating/ceramic-coating.scss";
import "../src/Pages/Contact/ContactUs.css";
import "../src/Pages/Privacy-Policy/PrivacyPolicy.css";
import "../src/Pages/Privacy-Policy/TermsAndConditions.css";
import "../src/Pages/Home/CallToAction/CallToAction.css";
import "../src/Pages/Home/AboutUs/AboutUs.scss";
import "../src/Pages/Home/testimonials/testimonal.css";
import "../src/Pages/PaintCorrection/PaintCorrection.scss";
import { useState } from "react";

function MyApp({ Component, pageProps }) {
  const [sessionId, setSessionId] = useState(null);

  return (
    <Provider store={store}>
      <HelmetProvider>
        <div className="App">
          <ScrollToTop />
          <Component {...pageProps} sessionId={sessionId} />
        </div>
      </HelmetProvider>
    </Provider>
  );
}

export default MyApp;
