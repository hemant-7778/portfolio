// ============ DARK MODE TOGGLE ============
const toggle = document.getElementById("theme-toggle");
const body = document.body;

// Check for saved theme preference or default to light mode
const savedTheme = localStorage.getItem("theme") || "light";
if (savedTheme === "dark") {
  body.classList.add("dark");
  toggle.textContent = "☀️";
}

toggle.addEventListener("click", () => {
  body.classList.toggle("dark");
  const isDark = body.classList.contains("dark");
  toggle.textContent = isDark ? "☀️" : "🌙";
  localStorage.setItem("theme", isDark ? "dark" : "light");

  // Add rotation animation
  toggle.style.animation = "none";
  setTimeout(() => {
    toggle.style.animation = "spin 0.6s ease-in-out";
  }, 10);
});

// Add spin animation
const style = document.createElement("style");
style.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg) scale(1); }
    50% { transform: rotate(180deg) scale(1.1); }
    100% { transform: rotate(360deg) scale(1); }
  }
`;
document.head.appendChild(style);

// ============ SMOOTH SCROLL FOR NAVIGATION ============
document.querySelectorAll("nav a").forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault();
    const targetId = this.getAttribute("href");
    const targetSection = document.querySelector(targetId);
    if (targetSection) {
      targetSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  });
});

// ============ SCROLL REVEAL ANIMATION ============
const observerOptions = {
  threshold: 0.1,
  rootMargin: "0px 0px -50px 0px",
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = "1";
      entry.target.style.transform = "translateY(0)";
      entry.target.style.pointerEvents = "auto";
    }
  });
}, observerOptions);

// Observe skill categories and project cards
document
  .querySelectorAll(".skill-category, .project-card, .contact-item")
  .forEach((el) => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.7s cubic-bezier(0.34, 1.56, 0.64, 1)";
    el.style.pointerEvents = "none";
    observer.observe(el);
  });

// ============ NAVBAR BACKGROUND ON SCROLL ============
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (window.scrollY > 50) {
    navbar.style.boxShadow = "0 12px 40px rgba(0, 119, 181, 0.25)";
    navbar.style.background = body.classList.contains("dark")
      ? "rgba(15, 23, 42, 0.95)"
      : "rgba(245, 247, 251, 0.95)";
  } else {
    navbar.style.boxShadow = "0 4px 30px rgba(0, 119, 181, 0.1)";
    navbar.style.background = body.classList.contains("dark")
      ? "rgba(255, 255, 255, 0.08)"
      : "rgba(255, 255, 255, 0.6)";
  }
});

// ============ ACTIVE NAVIGATION LINK ============
window.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav a");

  let currentSection = "";

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;
    if (window.pageYOffset >= sectionTop - 200) {
      currentSection = section.getAttribute("id");
    }
  });

  navLinks.forEach((link) => {
    link.style.color = "";
    link.style.fontWeight = "";
    if (link.getAttribute("href") === `#${currentSection}`) {
      link.style.color = "#0077b5";
      link.style.fontWeight = "900";
    }
  });
});

// ============ ENHANCED BUTTON INTERACTIONS ============
document.querySelectorAll(".btn, .social-btn").forEach((btn) => {
  btn.addEventListener("mouseenter", function () {
    this.style.transform = "translateY(-5px) scale(1.02)";
  });
  btn.addEventListener("mouseleave", function () {
    this.style.transform = "translateY(0) scale(1)";
  });

  btn.addEventListener("click", function (e) {
    const ripple = document.createElement("span");
    const rect = this.getBoundingClientRect();
    const size = Math.max(rect.width, rect.height);
    const x = e.clientX - rect.left - size / 2;
    const y = e.clientY - rect.top - size / 2;

    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = x + "px";
    ripple.style.top = y + "px";
  });
});

// ============ PROFILE IMAGE PARALLAX EFFECT ============
const profileImg = document.querySelector(".profile-img");
if (profileImg) {
  window.addEventListener("mousemove", (e) => {
    const rect = profileImg.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;

    const rotateX = (e.clientY - centerY) / 10;
    const rotateY = (e.clientX - centerX) / 10;

    profileImg.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`;
  });

  document.addEventListener("mouseleave", () => {
    profileImg.style.transform = "perspective(1000px) rotateX(0) rotateY(0)";
  });
}

// ============ MOUSE MOVE EFFECT ON HERO ============
const hero = document.querySelector(".hero");
if (hero) {
  document.addEventListener("mousemove", (e) => {
    const x = (e.clientX / window.innerWidth) * 20;
    const y = (e.clientY / window.innerHeight) * 20;

    const heroBefore = hero.querySelector("::before");
    if (heroBefore) {
      hero.style.backgroundPosition = `${x}px ${y}px`;
    }
  });
}

// ============ COUNTER ANIMATION FOR STATS ============
function animateCounter(element, target, duration = 2000) {
  let current = 0;
  const increment = target / (duration / 16);

  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current);
  }, 16);
}

// ============ CONTACT FORM FUNCTIONALITY (Optional) ============
// If you add a contact form, uncomment and customize this:
/*
const contactForm = document.querySelector(".contact-form");
if (contactForm) {
  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();
    // Add your form submission logic here
    alert("Thank you for reaching out! I'll get back to you soon.");
    contactForm.reset();
  });
}
*/

// ============ PAGE LOAD ANIMATION ============
window.addEventListener("load", () => {
  const heroContent = document.querySelector(".hero-content");
  if (heroContent) {
    heroContent.style.animation = "slideUp 0.8s ease-out forwards";
  }
});

// ============ CURSOR EFFECTS (Optional) ============
document.addEventListener("mousemove", (e) => {
  // Optional: Add custom cursor effects here
});
