// Flowdesk landing page — original vanilla JS.
// Pricing toggle, pricing calculator, testimonial slider, FAQ accordion,
// exit-intent email capture, mobile menu, email validation.
(function () {
  "use strict";
  var $ = function (id) { return document.getElementById(id); };
  var emailOk = function (v) { return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v); };

  /* Mobile menu */
  $("menuToggle").addEventListener("click", function () {
    $("navLinks").classList.toggle("open");
  });
  document.querySelectorAll("#navLinks a").forEach(function (a) {
    a.addEventListener("click", function () { $("navLinks").classList.remove("open"); });
  });

  /* Hero trial form (demo: validates, never sends) */
  $("heroForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!emailOk($("heroEmail").value.trim())) {
      $("heroEmail").focus();
      $("heroEmail").setAttribute("aria-invalid", "true");
      return;
    }
    $("heroOk").hidden = false;
    $("heroForm").hidden = true;
  });

  /* ---------- Pricing toggle (monthly / yearly, -20%) ---------- */
  var yearly = false;
  function money(n) { return "$" + (Number.isInteger(n) ? n : n.toFixed(2).replace(/\.?0+$/, "")); }
  function refreshPrices() {
    document.querySelectorAll(".plan").forEach(function (plan) {
      var price = yearly ? parseFloat(plan.getAttribute("data-yearly")) : parseFloat(plan.getAttribute("data-monthly"));
      var el = plan.querySelector("[data-price]");
      if (el) el.textContent = money(price);
    });
    $("lblMonthly").classList.toggle("on", !yearly);
    $("lblYearly").classList.toggle("on", yearly);
    $("billingToggle").setAttribute("aria-checked", String(yearly));
    updateCalc();
  }
  $("billingToggle").addEventListener("click", function () {
    yearly = !yearly;
    refreshPrices();
  });

  /* ---------- Pricing calculator ---------- */
  function updateCalc() {
    var seats = parseInt($("seats").value, 10);
    var perUser = parseFloat($("calcPlan").value);
    if (yearly) perUser = perUser * 0.8;
    $("seatCount").textContent = seats + (seats === 1 ? " person" : " people");
    $("calcTotal").textContent = "$" + Math.round(seats * perUser).toLocaleString() + " / month";
    $("calcNote").textContent = yearly ? "(yearly billing — 20% saved)" : "(monthly billing)";
  }
  $("seats").addEventListener("input", updateCalc);
  $("calcPlan").addEventListener("change", updateCalc);
  refreshPrices();

  /* ---------- Testimonial slider ---------- */
  var quotes = [
    { t: "\"We replaced four tools with Flowdesk in a week. Our Monday meeting went from 60 minutes to 15.\"", a: "— Priya S., Operations Lead, logistics startup" },
    { t: "\"The workload view alone is worth it. I finally see who's drowning before they burn out.\"", a: "— Daniel M., Engineering Manager, fintech" },
    { t: "\"Handoffs used to live in chat threads. Now nothing gets lost — our release cycle is a full day shorter.\"", a: "— Aisha K., Product Lead, health-tech" },
    { t: "\"Setup took two minutes, and support answered in four. Easiest tool decision we've made.\"", a: "— Rohan T., Founder, design agency" }
  ];
  var qi = 0, timer = null;
  function showQuote(i) {
    qi = (i + quotes.length) % quotes.length;
    $("quoteText").textContent = quotes[qi].t;
    $("quoteAuthor").textContent = quotes[qi].a;
    $("quoteDots").textContent = quotes.map(function (_, k) { return k === qi ? "●" : "○"; }).join(" ");
  }
  function auto() { timer = setInterval(function () { showQuote(qi + 1); }, 6000); }
  $("prevQuote").addEventListener("click", function () { clearInterval(timer); showQuote(qi - 1); auto(); });
  $("nextQuote").addEventListener("click", function () { clearInterval(timer); showQuote(qi + 1); auto(); });
  showQuote(0);
  auto();

  /* ---------- FAQ accordion (one open at a time) ---------- */
  document.querySelectorAll(".faq-q").forEach(function (btn) {
    btn.addEventListener("click", function () {
      var answer = btn.parentElement.querySelector(".faq-a");
      var wasOpen = btn.getAttribute("aria-expanded") === "true";
      document.querySelectorAll(".faq-q").forEach(function (b) { b.setAttribute("aria-expanded", "false"); });
      document.querySelectorAll(".faq-a").forEach(function (a) { a.hidden = true; });
      if (!wasOpen) { btn.setAttribute("aria-expanded", "true"); answer.hidden = false; }
    });
  });

  /* ---------- Exit-intent email capture (once per session) ---------- */
  var shown = false;
  try { shown = sessionStorage.getItem("flowdesk-exit-shown") === "1"; } catch (e) {}
  document.addEventListener("mouseout", function (e) {
    if (shown || !e.relatedTarget && e.clientY <= 8) {
      if (shown) return;
      shown = true;
      try { sessionStorage.setItem("flowdesk-exit-shown", "1"); } catch (err) {}
      $("exitModal").hidden = false;
    }
  });
  // The condition above: mouse leaving the top of the viewport.
  $("exitClose").addEventListener("click", function () { $("exitModal").hidden = true; });
  $("exitModal").addEventListener("click", function (e) { if (e.target === this) this.hidden = true; });
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") $("exitModal").hidden = true; });
  $("exitForm").addEventListener("submit", function (e) {
    e.preventDefault();
    if (!emailOk($("exitEmail").value.trim())) { $("exitEmail").focus(); return; }
    $("exitForm").hidden = true;
    $("exitOk").hidden = false;
  });
})();
