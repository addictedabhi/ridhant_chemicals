# Static Website Build Guidelines

A reusable checklist for building a small business website as plain HTML, CSS and vanilla JavaScript, hosted on GitHub Pages or any static host. It covers structure, HTML and CSS standards, accessibility, mobile, performance, SEO, structured data, and the English-language rules that every word on the site must follow.

Theme, colours, fonts and imagery are decided per project and are deliberately not covered here.

Use it in two ways:

1. **Before building:** read it once and set up the project to match.
2. **Before launch:** run the checklist in section 12 and fix every failure.

---

## 1. Principles

- **Static first.** Plain `.html` files, one CSS file, one small JS file. No framework, no build step, no server-side code. The site must work when opened from a static host with no configuration.
- **Content in HTML, not in JavaScript.** Every product, service, address and paragraph must be in the HTML file itself, so search engines and AI assistants can read it without running scripts. JavaScript only adds behaviour (menus, filters, cookie banner) on top of content that already exists.
- **Works without JavaScript.** If scripts fail, every page must still read correctly and every link must still work. Hide filter controls until JS runs (`hidden` attribute removed by the script).
- **One source of truth per fact.** Phone number, email, address and hours appear in several places (page text, footer, structured data, `llms.txt`). Keep a list of all of them and update every one together.
- **Verify in a browser, not by assumption.** After every change, open the page at desktop and phone widths and check it.

---

## 2. Project structure

```
index.html              Home
about.html
<section>.html          One file per top-level page; short, lowercase, hyphenated names
404.html                Not-found page (see §3.6)
assets/css/styles.css   All styles
assets/js/main.js       All behaviour (no content)
assets/img/             Self-hosted images only (never hotlink)
assets/favicon/         favicon.ico, favicon.svg, apple-touch-icon.png, android-chrome-192/512
robots.txt
sitemap.xml
llms.txt                Plain-text summary for AI assistants (see §9.6)
site.webmanifest
CNAME                   Only when a custom domain is used on GitHub Pages
README.md               How to edit content, deploy and launch
```

- Keep a `backup/` or `archive/` folder for retired pages (e.g. a coming-soon page) and block it in `robots.txt`.
- Keep brand source files (logo packs, raw photos) out of the served site or block the folder in `robots.txt`.

---

## 3. HTML standards

### 3.1 Document skeleton (every page)

```html
<!DOCTYPE html>
<html lang="en-IN">            <!-- set the real language/region -->
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>…</title>
<meta name="description" content="…">
<link rel="canonical" href="https://example.com/page.html">
<!-- Open Graph / Twitter (see §9.3) -->
<meta name="theme-color" content="#…">
<link rel="icon" href="assets/favicon/favicon.ico" sizes="any">
<link rel="icon" href="assets/favicon/favicon.svg" type="image/svg+xml">
<link rel="apple-touch-icon" href="assets/favicon/apple-touch-icon.png">
<link rel="manifest" href="site.webmanifest">
<link rel="stylesheet" href="assets/css/styles.css">
<!-- JSON-LD (see §9.4) -->
</head>
<body>
<a class="skip-link" href="#main">Skip to content</a>
<header>…</header>
<main id="main">…</main>
<footer>…</footer>
<script src="assets/js/main.js" defer></script>
</body>
</html>
```

### 3.2 Semantics

- Use the right element: `<header>`, `<nav aria-label="Main">`, `<main>`, `<section>`, `<article>`, `<footer>`, `<button>` for actions, `<a>` for navigation.
- **One `<h1>` per page.** Headings must descend in order (`h1` → `h2` → `h3`) without skipping levels. Do not pick a heading tag for its size; style it with a class instead.
- Lists of things are `<ul>`/`<ol>` with `<li>`, not a row of `<span>`s.
- Group related content in `<section>` with a heading. Use `aria-labelledby` when the heading is not the first child.
- Every `<img>` needs `alt`, `width` and `height`. Decorative images use `alt=""`. Below-the-fold images use `loading="lazy"`; the hero image uses `fetchpriority="high"`.
- `<iframe>` (maps, videos) needs a `title` and `loading="lazy"`.
- External links that open a new tab use `target="_blank" rel="noopener"` and show a visible marker (e.g. `↗`).
- Prefer `mailto:` and `tel:` links over forms on a static site. Prefill `subject` and `body` with `encodeURIComponent`.

### 3.3 Shared header and footer

They are duplicated in every page. Keep a checklist of the pages and edit all of them together. The current page's nav link gets `class="active" aria-current="page"`.

### 3.4 Paths

- Use **relative paths** (`assets/…`, `about.html`) on normal pages so the site works from any folder.
- The **404 page uses root-absolute paths** (`/assets/…`, `/index.html`) because the host serves it at any URL depth.
- Never rely on directory URLs without a file name (`/about/`) unless the host guarantees an `index.html` fallback.

### 3.5 Data attributes for behaviour

When JS filters or sorts content, drive it from attributes on the content itself (`data-category="waxes" data-tags="a|b|c"`), not from a separate data file. The attribute values must match the visible labels exactly (same spelling, case and punctuation), or filtering silently breaks.

### 3.6 404 page

Same header and footer as the site, clear heading ("Page not found"), one-line explanation, links to home and the main section. `noindex`. Root-absolute paths.

### 3.7 Validation

Every page must parse as valid HTML (no unclosed tags, no duplicate `id`s, no nested `<a>`). Every `<script type="application/ld+json">` block must be valid JSON. Check both with a script before launch.

---

## 4. CSS standards

- **One stylesheet**, organised top-to-bottom: tokens → reset/base → layout utilities → components (in page order) → page-specific → responsive overrides.
- **Design tokens on `:root`** as custom properties: colours, font families, max width, spacing scale. Derive tints and shades from the base tokens (`color-mix()`) rather than hard-coding dozens of hex values. Changing the theme should mean changing a handful of tokens.
- **Mobile-first.** Base styles are for narrow screens; add `min-width` or `max-width` media queries for wider layouts. Breakpoints are chosen where the layout breaks, not at device sizes.
- **Fluid type and spacing** with `clamp()` for headings and large gaps.
- **Layout:** CSS Grid for page sections and card grids (`repeat(auto-fill, minmax(min(100%, 280px), 1fr))`), Flexbox for rows. Never fixed pixel widths on containers.
- **Images:** `max-width:100%; display:block;` globally. Give every image container an `aspect-ratio` and `object-fit:cover` so the layout does not jump while images load.
- **Grid balance:** when a card grid has a count that leaves one orphan card on the last row, adjust the column count or let a call-to-action card fill the gap. Check this every time a card is added or removed.
- **Tap targets:** every link, button and form control is at least 40 × 40 CSS px on touch screens. Give text links padding rather than relying on font size.
- **Focus styles:** never remove the outline. Use `:focus-visible` with a visible ring in the accent colour.
- **Contrast:** body text and labels meet WCAG AA (4.5:1 for normal text, 3:1 for large text and UI borders). Muted greys are the usual failure; test them.
- **Motion:** respect `@media (prefers-reduced-motion: reduce)` by disabling non-essential animation.
- **Hidden elements:** `[hidden]{display:none !important}` so the HTML `hidden` attribute always wins over component display rules.
- **Native form controls:** style `<select>` with `appearance:none` and your own chevron so it matches the inputs; keep the native dropdown list.
- **Line breaks:** use a non-breaking hyphen (U+2011) or `white-space:nowrap` in short product codes and names that must not split across lines (e.g. `12‑HSA`, `GMS‑SE`).
- No inline styles, no `!important` except in the `[hidden]` rule, no CSS frameworks.

---

## 5. JavaScript standards

- One file, wrapped in an IIFE, `'use strict'`, loaded with `defer`. No dependencies.
- Feature-detect and exit early: each block starts with `var el = document.querySelector(…); if (!el) return;`.
- Wrap `localStorage` in try/catch; it can throw in private browsing.
- Escape anything written into the DOM from user input or URL parameters.
- Keep state in the URL for filters (`?cat=…&q=…`) with `history.replaceState`, so views are shareable and the back button works.
- Mobile menu: toggle `aria-expanded`, close on Escape, and return focus to the toggle.
- No analytics or third-party scripts until the visitor accepts cookies (see §8).

---

## 6. Accessibility checklist

- Skip link as the first focusable element.
- Logical heading order; landmarks (`header`, `nav`, `main`, `footer`) present.
- Every interactive element reachable and operable by keyboard.
- `aria-label` on icon-only buttons and on repeated generic links ("Enquire" → `aria-label="Enquire about Zinc Stearate"`).
- Live regions (`aria-live="polite"`) for result counts that change after filtering.
- Colour is never the only signal (active states also change weight, border or underline).
- Text can be zoomed to 200 % without loss of content.

---

## 7. Mobile and performance

- Test at **320, 360, 390, 414, 768 and 1024 px** widths plus one landscape phone size. Required: no horizontal scroll (`document.documentElement.scrollWidth <= viewport width`), nothing clipped, no overlapping text, all tap targets ≥ 40 px, no text under 12 px.
- Sticky header: give anchored sections `scroll-margin-top` so deep links are not hidden under it.
- Images: resize to the largest displayed size (usually ≤ 1024 px wide), save as progressive JPEG at quality 75–85 or WebP, and keep each under about 150 KB. Logos as SVG with metadata stripped.
- Self-host all images; never hotlink from stock sites or CDNs you do not control.
- Preconnect to the font host; load only the weights used; `display=swap`.
- Preload the hero image on the home page.
- No render-blocking scripts; CSS is a single small file.

---

## 8. Cookies and privacy

- No tracking before consent. Show a banner on first visit with equal-weight **Accept** and **Reject** buttons; store the choice in `localStorage`; provide a "Cookie settings" link in the footer to reopen it.
- Put every optional script (analytics, chat widgets) inside one function that runs only after acceptance.
- Never log or transmit personal data from the static site.

---

## 9. SEO

### 9.1 Titles

- Unique per page, **≤ 60 characters**, most important words first, brand last: `Products: Metallic Stearates, PE Wax | Brand`.
- Title Case for the `<title>`; the on-page `<h1>` may differ and should be sentence case.
- The home page title says what the business is and where it is, not just the brand name.

### 9.2 Meta descriptions

- Unique per page, **120–160 characters**, a plain sentence or list that would make sense as a search snippet. Include the main products/services and the location or market. No keyword stuffing, no quotation marks.

### 9.3 Canonical and social tags (every indexable page)

```html
<link rel="canonical" href="https://example.com/page.html">
<meta property="og:type" content="website">
<meta property="og:site_name" content="Brand">
<meta property="og:locale" content="en_IN">
<meta property="og:url" content="https://example.com/page.html">
<meta property="og:title" content="…same as <title>…">
<meta property="og:description" content="…same as meta description…">
<meta property="og:image" content="https://example.com/assets/img/og-image.jpg">
<meta property="og:image:width" content="1200">
<meta property="og:image:height" content="630">
<meta property="og:image:alt" content="Brand logo">
<meta name="twitter:card" content="summary_large_image">
<meta name="twitter:title" content="…">
<meta name="twitter:description" content="…">
<meta name="twitter:image" content="https://example.com/assets/img/og-image.jpg">
```

- One 1200 × 630 JPEG share image for the whole site is enough; absolute URL.
- The home page canonical is the bare domain with a trailing slash (`https://example.com/`), not `/index.html`.
- Pages that must not be indexed (404, archived, placeholder) get `<meta name="robots" content="noindex, nofollow">` instead of a canonical, and are left out of the sitemap.

### 9.4 Structured data (JSON-LD)

One `<script type="application/ld+json">` per page with an `@graph`:

- **Home and Contact:** full `Organization` (or `LocalBusiness`) with `@id: "https://example.com/#organization"`, `name`, `url`, `logo`, `description`, `email`, `telephone` (E.164-style, e.g. `+91-99999-99999`), `address` (`PostalAddress` with street, locality, region, postalCode, country), `location` with `GeoCoordinates` and `hasMap` (Google Maps share link), `openingHoursSpecification`, `sameAs` (social profiles), `areaServed`, `knowsAbout` (list of products/topics). Home also has `WebSite` and `WebPage`.
- **Other pages:** a page-type node (`AboutPage`, `CollectionPage`, `ContactPage`) that references the organisation by `@id`, plus a `BreadcrumbList`.
- **List pages:** an `ItemList` naming every item (products, industries) with `position`, `name` and, where there is an anchor, `url`.
- Keep the description and contact details in JSON-LD identical to the visible text.
- Validate JSON before launch; test with Google's Rich Results Test after launch.

### 9.5 robots.txt and sitemap.xml

```
User-agent: *
Allow: /
Disallow: /backup/
Disallow: /<brand-source-folder>/

Sitemap: https://example.com/sitemap.xml
```

- Sitemap lists only indexable pages with absolute URLs and a `<lastmod>` date (`YYYY-MM-DD`). Update `lastmod` whenever a page's content changes. Validate the XML.

### 9.6 llms.txt (for AI assistants)

A Markdown file at the site root summarising the business so AI assistants can answer questions accurately: one-paragraph description, contact details, a list of pages with one-line purposes, then the full product/service list with the same descriptions as the site, and the industries or audiences served. Update it with every content change.

### 9.7 Content for search

- Every page has real text in HTML; do not leave a page with only images and links.
- Industry, product and category names are consistent everywhere: nav, headings, filter options, tags, structured data, `llms.txt`.
- Internal links use descriptive text ("View Paints products →"), not "click here".
- Deep links (`page.html#section-id`) use stable, lowercase, hyphenated ids.

### 9.8 Local SEO (if the business has a physical location)

- The address on the site must match the Google Business Profile exactly (same street line, PIN code, spelling).
- Embed the map by the business's listing (`maps.google.com/maps?cid=<id>&output=embed`), not a generic city search, and link "Open in Google Maps" to the listing's share link.
- Collect Google reviews; they matter more for local ranking than on-page changes.

### 9.9 After launch

- Submit the sitemap in Google Search Console and Bing Webmaster Tools.
- Check the share preview with the Facebook/LinkedIn debuggers.
- Re-check every canonical when a page is renamed (e.g. a coming-soon page replaced by the real home page).

---

## 10. English-language standards

Apply these to every string a visitor or crawler can read: headings, body text, buttons, alt text, titles, meta descriptions, structured data, `llms.txt`.

### 10.1 Spelling and variety

- Pick **one variety** (British English for India, UK, EU, Australia; American for the US) and use it everywhere. British: *speciality, stabiliser, optimise, customise, colour, aluminium, mould, oxidised, programme, centre, licence (noun)*. Do not mix.
- Run a spellcheck over the extracted visible text before launch. Common slips: *Fuctional, accomodate, seperate, recieve, occurence*.
- Industry terms follow industry usage, not the dictionary, when they differ (e.g. *hot melt adhesives*, *road marking paint*, *masterbatch*).

### 10.2 Capitalisation

- **Headings and labels: sentence case.** Only the first word and proper nouns are capitalised: "Industries we serve", "Who we are", "Need a grade you don't see listed?"
- **Browser `<title>`: Title Case.** "About Us | Brand".
- **Names are capitalised; common nouns are not.** A product, family, industry or company name used as a name takes capitals ("Calcium Stearate", "Fillers & Minerals", "Personal Care"). The same words used in a sentence do not ("water-based calcium and zinc stearate dispersions"). Chemical and material names are common nouns.
- **Lists of names keep capitals; sentences do not.** "Talc, Calcium Hydroxide and Calcium Oxide" (a label listing products) vs "fillers such as talc and calcium oxide" (a sentence).
- Hyphenated names in Title Case capitalise both parts: "Oxo-Biodegradable Additives", "12-Hydroxystearate".
- Abbreviations stay in capitals (PVC, UV, TDS, SDS, LLP). Do not capitalise ordinary words to make them look important ("Engineering Plastics" in a sentence is wrong; "engineering plastics" is right).
- Never write a whole word in capitals for emphasis.

### 10.3 Punctuation

- **No full stop at the end of headings, titles, buttons, labels or list items that are fragments.**
- **Full stop at the end of every complete sentence**, including one-line descriptions ("Processing aid." "Water-based dispersion.").
- Within a family or group, use the **same pattern for the same kind of text**: if product descriptions use "Role; detail." then all of them do.
- **Semicolons** join two closely related halves of one description: "Distilled monoglyceride; antistatic agent."
- **No Oxford (serial) comma** in British style unless needed to avoid ambiguity: "zinc, calcium and magnesium".
- **Apostrophes are typographic** (’ U+2019), not straight ('): *We’re, don’t, Let’s*.
- **Dashes:** en dash (–) for ranges and pauses, closed up in ranges without spaces ("Mon–Fri", "2019–2024") and spaced when either side contains a space ("9:00 am – 5:00 pm"). Hyphen (-) only inside words. No em dashes in body copy.
- **Ampersand (&)** only in names and short labels ("PE & PP Waxes", "Ink & Coatings"). In sentences write "and".
- **Slashes** in label lists have a space each side: "Zinc / Calcium / Magnesium". Product codes written without spaces keep their own form ("GMS 90/95").
- **Quotation marks** are typographic (“ ” ‘ ’). Avoid them in headings and meta tags.
- One space after a full stop. No space before punctuation. No double spaces.

### 10.4 Hyphenation

- Compound modifiers before a noun are hyphenated: *water-based, high-quality, cost-effective, long-term, anti-caking, anti-block, flame-retardant*.
- Suspended hyphens when two modifiers share a base: "LDPE- and HDPE-based waxes".
- Prefixes are usually closed: *antistatic, multipurpose, nonstick*; keep the hyphen before a capital or a repeated vowel (*anti-icing, pre-existing*).
- Do not hyphenate where the industry does not: *hot melt adhesives, road marking paint*.

### 10.5 Numbers, dates, times, units

- Spell out one to nine in prose; use figures from 10 upwards, and always in statistics, badges and tables ("nine core industries" in a sentence; "9 industries" in a stat tile).
- Times: `9:00 am – 5:00 pm IST` (lowercase am/pm with a space, time zone once).
- Days: "Monday to Friday" in sentences; "Mon–Fri" in compact labels.
- Dates: `13 October 2026` in prose; `2026-10-13` in machine-readable places (`lastmod`).
- Phone numbers: display in the national grouping with country code (`+91 99294 77295`); `tel:` links in E.164 (`tel:+919929477295`); structured data with hyphens (`+91-99294-77295`).
- Units have a space before them (`25 kg`, `1,200 m²`); percentages do not (`80%`).
- Thousands separators with commas in text (`1,200`), none in code.

### 10.6 Grammar and style

- Articles: "an" before a vowel *sound* ("an SDS", "an hour", "a TDS", "a UV stabiliser").
- Parallel lists: items in the same grammatical form ("cleansing, emulsifying and gelling agent", not "cleansing agent, emulsifier, and gelling").
- Avoid dangling or run-on sentences when listing many industries; split into two sentences.
- Verbs agree with their subject ("Protects polymers…" for a singular product; "Primary and secondary antioxidants that protect…").
- Prefer short, active sentences. One idea per sentence.
- Consistent terminology: choose one word for each thing (enquiry/inquiry, data sheet/datasheet, email/e-mail) and stick to it site-wide.
- No marketing filler without substance ("world-class", "best-in-class") unless it is a quoted claim the client stands behind.

### 10.7 Alt text, labels and microcopy

- Alt text describes the picture in a short phrase, no "image of", no full stop needed: "Fan of sandpaper sheets".
- Button text is a verb phrase in sentence case: "Request a quote", "Send an enquiry", "View all products →".
- Placeholder text gives an example, with correct punctuation: "Search products, e.g. zinc stearate".
- Error and empty states are polite and specific: "No matching products. We may still be able to source it. Tell us what you need."

---

## 11. Content consistency rules

- A product name is written identically everywhere it appears (card heading, enquiry subject, structured data, `llms.txt`, any list). Full form first, short form in brackets: "Antimony Trioxide (ATO)".
- Category and industry names are identical in the nav, filter options, tags, headings, anchors and structured data; the filter breaks on any mismatch.
- Counts shown on the site (products per family, number of industries, totals) must be regenerated from the HTML, not typed by hand, whenever items are added or removed.
- When an item moves between categories, update: the item's attribute, both category counts, any descriptive text that named it, `llms.txt`, and the sitemap date.
- When a category or industry is added or removed, update: nav/pills, filter options, page cards, counts and badges, prose lists ("… personal care, lubricants and abrasives"), meta descriptions, structured data lists, footer text, `llms.txt`, README.

---

## 12. Pre-launch checklist

Run every item. Automate the mechanical ones with a script that loads each page in a headless browser.

**Structure and code**
- [ ] Every page parses as valid HTML; no duplicate ids; all JSON-LD blocks parse.
- [ ] One `<h1>` per page; heading levels in order.
- [ ] Header, nav and footer identical across pages; current page marked `aria-current`.
- [ ] No reference to removed files, old page names or hotlinked images (`grep` for them).
- [ ] 404 page uses root-absolute paths and renders styled at a deep URL.
- [ ] Site works with JavaScript disabled.

**Links**
- [ ] Every internal link resolves (HTTP 200); every anchor id exists.
- [ ] Every deep link lands below the sticky header.
- [ ] `mailto:`/`tel:` links use correct, URL-encoded values.

**Mobile and accessibility**
- [ ] No horizontal scroll at 320–1024 px; nothing clipped or overlapping.
- [ ] All tap targets ≥ 40 px; no text < 12 px.
- [ ] Keyboard: skip link, menu, filters and dialogs all operable; visible focus.
- [ ] All images have alt, width, height; contrast passes AA.
- [ ] `prefers-reduced-motion` respected.

**Performance**
- [ ] Images resized and compressed; none hotlinked; hero preloaded.
- [ ] Single CSS file; JS deferred; fonts preconnected with `display=swap`.

**SEO**
- [ ] Unique title ≤ 60 and description 120–160 on every indexable page; OG/Twitter tags match them.
- [ ] Canonical on every indexable page; home canonical is the bare domain.
- [ ] `noindex` on 404, archived and placeholder pages; they are not in the sitemap.
- [ ] Organization JSON-LD with address, phone, geo, map, hours, sameAs; list pages have ItemList; other pages have BreadcrumbList.
- [ ] `robots.txt` allows the site, blocks backup/source folders, names the sitemap.
- [ ] `sitemap.xml` valid, absolute URLs, `lastmod` current.
- [ ] `llms.txt` present and matching the site content.
- [ ] Share image 1200 × 630, absolute URL.

**English**
- [ ] Spellcheck passed on extracted visible text; one spelling variety throughout.
- [ ] Headings sentence case, no trailing full stops; sentences end with full stops.
- [ ] Names capitalised, common nouns not; chemical/material names lowercase in sentences.
- [ ] Typographic apostrophes; en dashes in ranges; "and" not "&" in sentences; no Oxford comma.
- [ ] Hyphenated compounds correct; suspended hyphens where needed.
- [ ] Numbers, times, dates, phone formats per §10.5.
- [ ] Same description pattern within each group of items.
- [ ] Every product/category/industry name identical in all locations.

**Business facts**
- [ ] Phone, email, address, hours identical in text, footer, structured data, `llms.txt`, and the Google Business Profile.
- [ ] Map embed points at the business listing, not the city.

**Launch**
- [ ] Commit, push, confirm the live URL renders the home page.
- [ ] Submit sitemap to Search Console; test share preview; run Rich Results Test.
