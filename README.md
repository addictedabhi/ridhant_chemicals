# Ridhant Speciality Chemicals – Website

Static website for **ridhantchemicals.com**. Plain HTML, CSS and vanilla JavaScript: no build step and no dependencies. Ready for GitHub Pages.

## Structure

```
index.html          Coming-soon page (standalone, styles inline, links only to email/phone/LinkedIn)
home.html           Home (full site; reachable directly at /home.html)
about.html          About us
products.html       Products (search + filter by family / industry, ?cat= ?industry= ?q=)
industries.html     Industries (11 cards, deep links: industries.html#ind-plastics)
contact.html        Contact + Google Map
partners.html       Partners / principals (hidden: noindex, not linked from any page)
404.html            Not-found page (uses root-absolute paths so it works at any URL depth)
assets/css/styles.css   All styles; brand colours are the tokens at the top of :root
assets/js/main.js       Mobile nav, cookie consent, product filtering (no content)
assets/img/             Logos (SVG), photos, og-image.jpg (social share preview)
assets/favicon/         Favicons
sitemap.xml, robots.txt, llms.txt, site.webmanifest   SEO / crawler files
CNAME                   Custom domain for GitHub Pages
```

## Editing content
All text is plain HTML so search engines and AI assistants can read it without running JavaScript.
- **Add or change a product:** in `products.html`, copy an `<article class="card product">` block inside the right family. Set `data-cat` to the family id and `data-ind` to the industries separated by `|`, using the exact industry names from the filter dropdown. Then add the product name to the matching industry cards in `industries.html`, update the product count on the home page card, and add it to `llms.txt`.
- **After any content change:** update `<lastmod>` in `sitemap.xml`.
- **Email / phone / address:** search and replace `info@ridhantchemicals.com`, `+91 99294 77295` and `Kota, Rajasthan` across the HTML files, including the JSON-LD blocks in `index.html`, `home.html` and `contact.html`, and `llms.txt`.
- **Map:** in `contact.html`, replace the iframe `src` with the embed URL of the exact office location (Google Maps → Share → Embed a map).
- **Partner logos:** in `partners.html`, replace each `<span>Partner logo N</span>` with `<img src="assets/img/partners/name.png" alt="Name">`. To show the page again, remove its `noindex` meta tag, add it back to the nav, footer and `sitemap.xml`.

## Colours
Brand colours come from the logo: navy `#03295A` (`--pri`) and blue `#2F78BD` (`--acc`) at the top of `styles.css`. All other shades are derived from them.

## Cookie consent
A banner appears on the first visit with **Accept all** and **Reject optional**. The choice is stored in localStorage (`ridhant-cookie-consent`) and can be reopened from **Cookie settings** in the footer. Put any analytics or marketing tags inside `loadOptionalScripts()` in `main.js`. They only load after the visitor accepts.

## Images
All photos are self-hosted in `assets/img/` (CC0 photos from rawpixel / StockSnap). Replace them with your own photos when available, keeping the same file names and roughly the same proportions.

## Launching the full site (removing the coming-soon page)
1. Delete `index.html` and rename `home.html` to `index.html`.
2. In every page, replace `home.html` with `index.html` (nav, logo link, footer, 404 page, breadcrumb JSON-LD).
3. In the new `index.html`, set the canonical, `og:url` and WebPage `url`/`@id` back to `https://ridhantchemicals.com/`.
4. Remove the `home.html` line from `sitemap.xml` and point the Home link in `llms.txt` back to `/`.

## Deploy on GitHub Pages
1. Push this folder to the repository root (or `/docs`).
2. Go to Settings → Pages → Deploy from branch → `main` / root.
3. For the custom domain, keep `CNAME`, then point the DNS: `A` records to 185.199.108–111.153, or a `CNAME` for `www` to `<user>.github.io`.

## To verify with the client
- Phone number (+91 99294 77295) confirmed by the client. Hours are Mon–Fri 9–5 (Sat & Sun closed), taken from the old website.
- 12-HSA salt descriptions (zinc, lithium, magnesium) are generic application text; confirm with the supplier TDS.
- Product names ESBO, ATO and Potassium Stearate were interpreted from the line card.
- The product-to-industry mapping is a first draft.
