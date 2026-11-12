#!/usr/bin/env python3
"""Automated sanity checks for the SaaS Landing Page project.

Run:  python3 tests/run_tests.py
Exit code 0 = all checks passed.
"""
import sys
from pathlib import Path

ROOT = Path(__file__).resolve().parent.parent
SRC = ROOT / "src"
failures = []


def check(name, ok):
    print(("PASS " if ok else "FAIL ") + name)
    if not ok:
        failures.append(name)


html = (SRC / "index.html").read_text(encoding="utf-8")
css = (SRC / "styles.css").read_text(encoding="utf-8")
js = (SRC / "app.js").read_text(encoding="utf-8")

check("index.html links styles.css", 'href="styles.css"' in html)
check("index.html loads app.js", 'src="app.js"' in html)
check("sticky navbar present", 'class="nav"' in html)
check("hero email form present", 'id="heroForm"' in html)
check("pricing toggle present", 'id="billingToggle"' in html)
check("3 pricing plans with monthly/yearly data",
      html.count('class="card plan') == 3 and html.count('data-yearly=') == 3)
check("pricing calculator present", 'id="seats"' in html and 'id="calcTotal"' in html)
check("testimonial slider present", 'id="quoteBox"' in html and 'id="nextQuote"' in html)
check("FAQ accordion present (5 questions)", html.count('class="faq-q"') == 5)
check("exit-intent modal present", 'id="exitModal"' in html)
check("CSS is mobile-first (media query present)", '@media (max-width:760px)' in css)
check("JS has pricing logic", "refreshPrices" in js and "updateCalc" in js)
check("JS has slider logic", "showQuote" in js)
check("JS has exit-intent logic", "exitModal" in js and "sessionStorage" in js)
check("JS braces balanced", js.count("{") == js.count("}"))
check("README exists", (ROOT / "README.md").exists())
check("LICENSE exists", (ROOT / "LICENSE").exists())

print(f"\n{len(failures)} failure(s).")
sys.exit(1 if failures else 0)
