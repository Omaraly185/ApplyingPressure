# Google Analytics Implementation Guide

## Overview

This document outlines the comprehensive Google Analytics tracking implementation for Applying Pressure Mobile Detailing website.

## Features Implemented

### 1. **Google Analytics 4 (GA4) Integration**

- ✅ Global tracking script added to `pages/_document.js`
- ✅ Automatic page view tracking on all pages
- ✅ Route change tracking for SPA navigation

### 2. **User Behavior Tracking**

#### **Referrer Tracking**

Tracks where users come from:

- Direct referrer URLs
- UTM parameters (utm_source, utm_medium, utm_campaign)
- Automatically captured on page load

#### **Exit Intent Tracking**

Monitors when users are about to leave:

- Mouse leaving viewport from top
- Page navigation/close events
- Tracks which page users exit from

#### **Time on Page**

- Measures engagement duration
- Tracks time spent on each page
- Sent when user navigates away

#### **Scroll Depth**

Tracks user engagement with content:

- 25% scroll milestone
- 50% scroll milestone
- 75% scroll milestone
- 100% scroll milestone

### 3. **Booking Funnel Tracking**

Complete tracking of the booking process:

1. **Zipcode Validation**

   - Event: `zipcode_validated`
   - Tracks successful zipcode entries
   - Tracks validation errors

2. **Service Selection**

   - Event: `service_selected`
   - Tracks package selections (Interior/Exterior)
   - Captures service type and name

3. **Form Submission**

   - Event: `form_submitted`
   - Tracks when booking form is completed
   - Captures validation failures

4. **Booking Completion**
   - Event: `booking_completed`
   - Tracks successful bookings
   - Includes selected services
   - Tracks booking failures and errors

### 4. **Button Click Tracking**

Tracks all major CTA interactions:

- "Book Now" button on homepage
- Breadcrumb navigation clicks
- All booking form interactions

### 5. **Form Interaction Tracking**

Monitors user engagement with forms:

- Field interactions
- Validation errors
- Submission attempts
- Success/failure states

### 6. **Breadcrumb Navigation**

Visual breadcrumbs added to Book Now page:

- SEO-friendly structured navigation
- Click tracking on breadcrumb links
- Accessible navigation (ARIA labels)
- Mobile responsive design

## Files Modified/Created

### New Files

1. `src/utils/analytics.js` - Analytics utility functions
2. `src/Component/Breadcrumb.js` - Breadcrumb component
3. `src/Component/Breadcrumb.css` - Breadcrumb styles
4. `ANALYTICS_GUIDE.md` - This documentation

### Modified Files

1. `pages/_document.js` - Added GA4 script
2. `pages/_app.js` - Added global tracking hooks
3. `pages/Book_Now.js` - Added breadcrumb component
4. `src/Pages/Monthly/MonthlySub.js` - Added booking funnel tracking
5. `src/Pages/Home/CallToAction/CallToAction.js` - Added CTA tracking

## Google Analytics Events

### Event Categories

| Event Name         | Category          | Label        | Description          |
| ------------------ | ----------------- | ------------ | -------------------- |
| `referrer`         | Traffic Source    | Referrer URL | Where user came from |
| `utm_source`       | Campaign          | UTM Source   | Campaign source      |
| `utm_medium`       | Campaign          | UTM Medium   | Campaign medium      |
| `utm_campaign`     | Campaign          | UTM Campaign | Campaign name        |
| `exit_intent`      | User Behavior     | Page Path    | User about to leave  |
| `page_exit`        | User Behavior     | Page Path    | User navigating away |
| `time_on_page`     | User Engagement   | Page Path    | Time spent (seconds) |
| `scroll_depth`     | User Engagement   | Percentage   | Scroll milestone     |
| `booking_step`     | Booking Funnel    | Step Name    | Funnel progression   |
| `service_selected` | Service Selection | Service Name | Package selection    |
| `button_click`     | User Interaction  | Button Name  | CTA clicks           |
| `form_interaction` | Form Interaction  | Field Name   | Form engagement      |

## Viewing Analytics Data

### In Google Analytics 4:

1. **Real-time Reports**

   - Go to Reports > Realtime
   - See live user activity and events

2. **Events Report**

   - Go to Reports > Engagement > Events
   - View all custom events

3. **Conversions**

   - Mark `booking_completed` as a conversion
   - Track booking conversion rate

4. **User Acquisition**

   - See referrer and UTM data
   - Understand traffic sources

5. **Engagement**
   - View scroll depth and time on page
   - Analyze user engagement patterns

## Testing Analytics

### Local Testing

```bash
# Run development server
npm run dev

# Open browser console
# Check for gtag function: window.gtag
# Monitor network tab for analytics requests to google-analytics.com
```

### Production Testing

1. Visit your live site
2. Open Google Analytics Real-time view
3. Navigate through the site
4. Verify events appear in real-time

## Best Practices

1. **Privacy Compliance**

   - Consider adding cookie consent banner
   - Update privacy policy to mention analytics

2. **Data Retention**

   - Configure data retention in GA4 settings
   - Set appropriate retention period

3. **Custom Dimensions**

   - Consider adding user properties
   - Track custom dimensions for deeper insights

4. **Goals & Conversions**
   - Set up conversion goals in GA4
   - Track ROI and conversion rates

## Support & Troubleshooting

### Common Issues

**Events not showing up:**

- Check browser console for errors
- Verify GA4 measurement ID is correct
- Check ad blockers aren't blocking analytics

**Duplicate events:**

- Ensure cleanup functions are working
- Check for multiple tracking calls

**Missing data:**

- Verify script is loaded on all pages
- Check network tab for blocked requests

## Future Enhancements

Consider adding:

- Enhanced e-commerce tracking
- User ID tracking for logged-in users
- Custom dimensions for service types
- A/B testing integration
- Heatmap tracking
- Session recording
