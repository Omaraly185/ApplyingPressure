import React from "react";

import { SEOComponent, termsConditionsPageSEO } from "../../Component/SEO";

const TermsAndConditions = () => {
  return (
    <>
      <SEOComponent {...termsConditionsPageSEO} />
      <div className="terms-container">
      <h1 className="terms-title">Terms and Conditions</h1>

      <p className="last-updated">
        <strong>Last updated: September 28, 2024</strong>
      </p>

      <h2 className="section-title">Interpretation and Definitions</h2>

      <h3 className="subsection-title">Interpretation</h3>
      <p className="section-paragraph">
        The words of which the initial letter is capitalized have meanings
        defined under the following conditions. The following definitions shall
        have the same meaning regardless of whether they appear in singular or
        in plural.
      </p>

      <h3 className="subsection-title">Definitions</h3>
      <p className="section-paragraph">
        For the purposes of these Terms and Conditions:
      </p>
      <ul className="list">
        <li>
          <strong>Affiliate</strong> means an entity that controls, is
          controlled by, or is under common control with a party, where
          "control" means ownership of 50% or more of the shares, equity
          interest, or other securities entitled to vote for election of
          directors or other managing authority.
        </li>
        <li>
          <strong>Company</strong> (referred to as either "the Company," "We,"
          "Us" or "Our" in this Agreement) refers to Applying Pressure Mobile
          Detailing.
        </li>
        <li>
          <strong>Device</strong> means any device that can access the Service
          such as a computer, a cellphone, or a digital tablet.
        </li>
        <li>
          <strong>Service</strong> refers to the Website.
        </li>
        <li>
          <strong>Website</strong> refers to Applying Pressure, accessible from{" "}
          <a
            href="https://www.apdetailers.com/"
            target="_blank"
            rel="noopener noreferrer"
          >
            https://www.apdetailers.com/
          </a>
        </li>
        <li>
          <strong>You</strong> means the individual accessing or using the
          Service, or the company or other legal entity on behalf of which such
          individual is accessing or using the Service, as applicable.
        </li>
      </ul>

      <h2 className="section-title">Acknowledgment</h2>
      <p className="section-paragraph">
        These are the Terms and Conditions governing the use of this Service and
        the agreement that operates between You and the Company. These Terms and
        Conditions set out the rights and obligations of all users regarding the
        use of the Service.
      </p>
      <p className="section-paragraph">
        Your access to and use of the Service is conditioned on Your acceptance
        of and compliance with these Terms and Conditions. These Terms and
        Conditions apply to all visitors, users, and others who access or use
        the Service.
      </p>
      <p className="section-paragraph">
        By accessing or using the Service, You agree to be bound by these Terms
        and Conditions. If You disagree with any part of these Terms and
        Conditions then You may not access the Service.
      </p>
      <p className="section-paragraph">
        You represent that you are over the age of 18. The Company does not
        permit those under 18 to use the Service.
      </p>
      <p className="section-paragraph">
        Your access to and use of the Service is also conditioned on Your
        acceptance of and compliance with the Privacy Policy of the Company. Our
        Privacy Policy describes Our policies and procedures on the collection,
        use, and disclosure of Your personal information when You use the
        Application or the Website and tells You about Your privacy rights and
        how the law protects You.
      </p>

      <h2 className="section-title">Links to Other Websites</h2>
      <p className="section-paragraph">
        Our Service may contain links to third-party websites or services that
        are not owned or controlled by the Company.
      </p>
      <p className="section-paragraph">
        The Company has no control over, and assumes no responsibility for, the
        content, privacy policies, or practices of any third-party websites or
        services. You further acknowledge and agree that the Company shall not
        be responsible or liable, directly or indirectly, for any damage or loss
        caused or alleged to be caused by or in connection with the use of or
        reliance on any such content, goods, or services available on or through
        any such websites or services.
      </p>
      <p className="section-paragraph">
        We strongly advise You to read the terms and conditions and privacy
        policies of any third-party websites or services that You visit.
      </p>

      <h2 className="section-title">Termination</h2>
      <p className="section-paragraph">
        We may terminate or suspend Your access immediately, without prior
        notice or liability, for any reason whatsoever, including without
        limitation if You breach these Terms and Conditions.
      </p>
      <p className="section-paragraph">
        Upon termination, Your right to use the Service will cease immediately.
      </p>

      <h2 className="section-title">Limitation of Liability</h2>
      <p className="section-paragraph">
        Notwithstanding any damages that You might incur, the entire liability
        of the Company and any of its suppliers under any provision of this
        Terms and Your exclusive remedy for all of the foregoing shall be
        limited to the amount actually paid by You through the Service or 100
        USD if You haven't purchased anything through the Service.
      </p>
      <p className="section-paragraph">
        To the maximum extent permitted by applicable law, in no event shall the
        Company or its suppliers be liable for any special, incidental,
        indirect, or consequential damages whatsoever (including, but not
        limited to, damages for loss of profits, loss of data or other
        information, for business interruption, for personal injury, loss of
        privacy arising out of or in any way related to the use of or inability
        to use the Service, third-party software and/or third-party hardware
        used with the Service, or otherwise in connection with any provision of
        this Terms), even if the Company or any supplier has been advised of the
        possibility of such damages and even if the remedy fails of its
        essential purpose.
      </p>

      <h2 className="section-title">"AS IS" and "AS AVAILABLE" Disclaimer</h2>
      <p className="section-paragraph">
        The Service is provided to You "AS IS" and "AS AVAILABLE" and with all
        faults and defects without warranty of any kind. To the maximum extent
        permitted under applicable law, the Company, on its own behalf and on
        behalf of its Affiliates and its and their respective licensors and
        service providers, expressly disclaims all warranties.
      </p>
      </div>
    </>
  );
};

export default TermsAndConditions;
