/* Ridhant Speciality Chemicals – site behaviour (no dependencies).
   All content is static HTML; this script only adds navigation, cookie consent
   and product filtering on top of it. */
(function () {
  'use strict';
  var EMAIL = 'info@ridhantchemicals.com';
  var CONSENT_KEY = 'ridhant-cookie-consent';    // 'accepted' | 'rejected'

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var mailto = function (subject, body) { return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + (body ? '&body=' + encodeURIComponent(body) : ''); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  /* ---------- Mobile nav ---------- */
  var toggle = $('.nav-toggle');
  if (toggle) {
    toggle.addEventListener('click', function () {
      var open = document.body.classList.toggle('nav-open');
      toggle.setAttribute('aria-expanded', open);
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
    });
    document.addEventListener('keydown', function (e) {
      if (e.key === 'Escape' && document.body.classList.contains('nav-open')) { toggle.click(); toggle.focus(); }
    });
  }

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Cookie consent ---------- */
  var banner = $('.cookie-banner');
  function showBanner() { if (banner) banner.hidden = false; }
  function hideBanner() { if (banner) banner.hidden = true; }
  function onConsent(value) {
    store.set(CONSENT_KEY, value);
    hideBanner();
    if (value === 'accepted') loadOptionalScripts();
  }
  // Put analytics / marketing tags here. They only load after the visitor accepts.
  function loadOptionalScripts() {
    // Example (Google Analytics 4):
    // var s = document.createElement('script'); s.async = true;
    // s.src = 'https://www.googletagmanager.com/gtag/js?id=G-XXXXXXX'; document.head.appendChild(s);
    // window.dataLayer = window.dataLayer || []; function gtag(){dataLayer.push(arguments);} gtag('js', new Date()); gtag('config', 'G-XXXXXXX');
  }
  var consent = store.get(CONSENT_KEY);
  if (!consent) showBanner(); else if (consent === 'accepted') loadOptionalScripts();
  $$('[data-cookie]').forEach(function (b) { b.addEventListener('click', function () { onConsent(b.dataset.cookie === 'accept' ? 'accepted' : 'rejected'); }); });
  $$('[data-cookie-settings]').forEach(function (b) { b.addEventListener('click', showBanner); });

  /* ---------- Industries: highlight the card named in the URL hash ---------- */
  if (location.hash.indexOf('#ind-') === 0) {
    var target = document.getElementById(location.hash.slice(1));
    if (target) target.classList.add('is-focus');
  }

  /* ---------- Products: filter static cards by family, industry and text ---------- */
  var groupsEl = $('#product-groups');
  if (!groupsEl) return;

  var params = new URLSearchParams(location.search);
  var state = { cat: params.get('cat') || '', industry: params.get('industry') || '', q: params.get('q') || '' };
  var search = $('#product-search'), indSel = $('#industry-filter'), chips = $('#category-chips');
  var cards = $$('.product', groupsEl), groups = $$('[data-group]', groupsEl);

  $$('[data-filters]').forEach(function (el) { el.hidden = false; });
  if (!$('option[value="' + CSS.escape(state.industry) + '"]', indSel)) state.industry = '';
  indSel.value = state.industry;
  search.value = state.q;

  function matches(card, q) {
    var industries = card.dataset.ind.split('|');
    return (!state.cat || card.dataset.cat === state.cat) &&
      (!state.industry || industries.indexOf(state.industry) > -1) &&
      (!q || card.textContent.toLowerCase().indexOf(q) > -1);
  }

  function syncUrl() {
    var u = new URLSearchParams();
    if (state.cat) u.set('cat', state.cat);
    if (state.industry) u.set('industry', state.industry);
    if (state.q) u.set('q', state.q);
    history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : ''));
  }

  function render() {
    var q = state.q.trim().toLowerCase(), shown = 0;
    cards.forEach(function (c) { var ok = matches(c, q); c.hidden = !ok; if (ok) shown++; });
    groups.forEach(function (g) { g.hidden = !$('.product:not([hidden])', g); });
    $$('.chip', chips).forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.cat === state.cat); });
    $('#result-label').textContent = shown + (shown === 1 ? ' product' : ' products') + (state.industry ? ' for ' + state.industry : '');
    $('#no-results').hidden = shown > 0;
    $('#custom-enquiry').href = mailto('Product enquiry' + (state.q ? ': ' + state.q : ''), 'Hello Ridhant team,\n\nWe are looking for: ' + state.q + '\n\nApplication:\nQuantity:\nCompany:\nPhone:\n');
    syncUrl();
  }

  chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) { state.cat = b.dataset.cat; render(); } });
  indSel.addEventListener('change', function () { state.industry = indSel.value; render(); });
  search.addEventListener('input', function () { state.q = search.value; render(); });
  render();
})();
