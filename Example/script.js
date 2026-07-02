// Smooth scrolling for nav links
document.querySelectorAll('.nav-links a').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    if (this.getAttribute('href').startsWith("#")) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth'
      });
    }
  });
});

// Mobile navbar toggle

const navbar = document.querySelector('.navbar') || document.querySelector('.blog-nav');
const nav = document.querySelector('.navbar nav') || document.querySelector('.blog-nav');
const navLinks = document.querySelector('.nav-links') || document.querySelector('.blog-nav ul');
const themeToggle = document.getElementById('theme-toggle');
let menuBtn;

function createMenuButton() {

  if (!navbar || !nav) return;

  menuBtn = document.createElement('div');
  menuBtn.classList.add('menu-btn');
  menuBtn.innerHTML = "☰"; // hamburger icon

  navbar.insertBefore(menuBtn, nav);

  menuBtn.addEventListener('click', () => {

    if (navLinks) {
    navLinks.classList.toggle('active');

      // Close menu when clicking outside
      document.addEventListener('click', closeMenuOnClickOutside);
    }
  });
}

function closeMenuOnClickOutside(event) {
  if (navbar && !navbar.contains(event.target)) {
    if (navLinks) {
      navLinks.classList.remove('active');
    }
    document.removeEventListener('click', closeMenuOnClickOutside);
  }
}

// only show menu button on mobile
if (window.innerWidth <= 768) {
  createMenuButton();
}
window.addEventListener('resize', () => {
  if (window.innerWidth <= 768 && !menuBtn) {
    createMenuButton();
  } else if (window.innerWidth > 768 && menuBtn) {
    menuBtn.remove();
    menuBtn = null;

    if (navLinks) {
    navLinks.classList.remove('active');
    }
  }
});

// Blog post redirect
document.querySelectorAll(".blog-post").forEach((post) => {
  post.addEventListener("click", () => {
    const link = post.getAttribute("data-link");
    window.location.href = link;
  });
});

// Fade-in effect on scroll
const faders = document.querySelectorAll("section, .project-card, .blog-post");

const appearOptions = {
  threshold: 0.2,
  rootMargin: "0px 0px -50px 0px"
};

const appearOnScroll = new IntersectionObserver(function(entries, observer) {
  entries.forEach(entry => {
    if (!entry.isIntersecting) return;
    entry.target.classList.add("fade-in");
    observer.unobserve(entry.target);
  });
}, appearOptions);

faders.forEach(fader => {
  appearOnScroll.observe(fader);

});

// Dark Mode Toggle - Wait for DOM to load
document.addEventListener('DOMContentLoaded', () => {
  const themeToggle = document.getElementById('theme-toggle');
  const body = document.body;

  // Check for saved theme preference or default to light mode
  const currentTheme = localStorage.getItem('theme') || 'light';
  if (currentTheme === 'dark') {
    body.classList.add('dark');
    updateThemeIcon();
  }

  function updateThemeIcon() {
    if (!themeToggle) return;

    const moonIcon = themeToggle.querySelector('.fa-moon');
    const sunIcon = themeToggle.querySelector('.fa-sun');

    if (body.classList.contains('dark')) {
      moonIcon.style.display = 'none';
      sunIcon.style.display = 'inline';
    } else {
      moonIcon.style.display = 'inline';
      sunIcon.style.display = 'none';
    }
  }

  if (themeToggle) {
    themeToggle.addEventListener('click', () => {
      body.classList.toggle('dark');

      // Save theme preference
      const theme = body.classList.contains('dark') ? 'dark' : 'light';
      localStorage.setItem('theme', theme);

      updateThemeIcon();
    });
  }
});