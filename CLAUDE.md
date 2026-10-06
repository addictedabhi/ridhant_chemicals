# Project notes for Claude Code
- Static site for GitHub Pages: plain HTML/CSS/vanilla JS. Don't add frameworks or a build step unless asked.
- Content is static HTML in each page (products, industries and home category cards included) so search engines and AI crawlers can read it. main.js only adds filtering/nav/cookies. Layout lives in assets/css/styles.css (brand tokens on :root).
- SEO: every indexable page has a unique title/description, canonical, OG/Twitter tags and JSON-LD. Update sitemap.xml lastmod and llms.txt when content changes. partners.html is hidden (noindex, not linked).
- Header and footer are duplicated in every HTML page. Keep them in sync when editing navigation or contact details.
- Brand: logo assets/img/ridhant-logo-horizontal.svg (white: logo-white.svg). Colours navy #03295A, blue #2F78BD. Fonts: Lora (headings) + Manrope (body). Light, clean, professional.
- No forms: every enquiry is a mailto: link to info@ridhantchemicals.com.
- Cookie consent is in main.js. Optional scripts go only in loadOptionalScripts().
