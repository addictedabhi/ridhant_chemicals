# Project notes for Claude Code
- Static site for GitHub Pages: plain HTML/CSS/vanilla JS. Don't add frameworks or a build step unless asked.
- Content lives in assets/js/data.js; layout and theming live in assets/css/styles.css (CSS variables; themes via html[data-theme]).
- Header and footer are duplicated in every HTML page. Keep them in sync when editing navigation or contact details.
- Brand: logo assets/img/ridhant-logo.png. Fonts: Lora (headings) + Manrope (body). Light, clean, professional.
- No forms: every enquiry is a mailto: link to info@ridhantchemicals.com.
- Cookie consent is in main.js. Optional scripts go only in loadOptionalScripts().
