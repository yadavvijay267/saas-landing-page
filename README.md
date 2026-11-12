# Responsive Landing Page for a SaaS Product

A conversion-focused landing page for **Flowdesk** — a fictional SaaS that
turns scattered team tasks into one calm board. The page is designed to look
production-ready on phone and desktop.

> Flowdesk is fictional. It exists to demonstrate landing-page craft, not to
> sell anything.

## Features

- **Sticky navbar with smooth-scroll navigation** and a mobile hamburger menu.
- **Pricing toggle (monthly/yearly)** that updates every plan price live (−20% yearly).
- **Working pricing calculator** — team-size slider + plan selector = real monthly cost.
- **FAQ accordion** (one open at a time) and an **auto-rotating testimonial slider**
  with prev/next controls and dots.
- **Exit-intent email capture** — move the mouse toward the top of the window
  to leave and a one-time-per-session modal offers a free starter kit.
- **Mobile-first responsive design** — single column on phones, two-column hero on desktop.

## Tech stack

HTML, CSS (Flexbox/Grid, mobile-first), vanilla JavaScript. No framework,
no build step. (The guide mentions Tailwind; this build uses hand-written CSS
so the page works fully offline from a single folder.)

## How to run

Open `src/index.html` in any browser.

```bash
# optional: serve locally
python3 -m http.server --directory src 8001
# then visit http://localhost:8001
```

## Screenshots

See [`screenshots/SCREENSHOTS.md`](screenshots/SCREENSHOTS.md).

## Project structure

```
src/        index.html, styles.css, app.js
assets/     favicon.svg
docs/       ARCHITECTURE.md
tests/      run_tests.py (automated sanity checks) + TESTING.md
```

## License

MIT — see [LICENSE](LICENSE).
