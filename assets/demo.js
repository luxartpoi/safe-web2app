// Autofill demo (real Safe flow): tap the Safe key on the keyboard -> pick a saved
// login from the list -> the form fills -> signed in. Loops. Interface is always visible.
(function () {
  function el(id) { return document.getElementById(id); }
  function loop() {
    var c = el('demo-card'), btn = el('demo-btn');
    if (!c || !btn) return;
    c.className = 'demo-card';                                   // reset (keep base class)
    btn.textContent = btn.getAttribute('data-login');
    setTimeout(function () { c.classList.add('s-tap'); },  900);  // tap the Safe key
    setTimeout(function () { c.classList.add('s-list'); }, 1300); // logins list pops up
    setTimeout(function () { c.classList.add('s-pick'); }, 2000); // highlight chosen login
    setTimeout(function () { c.classList.remove('s-list', 's-tap'); c.classList.add('s-fill'); }, 2600); // fill fields
    setTimeout(function () { c.classList.add('s-go'); }, 3200);
    setTimeout(function () { c.classList.add('s-done'); btn.textContent = btn.getAttribute('data-done'); }, 3900);
    setTimeout(loop, 5800);
  }
  if (document.readyState !== 'loading') loop();
  else document.addEventListener('DOMContentLoaded', loop);
})();
