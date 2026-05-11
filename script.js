// ── MOBILE MENU ──────────────────────────────
function toggleMenu() {
  document.querySelector(".nav-links").classList.toggle("show");
  document.querySelector(".nav-actions").classList.toggle("show");
}
document.addEventListener("click", function(e) {
  const navbar = document.querySelector(".navbar");
  if (navbar && !navbar.contains(e.target)) {
    document.querySelector(".nav-links")?.classList.remove("show");
    document.querySelector(".nav-actions")?.classList.remove("show");
  }
});

// ── SIMPLE AUTH ROUTER ───────────────────────
// Pages that require login to access
const PROTECTED_PAGES = ['dashboard.html'];
// Pages that should redirect to dashboard if already logged in
const AUTH_PAGES = ['login.html', 'register.html'];

function isLoggedIn() {
  return sessionStorage.getItem('fiti_user') !== null;
}

function getUser() {
  const u = sessionStorage.getItem('fiti_user');
  return u ? JSON.parse(u) : null;
}

(function routerGuard() {
  const page = location.pathname.split("/").pop() || "index.html";
  if (PROTECTED_PAGES.includes(page) && !isLoggedIn()) {
    window.location.href = 'login.html';
    return;
  }
  if (AUTH_PAGES.includes(page) && isLoggedIn()) {
    window.location.href = 'dashboard.html';
    return;
  }
})();

// ── UPDATE NAV based on auth state ───────────
(function updateNav() {
  const actions = document.querySelector('.nav-actions');
  if (!actions) return;
  if (isLoggedIn()) {
    const user = getUser();
    actions.innerHTML = `
      <span style="font-size:14px; color:var(--green); font-weight:500;">Hi, ${user.name}</span>
      <a class="btn btn-primary" href="dashboard.html">My Dashboard</a>
      <button class="btn" onclick="handleLogout()">Log Out</button>
    `;
  }
})();

// ── FORM HANDLERS ────────────────────────────
function handleLogin() {
  const email = document.getElementById("loginEmail")?.value.trim();
  const password = document.getElementById("loginPassword")?.value.trim();
  if (!email || !password) { showToast("Please fill in all fields.", "error"); return; }
  if (!isValidEmail(email)) { showToast("Please enter a valid email address.", "error"); return; }
  // Demo: accept any valid email/password
  const name = email.split('@')[0].replace(/[._]/g,' ').replace(/\b\w/g,c=>c.toUpperCase());
  sessionStorage.setItem('fiti_user', JSON.stringify({ name, email }));
  showToast("Login successful — welcome back!", "success");
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
}

function handleRegister() {
  const first = document.getElementById("regFirst")?.value.trim();
  const last = document.getElementById("regLast")?.value.trim();
  const email = document.getElementById("regEmail")?.value.trim();
  const password = document.getElementById("regPassword")?.value.trim();
  if (!first || !email || !password) { showToast("Please fill in all required fields.", "error"); return; }
  if (!isValidEmail(email)) { showToast("Please enter a valid email address.", "error"); return; }
  if (password.length < 6) { showToast("Password must be at least 6 characters.", "error"); return; }
  const name = (first + (last ? ' ' + last : ''));
  sessionStorage.setItem('fiti_user', JSON.stringify({ name, email }));
  showToast("Account created — welcome to FITILearn!", "success");
  setTimeout(() => { window.location.href = 'dashboard.html'; }, 1200);
}

function handleLogout() {
  sessionStorage.removeItem('fiti_user');
  showToast("You've been logged out.", "success");
  setTimeout(() => { window.location.href = 'index.html'; }, 1000);
}

function handleInstitution() {
  showToast("Institution registration received — our team will contact you within 24 hours.", "success");
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
    position:fixed;bottom:28px;left:50%;transform:translateX(-50%);
    background:${type==="success"?"#003f35":"#c0392b"};
    color:white;padding:14px 28px;border-radius:10px;
    font-family:'DM Sans',sans-serif;font-size:15px;
    box-shadow:0 8px 32px rgba(0,0,0,0.2);z-index:9999;
    animation:slideUp 0.3s ease;max-width:90vw;text-align:center;
  `;
  const style = document.createElement("style");
  style.textContent = `@keyframes slideUp{from{opacity:0;transform:translateX(-50%) translateY(16px)}to{opacity:1;transform:translateX(-50%) translateY(0)}}`;
  document.head.appendChild(style);
  document.body.appendChild(toast);
  setTimeout(()=>{toast.style.opacity="0";toast.style.transition="opacity 0.4s";setTimeout(()=>toast.remove(),400);},3500);
}

// ── COURSE FILTER ────────────────────────────
function filterCourses(cat, btn) {
  document.querySelectorAll(".filter-btn").forEach(b => b.classList.remove("active"));
  btn.classList.add("active");
  document.querySelectorAll("#courseGrid .card").forEach(card => {
    card.style.display = (cat === "all" || card.dataset.cat === cat) ? "" : "none";
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