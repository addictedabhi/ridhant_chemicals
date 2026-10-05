/* Ridhant Speciality Chemicals – site behaviour (no dependencies) */
(function () {
  'use strict';
  var EMAIL = 'info@ridhantchemicals.com';
  var DEFAULT_THEME = 'indigo';                  // indigo | teal | crimson
  var THEME_KEY = 'ridhant-theme';
  var CONSENT_KEY = 'ridhant-cookie-consent';    // 'accepted' | 'rejected'

  var $ = function (s, r) { return (r || document).querySelector(s); };
  var $$ = function (s, r) { return Array.prototype.slice.call((r || document).querySelectorAll(s)); };
  var esc = function (s) { return String(s).replace(/[&<>"']/g, function (c) { return { '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]; }); };
  var slug = function (s) { return s.replace(/[^a-z]/gi, '').toLowerCase(); };
  var pad = function (n) { return String(n).padStart(2, '0'); };
  var mailto = function (subject, body) { return 'mailto:' + EMAIL + '?subject=' + encodeURIComponent(subject) + (body ? '&body=' + encodeURIComponent(body) : ''); };
  var store = {
    get: function (k) { try { return localStorage.getItem(k); } catch (e) { return null; } },
    set: function (k, v) { try { localStorage.setItem(k, v); } catch (e) {} }
  };

  var CATS = window.CATS || [], PRODUCTS = window.PRODUCTS || [], INDUSTRIES = window.INDUSTRIES || [], IMAGES = window.INDUSTRY_IMAGES || {};

  /* ---------- Mobile nav ---------- */
  var toggle = $('.nav-toggle');
  if (toggle) toggle.addEventListener('click', function () {
    var open = document.body.classList.toggle('nav-open');
    toggle.setAttribute('aria-expanded', open);
  });

  /* ---------- Year ---------- */
  $$('[data-year]').forEach(function (el) { el.textContent = new Date().getFullYear(); });

  /* ---------- Theme ---------- */
  var THEMES = ['indigo', 'teal', 'crimson'];
  function applyTheme(t) {
    if (THEMES.indexOf(t) < 0) t = DEFAULT_THEME;
    document.documentElement.dataset.theme = t;
    $$('[data-set-theme]').forEach(function (b) { b.setAttribute('aria-pressed', b.dataset.setTheme === t); });
  }
  applyTheme(store.get(THEME_KEY) || DEFAULT_THEME);
  var sw = $('[data-theme-switcher]');
  if (sw) {
    var panel = $('.theme-panel', sw), tbtn = $('.theme-toggle', sw);
    tbtn.addEventListener('click', function () { panel.hidden = !panel.hidden; tbtn.setAttribute('aria-expanded', !panel.hidden); });
    $$('[data-set-theme]', sw).forEach(function (b) {
      b.addEventListener('click', function () { applyTheme(b.dataset.setTheme); store.set(THEME_KEY, b.dataset.setTheme); panel.hidden = true; tbtn.setAttribute('aria-expanded', false); });
    });
    document.addEventListener('click', function (e) { if (!sw.contains(e.target)) panel.hidden = true; });
  }

  /* ---------- Cookie consent ---------- */
  var banner = $('.cookie-banner');
  function showBanner() { if (banner) { banner.hidden = false; document.body.classList.add('cookie-open'); } }
  function hideBanner() { if (banner) { banner.hidden = true; document.body.classList.remove('cookie-open'); } }
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

  /* ---------- Home: category cards + industry pills ---------- */
  var catWrap = $('[data-render="categories"]');
  if (catWrap) {
    var html = CATS.map(function (c, i) {
      var n = PRODUCTS.filter(function (p) { return p.cat === c.id; }).length;
      return '<a href="products.html?cat=' + c.id + '" class="card cat-card"><div class="cat-top"><span class="num-badge">' + pad(i + 1) + '</span><span class="cat-count">' + n + ' products</span></div>' +
        '<span class="cat-name">' + esc(c.name) + '</span><span class="cat-desc">' + esc(c.desc) + '</span></a>';
    }).join('');
    catWrap.insertAdjacentHTML('afterbegin', html);
  }
  var pills = $('[data-render="industry-pills"]');
  if (pills) pills.innerHTML = INDUSTRIES.map(function (d) { return '<a class="pill" href="industries.html#ind-' + slug(d.name) + '">' + esc(d.name) + '</a>'; }).join('');

  /* ---------- Industries page ---------- */
  var indWrap = $('[data-render="industries"]');
  if (indWrap) {
    indWrap.innerHTML = INDUSTRIES.map(function (d, i) {
      var s = slug(d.name), prods = PRODUCTS.filter(function (p) { return p.ind.indexOf(d.name) > -1; });
      return '<article class="industry" id="ind-' + s + '">' +
        '<div class="industry-media">' + (IMAGES[s] ? '<img src="' + IMAGES[s] + '" alt="' + esc(d.name) + '" loading="lazy">' : '') + '</div>' +
        '<div class="industry-title"><span class="num-badge">' + pad(i + 1) + '</span><h2>' + esc(d.name) + '</h2></div>' +
        '<p>' + esc(d.desc) + '</p>' +
        '<div class="stack-12"><span class="label">Products we supply</span><div class="ind-tags">' + prods.map(function (p) { return '<span>' + esc(p.name) + '</span>'; }).join('') + '</div></div>' +
        '<a class="text-link" href="products.html?industry=' + encodeURIComponent(d.name) + '">View ' + esc(d.name) + ' products →</a></article>';
    }).join('');
    if (location.hash) { var t = document.getElementById(location.hash.slice(1)); if (t) setTimeout(function () { t.classList.add('is-focus'); window.scrollTo({ top: t.getBoundingClientRect().top + window.scrollY - 110 }); }, 50); }
  }

  /* ---------- Products page ---------- */
  var groupsEl = $('#product-groups');
  if (groupsEl) {
    var params = new URLSearchParams(location.search);
    var state = { cat: params.get('cat') || '', industry: params.get('industry') || '', q: params.get('q') || '' };
    var search = $('#product-search'), indSel = $('#industry-filter'), chips = $('#category-chips');
    indSel.insertAdjacentHTML('beforeend', INDUSTRIES.map(function (d) { return '<option value="' + esc(d.name) + '">' + esc(d.name) + '</option>'; }).join(''));
    indSel.value = state.industry; search.value = state.q;
    chips.innerHTML = [{ id: '', name: 'All products' }].concat(CATS).map(function (c) {
      return '<button type="button" class="chip" role="tab" data-cat="' + c.id + '">' + esc(c.name) + '</button>';
    }).join('');

    function render() {
      var q = state.q.trim().toLowerCase();
      var list = PRODUCTS.filter(function (p) {
        return (!state.cat || p.cat === state.cat) && (!state.industry || p.ind.indexOf(state.industry) > -1) && (!q || (p.name + ' ' + p.use).toLowerCase().indexOf(q) > -1);
      });
      $$('.chip', chips).forEach(function (b) { b.setAttribute('aria-selected', b.dataset.cat === state.cat); });
      groupsEl.innerHTML = CATS.map(function (c) {
        var items = list.filter(function (p) { return p.cat === c.id; });
        if (!items.length) return '';
        return '<div><div class="group-head"><h2>' + esc(c.name) + '</h2><span>' + esc(c.desc) + '</span></div><div class="product-grid">' +
          items.map(function (p) {
            var m = mailto('Enquiry: ' + p.name, 'Hello Ridhant team,\n\nPlease share price, TDS and availability for ' + p.name + '.\n\nApplication:\nQuantity:\nCompany:\nPhone:\n');
            return '<div class="card product"><div class="product-top"><span class="product-name">' + esc(p.name) + '</span><a class="enquire" href="' + m + '">Enquire</a></div>' +
              '<span class="product-use">' + esc(p.use) + '</span><div class="tags">' + p.ind.map(function (t) { return '<span class="tag">' + esc(t) + '</span>'; }).join('') + '</div></div>';
          }).join('') + '</div></div>';
      }).join('');
      $('#result-label').textContent = list.length + (list.length === 1 ? ' product' : ' products') + (state.industry ? ' for ' + state.industry : '');
      $('#no-results').hidden = list.length > 0;
      $('#custom-enquiry').href = mailto('Product enquiry' + (state.q ? ': ' + state.q : ''), 'Hello Ridhant team,\n\nWe are looking for: ' + state.q + '\n\nApplication:\nQuantity:\nCompany:\nPhone:\n');
      var u = new URLSearchParams(); if (state.cat) u.set('cat', state.cat); if (state.industry) u.set('industry', state.industry); if (state.q) u.set('q', state.q);
      history.replaceState(null, '', location.pathname + (u.toString() ? '?' + u : ''));
    }
    chips.addEventListener('click', function (e) { var b = e.target.closest('.chip'); if (b) { state.cat = b.dataset.cat; render(); } });
    indSel.addEventListener('change', function () { state.industry = indSel.value; render(); });
    search.addEventListener('input', function () { state.q = search.value; render(); });
    render();
  }
})();
