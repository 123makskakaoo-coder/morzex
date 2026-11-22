(() => {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  /* ---------- Starfield ---------- */
  const canvas = document.getElementById("stars");
  const ctx = canvas.getContext("2d");
  let stars = [];
  let width = 0;
  let height = 0;

  function makeStars() {
    const count = Math.min(240, Math.round((width * height) / 9000));
    stars = Array.from({ length: count }, () => ({
      x: Math.random() * width,
      y: Math.random() * height,
      r: Math.random() * 1.2 + 0.3,
      alpha: Math.random() * 0.5 + 0.12,
      twinkle: Math.random() * 0.012 + 0.002,
      dir: Math.random() > 0.5 ? 1 : -1,
      speed: Math.random() * 0.05 + 0.01,
    }));
  }

  function resizeCanvas() {
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    width = window.innerWidth;
    height = window.innerHeight;
    canvas.width = Math.floor(width * dpr);
    canvas.height = Math.floor(height * dpr);
    canvas.style.width = width + "px";
    canvas.style.height = height + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    makeStars();
    if (reduceMotion) drawStars(false);
  }

  function drawStars(animate) {
    ctx.clearRect(0, 0, width, height);
    for (const star of stars) {
      if (animate) {
        star.alpha += star.twinkle * star.dir;
        if (star.alpha <= 0.08 || star.alpha >= 0.75) star.dir *= -1;
        star.y -= star.speed;
        if (star.y < -2) {
          star.y = height + 2;
          star.x = Math.random() * width;
        }
      }
      ctx.beginPath();
      ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
      ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
      ctx.fill();
    }
    if (animate) requestAnimationFrame(() => drawStars(true));
  }

  resizeCanvas();
  if (!reduceMotion) drawStars(true);

  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(resizeCanvas, 150);
  });

  /* ---------- Header ---------- */
  const header = document.getElementById("header");
  const onScroll = () => header.classList.toggle("is-scrolled", window.scrollY > 10);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  /* ---------- Mobile menu ---------- */
  const burger = document.getElementById("burger");
  const nav = document.getElementById("nav");

  function closeMenu() {
    nav.classList.remove("is-open");
    burger.setAttribute("aria-expanded", "false");
    burger.setAttribute("aria-label", "Открыть меню");
  }

  burger.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    burger.setAttribute("aria-expanded", String(open));
    burger.setAttribute("aria-label", open ? "Закрыть меню" : "Открыть меню");
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) closeMenu();
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") closeMenu();
  });

  /* ---------- Reveal on scroll ---------- */
  const revealItems = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && !reduceMotion) {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        }
      },
      { threshold: 0.12, rootMargin: "0px 0px -40px 0px" }
    );
    revealItems.forEach((item) => observer.observe(item));
  } else {
    revealItems.forEach((item) => item.classList.add("is-visible"));
  }

  /* ---------- Application form ---------- */
  const toast = document.getElementById("toast");
  let toastTimer;

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("is-show");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => toast.classList.remove("is-show"), 3200);
  }

  const form = document.getElementById("applyForm");

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.reportValidity()) return;

    const data = new FormData(form);
    const value = (name) => String(data.get(name) || "").trim();

    const lines = [
      "Заявка в MORZEX",
      `Ник: ${value("nick")}`,
      `ID в Standoff 2: ${value("gameId")}`,
      `Возраст: ${value("age")}`,
      `Опыт в Standoff 2: ${value("exp") || "не указан"}`,
      `Звание в Standoff 2: ${value("rank")}`,
      `Основная роль: ${value("role")}`,
    ];

    if (value("discord")) lines.push(`Discord: ${value("discord")}`);
    if (value("telegram")) lines.push(`Telegram: ${value("telegram")}`);

    const url = "https://t.me/wonnd2?text=" + encodeURIComponent(lines.join("\n"));
    window.open(url, "_blank", "noopener");
    showToast("Открываю Telegram — нажми «Отправить»");
  });

  /* ---------- Year ---------- */
  document.getElementById("year").textContent = new Date().getFullYear();
})();
