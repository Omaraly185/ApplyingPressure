import { Provider } from "react-redux";
import { HelmetProvider } from "react-helmet-async";
import store from "../src/redux/store";
import ScrollToTop from "../src/Component/ScrollTotop";

// Critical CSS - loaded immediately for LCP optimization
import "../src/index.css";
import "../src/App.css";
import "../src/Component/Header.css";
import "../src/Component/Button.css";
import "../src/Pages/Home/AboutUs/AboutUs.scss"; // Critical: Contains LCP element styles

// Third-party CSS that's used across multiple pages
import "react-toastify/dist/ReactToastify.css";

// Home page CSS (loaded immediately since it's the main page)
import "../src/Pages/Home/home.css";
import "../src/Pages/Home/CallToAction/CallToAction.css";
import "../src/Pages/Home/testimonials/testimonal.css";

// Other page CSS (can be loaded after initial render)
import "../src/Component/footer.css";
import "../src/Pages/Monthly/MonthlySub.scss";
import "react-datepicker/dist/react-datepicker.css";
import "../src/Pages/PaintCorrection/PaintCorrection.scss";
import "../src/Pages/CeramicCoating/ceramic-coating.scss";
import "../src/Pages/Contact/ContactUs.css";
import "../src/Pages/Privacy-Policy/PrivacyPolicy.css";
import "../src/Pages/Privacy-Policy/TermsAndConditions.css";

function MyApp({ Component, pageProps }) {
  return (
    <Provider store={store}>
      <HelmetProvider>
        <div className="App">
          <ScrollToTop />
          <Component {...pageProps} />
        </div>
      </HelmetProvider>
    </Provider>
  );
}

export default MyApp;
