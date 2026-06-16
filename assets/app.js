// Shared logic for the SafeInCloud web2app MVP landing + fake paywall.
(function () {
  var c = window.SAFE_CONFIG || {};
  var hasAds = c.GOOGLE_ADS_ID && c.GOOGLE_ADS_ID.indexOf('XXXX') < 0;
  var hasGa4 = (c.GA4_ID || '').indexOf('G-') === 0;

  // --- load gtag (GA4 + Google Ads) ---
  if (hasGa4 || hasAds) {
    var id = hasGa4 ? c.GA4_ID : c.GOOGLE_ADS_ID;
    var s = document.createElement('script');
    s.async = true; s.src = 'https://www.googletagmanager.com/gtag/js?id=' + id;
    document.head.appendChild(s);
    window.dataLayer = window.dataLayer || [];
    window.gtag = function () { dataLayer.push(arguments); };
    gtag('js', new Date());
    if (hasGa4) gtag('config', c.GA4_ID);
    if (hasAds) gtag('config', c.GOOGLE_ADS_ID);
  }

  function ev(name, params) { try { if (window.gtag) gtag('event', name, params || {}); } catch (e) {} }

  // Screen 2 — reviews (between landing and paywall)
  window.safeOpenTestimonial = function () {
    document.getElementById('testimonial').classList.add('open');
    document.body.style.overflow = 'hidden';
    ev('view_proof');
  };
  window.safeCloseTestimonial = function () {
    document.getElementById('testimonial').classList.remove('open');
    document.body.style.overflow = '';
  };
  window.safeToPaywall = function () { window.safeCloseTestimonial(); window.safeOpenPaywall(); };

  window.safeOpenPaywall = function () {
    document.getElementById('paywall').classList.add('open');
    document.body.style.overflow = 'hidden';
    ev('view_paywall');
  };
  window.safeClosePaywall = function () {
    document.getElementById('paywall').classList.remove('open');
    document.body.style.overflow = '';
  };

  // The conversion: user taps "Start Free Trial" on the fake paywall.
  window.safeStartTrial = function () {
    // Where we hand off: Adjust tracker (with attribution) if set, else the store.
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
    var adj = ios ? c.ADJUST_IOS : c.ADJUST_ANDROID;
    var store = ios ? c.STORE_IOS : c.STORE_ANDROID;
    var dest = (adj && adj.indexOf('app.adjust.com') >= 0) ? adj : store;

    // Navigate ONLY after the conversion/event beacon has been sent — an immediate
    // redirect can cut off the hit before it leaves the browser (then the click is
    // never attributed to its gclid). Fallback timer covers a missing/slow callback.
    var done = false;
    function go() {
      if (done) return; done = true;
      if (dest) { window.location.href = dest; }
      else { var d = document.getElementById('pw-demo'); if (d) d.style.display = 'block'; }
    }

    // 1) funnel signal (GA4) — always
    ev('start_trial_click', { value: c.PRICE_YEAR || '' });

    // 2) Google Ads conversion (the optimization signal) — wait for it before leaving
    if (window.gtag && hasAds) {
      gtag('event', 'conversion', {
        send_to: c.GOOGLE_ADS_ID + '/' + c.GOOGLE_ADS_LABEL,
        event_callback: go
      });
      setTimeout(go, 1200);            // fallback if the callback never fires
    } else if (window.gtag) {
      setTimeout(go, 350);             // no Ads ID yet — let the GA4 hit flush, then go
    } else {
      go();
    }
  };

  // fire a page-view funnel event
  ev('view_landing', { lang: document.documentElement.lang || 'en' });
})();
