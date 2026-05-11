// ── MOBILE MENU ──────────────────────────────
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
  document.querySelector(".nav-actions").classList.toggle("show");
}

// Close menu when clicking outside
document.addEventListener("click", function(e) {
  const navbar = document.querySelector(".navbar");
  if (navbar && !navbar.contains(e.target)) {
    document.querySelector(".nav-links")?.classList.remove("show");
    document.querySelector(".nav-actions")?.classList.remove("show");
  }
});

// ── FORM HANDLERS ────────────────────────────
function handleLogin() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value.trim();
  if (!email || !password) {
    showToast("Please fill in all fields.", "error");
    return;
  }
  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }
  showToast("Login successful — welcome back! (demo only)", "success");
}

function handleRegister() {
  const first = document.getElementById("regFirst")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const password = document.getElementById("regPassword")?.value.trim();

  if (!first || !email || !password) {
    showToast("Please fill in all required fields.", "error");
    return;
  }
  if (!isValidEmail(email)) {
    showToast("Please enter a valid email address.", "error");
    return;
  }
  if (password.length < 6) {
    showToast("Password must be at least 6 characters.", "error");
    return;
  }
  showToast("Account created — check your email for next steps. (demo only)", "success");
}

function handleInstitution() {
  showToast("Institution registration received — our team will contact you within 24 hours. (demo only)", "success");
}

// ── EMAIL VALIDATION ─────────────────────────
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
}

// ── TOAST NOTIFICATIONS ──────────────────────
function showToast(message, type = "success") {
  const existing = document.querySelector(".toast");
  if (existing) existing.remove();

  const toast = document.createElement("div");
  toast.className = "toast";
  toast.textContent = message;
  toast.style.cssText = `
    position: fixed; bottom: 28px; left: 50%; transform: translateX(-50%);
    background: ${type === "success" ? "#003f35" : "#c0392b"};
    color: white; padding: 14px 28px; border-radius: 10px;
    font-family: 'DM Sans', sans-serif; font-size: 15px;
    box-shadow: 0 8px 32px rgba(0,0,0,0.2); z-index: 9999;
    animation: slideUp 0.3s ease; max-width: 90vw; text-align: center;
  `;

  const style = document.createElement("style");
  style.textContent = `@keyframes slideUp { from { opacity:0; transform:translateX(-50%) translateY(16px); } to { opacity:1; transform:translateX(-50%) translateY(0); } }`;
  document.head.appendChild(style);

  document.body.appendChild(toast);
  setTimeout(() => { toast.style.opacity = "0"; toast.style.transition = "opacity 0.4s"; setTimeout(() => toast.remove(), 400); }, 3500);
}

// ── COURSE FILTER ────────────────────────────
function filterCourses(cat, btn) {
  // Update buttons
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");

  // Filter cards
  document.querySelectorAll("#courseGrid .card").forEach(card => {
    if (cat === "all" || card.dataset.cat === cat) {
      card.style.display = "";
    } else {
      card.style.display = "none";
    }
  });
}

// ── ACTIVE NAV ───────────────────────────────
(function() {
  const current = location.pathname.split("/").pop() || "index.html";
  document.querySelectorAll(".nav-links a").forEach(link => {
    const href = link.getAttribute("href");
    if (href === current) link.classList.add("active");
  });
})();
