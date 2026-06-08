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

  // Public-proof screen — customer reviews (between demo and paywall)
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
    // 1) Google Ads conversion (optimization signal)
    if (hasAds) ev('conversion', { send_to: c.GOOGLE_ADS_ID + '/' + c.GOOGLE_ADS_LABEL });
    // 2) generic events (GA4 + dataLayer)
    ev('start_trial_click', { value: c.PRICE_YEAR || '' });

    // 3) hand off to the store by platform — Adjust tracker (with attribution) if set, else store
    var ios = /iphone|ipad|ipod/i.test(navigator.userAgent || '');
    var adj = ios ? c.ADJUST_IOS : c.ADJUST_ANDROID;
    var store = ios ? c.STORE_IOS : c.STORE_ANDROID;
    var dest = (adj && adj.indexOf('app.adjust.com') >= 0) ? adj : store;
    if (dest) { window.location.href = dest; }
    else { var d = document.getElementById('pw-demo'); if (d) d.style.display = 'block'; }
  };

  // Geo/platform-aware ratings on the proof screen (?geo=us|uk|de|at|ch, else by page lang)
  (function applyProof() {
    var sets = c.PROOF_RATINGS; if (!sets) return;
    var m = location.search.match(/[?&]geo=([a-z]{2})/i);
    var geo = m ? m[1].toLowerCase()
                : ((document.documentElement.lang || 'en').toLowerCase() === 'de' ? 'de' : 'default');
    var r = sets[geo] || sets['default']; if (!r) return;
    function set(id, val, suffix) { var el = document.getElementById(id); if (el && val != null) el.textContent = val + (suffix || ''); }
    set('proof-appstore', r.appstore, '★');
    set('proof-googleplay', r.googleplay, '★');
    set('proof-count', r.count, '');
  })();

  // fire a page-view funnel event
  ev('view_landing', { lang: document.documentElement.lang || 'en' });
})();
