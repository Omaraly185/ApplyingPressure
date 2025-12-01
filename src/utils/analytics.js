// Google Analytics utility functions

// Track page views
export const trackPageView = (url) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('config', 'G-YEQBRK59B2', {
      page_path: url,
    });
  }
};

// Track custom events
export const trackEvent = (action, category, label, value) => {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', action, {
      event_category: category,
      event_label: label,
      value: value,
    });
  }
};

// Track where users come from (referrer)
export const trackReferrer = () => {
  if (typeof window !== 'undefined') {
    const referrer = document.referrer;
    const urlParams = new URLSearchParams(window.location.search);
    
    // Track referrer
    if (referrer) {
      trackEvent('referrer', 'Traffic Source', referrer);
    }
    
    // Track UTM parameters
    const utmSource = urlParams.get('utm_source');
    const utmMedium = urlParams.get('utm_medium');
    const utmCampaign = urlParams.get('utm_campaign');
    
    if (utmSource) {
      trackEvent('utm_source', 'Campaign', utmSource);
    }
    if (utmMedium) {
      trackEvent('utm_medium', 'Campaign', utmMedium);
    }
    if (utmCampaign) {
      trackEvent('utm_campaign', 'Campaign', utmCampaign);
    }
  }
};

// Track exit intent (when user is about to leave)
export const trackExitIntent = () => {
  if (typeof window !== 'undefined') {
    let exitIntentTriggered = false;

    const handleMouseLeave = (e) => {
      // Check if mouse is leaving from the top of the page
      if (e.clientY <= 0 && !exitIntentTriggered) {
        exitIntentTriggered = true;
        trackEvent('exit_intent', 'User Behavior', window.location.pathname);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);

    // Track when user navigates away
    const handleBeforeUnload = () => {
      trackEvent('page_exit', 'User Behavior', window.location.pathname);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    // Return cleanup function
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
};

// Track form interactions
export const trackFormInteraction = (formName, action, field) => {
  trackEvent(action, 'Form Interaction', `${formName} - ${field}`);
};

// Track booking funnel steps
export const trackBookingStep = (step, details) => {
  trackEvent('booking_step', 'Booking Funnel', step, details);
};

// Track service selection
export const trackServiceSelection = (serviceName, serviceType) => {
  trackEvent('service_selected', 'Service Selection', `${serviceName} - ${serviceType}`);
};

// Track time on page
export const trackTimeOnPage = () => {
  if (typeof window !== 'undefined') {
    const startTime = Date.now();

    const handleBeforeUnload = () => {
      const timeSpent = Math.round((Date.now() - startTime) / 1000); // in seconds
      trackEvent('time_on_page', 'User Engagement', window.location.pathname, timeSpent);
    };

    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }
};

// Track scroll depth
export const trackScrollDepth = () => {
  if (typeof window !== 'undefined') {
    let maxScroll = 0;
    const milestones = [25, 50, 75, 100];
    const triggered = new Set();

    const handleScroll = () => {
      const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrolled = (window.scrollY / scrollHeight) * 100;
      
      maxScroll = Math.max(maxScroll, scrolled);

      milestones.forEach(milestone => {
        if (maxScroll >= milestone && !triggered.has(milestone)) {
          triggered.add(milestone);
          trackEvent('scroll_depth', 'User Engagement', `${milestone}%`, milestone);
        }
      });
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }
};

// Track button clicks
export const trackButtonClick = (buttonName, location) => {
  trackEvent('button_click', 'User Interaction', `${buttonName} - ${location}`);
};

