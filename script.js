document.addEventListener("DOMContentLoaded", () => {

  /* =========================
     NAV INJECTION
     ========================= */

  fetch("nav.html")
    .then(res => res.text())
    .then(html => {
      document.getElementById("nav-placeholder").innerHTML = html;

      initNav();
      initThemeToggle();
    });

  /* =========================
     NAV + HAMBURGER
     ========================= */

  function initNav() {
    const navToggle = document.querySelector(".nav-toggle");
    const navLinks = document.querySelector(".nav-links");

    if (!navToggle || !navLinks) return;

    navToggle.addEventListener("click", () => {
      navLinks.classList.toggle("open");
      navToggle.textContent =
        navLinks.classList.contains("open") ? "✕" : "☰";
    });

    navLinks.querySelectorAll("a").forEach(link => {
      link.addEventListener("click", () => {
        navLinks.classList.remove("open");
        navToggle.textContent = "☰";
      });
    });
  }

  /* =========================
     THEME TOGGLE
     ========================= */

  function initThemeToggle() {
    const toggleBtn = document.getElementById("theme-toggle");
    if (!toggleBtn) return;

    const body = document.body;
    const savedTheme = localStorage.getItem("theme");

    if (savedTheme === "light") {
      body.classList.add("light");
      toggleBtn.textContent = "🌞";
    } else {
      toggleBtn.textContent = "🌙";
    }

    toggleBtn.addEventListener("click", () => {
      body.classList.toggle("light");
      const isLight = body.classList.contains("light");
      toggleBtn.textContent = isLight ? "🌞" : "🌙";
      localStorage.setItem("theme", isLight ? "light" : "dark");
    });
  }

  /* =========================
     CAROUSEL (OUTREACH)
     ========================= */

  const carousel = document.querySelector(".carousel");

  if (carousel) {
    const track = carousel.querySelector(".carousel-track");
    const slides = carousel.querySelectorAll(".carousel-slide");
    const nextBtn = carousel.querySelector(".carousel-btn.next");
    const prevBtn = carousel.querySelector(".carousel-btn.prev");

    let index = 0;

    function updateCarousel() {
      track.style.transform = `translateX(-${index * 100}%)`;
    }

    nextBtn.addEventListener("click", () => {
      index = (index + 1) % slides.length;
      updateCarousel();
    });

    prevBtn.addEventListener("click", () => {
      index = (index - 1 + slides.length) % slides.length;
      updateCarousel();
    });
  }

});
