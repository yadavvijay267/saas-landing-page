# Testing — SaaS Landing Page

## Automated checks

```bash
python3 tests/run_tests.py
```

Verifies: file wiring, navbar, pricing toggle + 3 plans, calculator,
testimonial slider, 5 FAQ items, exit-intent modal, mobile-first CSS,
and the matching JS logic.

## Manual checklist

- [ ] Open `src/index.html`: hero, features, pricing, testimonials, FAQ, CTA all render.
- [ ] Flip Monthly/Yearly — all three plan prices change (Pro $12 → $9.60).
- [ ] Move the team-size slider — calculator total updates; switch plans too.
- [ ] Testimonial auto-advances every ~6s; Prev/Next and dots work.
- [ ] Open an FAQ item — the previously open one closes.
- [ ] Move the mouse out the top of the window — exit modal appears once; reload → it does not reappear in the same session.
- [ ] Submit the hero form with a bad email → no success message; valid email → success note.
- [ ] Resize to 390px: single column, hamburger menu works, calculator usable.
