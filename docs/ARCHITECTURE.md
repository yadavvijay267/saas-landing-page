# Architecture — SaaS Landing Page

## Layout

- `src/index.html` — nav, hero (with email capture form), features grid,
  pricing (toggle + 3 plans + calculator), testimonials, FAQ, final CTA,
  footer, exit-intent modal.
- `src/styles.css` — mobile-first. Base styles are the phone layout; the
  761px breakpoint adds the two-column hero and hides the hamburger.
  Sticky nav uses `backdrop-filter` blur.
- `src/app.js` — one IIFE. Owns: mobile menu, hero form validation,
  pricing toggle, calculator, testimonial slider (6s auto-advance, resets
  on manual navigation), FAQ accordion, exit-intent modal.

## The conversion details (the stand-out)

1. **Pricing toggle** — plan prices live in `data-monthly` / `data-yearly`
   attributes; the toggle re-renders every `[data-price]` and the
   calculator. Yearly = monthly × 0.8.
2. **Pricing calculator** — `seats × per-user price`, formatted with
   `toLocaleString()`. It re-reads the billing toggle, so the saving is
   visible in both places.
3. **Exit-intent capture** — a `mouseout` listener fires when the pointer
   leaves through the top of the viewport (`clientY <= 8`, no related
   target). Shown once per session via `sessionStorage`. Escape, the ✕
   button, or clicking the backdrop closes it.

## Demo honesty

Both email forms validate the address and show a success message, but send
nothing — there is no backend and no real product. That is intentional:
the page demonstrates the interaction, and the copy says so.
