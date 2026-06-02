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
    // 1) Google Ads conversion (optimization signal)
    if (hasAds) ev('conversion', { send_to: c.GOOGLE_ADS_ID + '/' + c.GOOGLE_ADS_LABEL });
    // 2) generic events (GA4 + dataLayer)
    ev('start_trial_click', { value: c.PRICE_YEAR || '' });

    // 3) hand off to the store
    var url = c.ADJUST_URL || '';
    if (url && url.indexOf('PASTE') < 0) {
      window.location.href = url;                 // Adjust link (with attribution) — preferred
    } else {
      // no Adjust yet → go to the real store by platform (works now, no attribution)
      var ios = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
      var store = ios ? c.STORE_IOS : c.STORE_ANDROID;
      if (store) { window.location.href = store; }
      else { var d = document.getElementById('pw-demo'); if (d) d.style.display = 'block'; }
    }
  };

  // fire a page-view funnel event
  ev('view_landing', { lang: document.documentElement.lang || 'en' });
})();
