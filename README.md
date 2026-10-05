# Ridhant Speciality Chemicals – Website

Static website for **ridhantchemicals.com**. Plain HTML, CSS and vanilla JavaScript: no build step and no dependencies. Ready for GitHub Pages.

## Structure

```
index.html          Home
about.html          About us
products.html       Products (search + filter by family / industry, ?cat= ?industry= ?q=)
industries.html     Industries (10 cards, deep links: industries.html#ind-plastic)
partners.html       Partners / principals
contact.html        Contact + Google Map
404.html            Not-found page
assets/css/styles.css   All styles + 3 colour themes
assets/js/data.js       CONTENT: product families, products, industries, industry images
assets/js/main.js       Nav, theme switcher, cookie consent, product/industry rendering
assets/img/             Logos (PNG original, white SVG, brandmark SVG)
assets/favicon/         Favicons
CNAME                   Custom domain for GitHub Pages
```

## Editing content
- **Products / industries:** edit `assets/js/data.js`. Each product is `{ name, cat, use, ind: [industries] }`. The industry pages and filters update automatically.
- **Email / phone / address:** search and replace `info@ridhantchemicals.com`, `+91 96194 10242` and `Kota, Rajasthan` across the HTML files.
- **Map:** in `contact.html`, replace the iframe `src` with the embed URL of the exact office location (Google Maps → Share → Embed a map).
- **Partner logos:** in `partners.html`, replace each `<span>Partner logo N</span>` with `<img src="assets/img/partners/name.png" alt="Name">`.

## Themes
Three themes are defined at the top of `styles.css`: `indigo` (default), `teal` and `crimson`. Visitors can switch themes with the Theme button, and their choice is saved in localStorage.
- To change the default theme, edit `DEFAULT_THEME` in `main.js` and `data-theme` on `<html>` in each page.
- To remove the switcher, delete the `.theme-switcher` block from the HTML.
- To add a theme, add `[data-theme="name"] { --pri; --acc; --bg; --ink }` and a button in the panel.

## Cookie consent
A banner appears on the first visit with **Accept all** and **Reject optional**. The choice is stored in localStorage (`ridhant-cookie-consent`) and can be reopened from **Cookie settings** in the footer. Put any analytics or marketing tags inside `loadOptionalScripts()` in `main.js`. They only load after the visitor accepts.

## Images – TODO before launch
The home hero, about photo and industry images currently **hotlink** CC0 photos (rawpixel / StockSnap). Download them into `assets/img/` (or replace them with your own photos) and update:
- the hero `<img>` in `index.html`
- the about `<img>` in `about.html`
- `INDUSTRY_IMAGES` in `data.js`

## Deploy on GitHub Pages
1. Push this folder to the repository root (or `/docs`).
2. Go to Settings → Pages → Deploy from branch → `main` / root.
3. For the custom domain, keep `CNAME`, then point the DNS: `A` records to 185.199.108–111.153, or a `CNAME` for `www` to `<user>.github.io`.

## To verify with the client
- Phone number (+91 96194 10242) and hours (Mon–Sat 9–5) were read from handwritten notes.
- Product names ESBO, ATO and Potassium Stearate were interpreted from the line card.
- The product-to-industry mapping is a first draft.
