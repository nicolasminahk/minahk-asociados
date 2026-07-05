/* ==========================================================================
   MINAHK y Asociados — comportamiento
   Vanilla JS, sin dependencias. Respeta prefers-reduced-motion.
   ========================================================================== */
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- nav: fondo al scrollear ---------- */
  const nav = document.getElementById("nav");
  const onScroll = () => nav.classList.toggle("is-scrolled", window.scrollY > 40);
  window.addEventListener("scroll", onScroll, { passive: true });
  onScroll();

  /* ---------- menú mobile ---------- */
  const burger = document.getElementById("burger");
  const menu = document.getElementById("menu");
  const setMenu = (open) => {
    menu.classList.toggle("is-open", open);
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Cerrar menú" : "Abrir menú");
    menu.setAttribute("aria-hidden", String(!open));
    document.body.style.overflow = open ? "hidden" : "";
  };
  burger.addEventListener("click", () => setMenu(!menu.classList.contains("is-open")));
  menu.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  window.addEventListener("keydown", (e) => { if (e.key === "Escape") setMenu(false); });

  /* ---------- hero: titular palabra por palabra ---------- */
  const title = document.getElementById("heroTitle");
  if (title && !reduceMotion) {
    const words = title.textContent.trim().split(/\s+/);
    title.innerHTML = words
      .map((w, i) => `<span class="w" style="--d:${120 + i * 90}ms">${w}</span>`)
      .join(" ");
    requestAnimationFrame(() => requestAnimationFrame(() => title.classList.add("is-in")));
  }

  /* ---------- hero: parallax leve ---------- */
  const heroImg = document.getElementById("heroImg");
  if (heroImg && !reduceMotion) {
    let ticking = false;
    window.addEventListener("scroll", () => {
      if (ticking) return;
      ticking = true;
      requestAnimationFrame(() => {
        const y = window.scrollY;
        if (y < window.innerHeight) heroImg.style.transform = `translateY(${y * 0.22}px)`;
        ticking = false;
      });
    }, { passive: true });
  }

  /* ---------- reveal on scroll ---------- */
  const revealEls = document.querySelectorAll("[data-reveal]");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const io = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        el.style.setProperty("--d", (el.dataset.delay || 0) + "ms");
        el.classList.add("is-visible");
        io.unobserve(el);
      });
    }, { threshold: 0.15, rootMargin: "0px 0px -6% 0px" });
    revealEls.forEach((el) => io.observe(el));
  } else {
    revealEls.forEach((el) => el.classList.add("is-visible"));
  }

  /* ---------- stats: count-up ---------- */
  const counters = document.querySelectorAll(".js-count");
  const fmt = new Intl.NumberFormat("es-AR");
  const runCount = (el) => {
    const target = parseInt(el.dataset.target, 10) || 0;
    if (reduceMotion) { el.textContent = fmt.format(target); return; }
    const dur = 1600;
    const t0 = performance.now();
    const tick = (t) => {
      const p = Math.min((t - t0) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      el.textContent = fmt.format(Math.round(target * eased));
      if (p < 1) requestAnimationFrame(tick);
    };
    requestAnimationFrame(tick);
  };
  if ("IntersectionObserver" in window) {
    const ioC = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        runCount(e.target);
        ioC.unobserve(e.target);
      });
    }, { threshold: 0.6 });
    counters.forEach((el) => ioC.observe(el));
  } else {
    counters.forEach(runCount);
  }

  /* ---------- servicios: acordeón (uno abierto a la vez) ---------- */
  const services = Array.from(document.querySelectorAll(".service"));
  services.forEach((service) => {
    const head = service.querySelector(".service__head");
    head.addEventListener("click", () => {
      const isOpen = service.classList.contains("is-open");
      services.forEach((s) => {
        s.classList.remove("is-open");
        s.querySelector(".service__head").setAttribute("aria-expanded", "false");
      });
      if (!isOpen) {
        service.classList.add("is-open");
        head.setAttribute("aria-expanded", "true");
      }
    });
  });

  /* ---------- proyectos: filtros ---------- */
  const filtros = document.querySelectorAll(".filtro");
  const cards = document.querySelectorAll(".card");
  filtros.forEach((btn) => {
    btn.addEventListener("click", () => {
      filtros.forEach((b) => b.classList.remove("is-active"));
      btn.classList.add("is-active");
      const f = btn.dataset.filter;
      cards.forEach((card) => {
        const show = f === "todos" || card.dataset.cat === f;
        card.classList.toggle("is-hidden", !show);
      });
    });
  });

  /* ---------- proceso: progreso de la línea ---------- */
  const timeline = document.getElementById("timeline");
  if (timeline && "IntersectionObserver" in window) {
    const ioT = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (!e.isIntersecting) return;
        timeline.style.setProperty("--progress", "1");
        ioT.unobserve(timeline);
      });
    }, { threshold: 0.35 });
    ioT.observe(timeline);
  }

  /* ---------- formulario (solo frontend) ----------
     TODO backend: reemplazar este handler por un fetch() a un endpoint real
     (Resend, Formspree o API propia). Ejemplo:
       await fetch("https://api.ejemplo.com/contacto", {
         method: "POST",
         headers: { "Content-Type": "application/json" },
         body: JSON.stringify(Object.fromEntries(new FormData(form)))
       });
  ------------------------------------------------- */
  const form = document.getElementById("form");
  const formOk = document.getElementById("formOk");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (!form.checkValidity()) { form.reportValidity(); return; }
      form.reset();
      formOk.hidden = false;
      setTimeout(() => { formOk.hidden = true; }, 6000);
    });
  }

  /* ---------- año del footer ---------- */
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
})();
