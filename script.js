/* =========================
   ACTIVE NAV LINK
   ========================= */

// Determine current page
const currentPage = location.pathname.split("/").pop() || "index.html";

// Highlight active navigation link
document.querySelectorAll(".nav-links a").forEach(link => {
  if (link.getAttribute("href") === currentPage) {
    link.classList.add("active");
  }
});


/* =========================
   LIGHT / DARK MODE TOGGLE
   ========================= */

const toggleBtn = document.getElementById("theme-toggle");
const body = document.body;

// Apply saved theme on load
const savedTheme = localStorage.getItem("theme");

if (savedTheme === "light") {
  body.classList.add("light");
  toggleBtn.textContent = "🌞";
} else {
  toggleBtn.textContent = "🌙";
}

// Toggle theme on click
toggleBtn.addEventListener("click", () => {
  body.classList.toggle("light");

  const isLight = body.classList.contains("light");

  toggleBtn.textContent = isLight ? "🌞" : "🌙";
  localStorage.setItem("theme", isLight ? "light" : "dark");
});
