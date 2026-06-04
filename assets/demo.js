// RoboForm-style looping autofill demo: Safe taps -> login form auto-fills -> signed in.
(function () {
  function el(id) { return document.getElementById(id); }
  function loop() {
    var c = el('demo-card'), btn = el('demo-btn');
    if (!c || !btn) return;
    c.classList.remove('tap', 'fill');
    btn.className = 'demo-btn';
    btn.textContent = btn.getAttribute('data-login');
    setTimeout(function () { c.classList.add('tap'); }, 900);   // Safe badge pulses
    setTimeout(function () { c.classList.add('fill'); }, 1250); // fields fill in
    setTimeout(function () { btn.className = 'demo-btn go'; }, 1950);
    setTimeout(function () { btn.className = 'demo-btn done'; btn.textContent = btn.getAttribute('data-done'); }, 2650);
    setTimeout(loop, 4700);                                     // reset + loop
  }
  if (document.readyState !== 'loading') loop();
  else document.addEventListener('DOMContentLoaded', loop);
})();
