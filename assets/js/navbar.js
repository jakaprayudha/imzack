/* =========================================================
   NAVBAR
   ========================================================= */

function initNavbar() {
  const navbar = document.querySelector(".site-navbar");

  if (!navbar) {
    return;
  }

  /* =======================================================
     RESOLVE NAVIGATION PATH
     ======================================================= */

  resolveNavbarPaths();

  /* =======================================================
     MOBILE MENU
     ======================================================= */

  const menuToggle = navbar.querySelector(".menu-toggle");

  const navMenu = navbar.querySelector(".navbar-nav");

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const active = menuToggle.classList.toggle("active");

      navMenu.classList.toggle("active");

      menuToggle.setAttribute("aria-expanded", active ? "true" : "false");
    });

    /* Close menu after clicking */

    navMenu.querySelectorAll("a").forEach((link) => {
      link.addEventListener("click", () => {
        menuToggle.classList.remove("active");

        navMenu.classList.remove("active");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });
  }

  /* =======================================================
     SCROLL EFFECT
     ======================================================= */

  updateNavbarScroll();

  window.addEventListener("scroll", updateNavbarScroll, {
    passive: true,
  });

  /* =======================================================
     ACTIVE MENU
     ======================================================= */

  setActiveNavLink();
}

/* =========================================================
   RESOLVE NAVBAR PATHS
   ========================================================= */

function resolveNavbarPaths() {
  /*
   * Check current location.
   *
   * ROOT:
   * /index.html
   *
   * PAGES:
   * /pages/about.html
   */

  const isPages = window.location.pathname.includes("/pages/");

  /*
   * Home
   */

  const homePath = isPages ? "../index.html" : "index.html";

  document.querySelectorAll("[data-home-link]").forEach((link) => {
    link.setAttribute("href", homePath);
  });

  /*
   * Internal pages
   */

  document.querySelectorAll("[data-page]").forEach((link) => {
    const page = link.dataset.page;

    if (!page) {
      return;
    }

    const pagePath = isPages ? `${page}.html` : `pages/${page}.html`;

    link.setAttribute("href", pagePath);
  });

  /*
   * Contact
   */

  document.querySelectorAll("[data-contact-link]").forEach((link) => {
    const contactPath = isPages ? "contact.html" : "pages/contact.html";

    link.setAttribute("href", contactPath);
  });
}

/* =========================================================
   NAVBAR SCROLL
   ========================================================= */

function updateNavbarScroll() {
  const navbar = document.querySelector(".site-navbar");

  if (!navbar) {
    return;
  }

  if (window.scrollY > 30) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
}

/* =========================================================
   ACTIVE NAV LINK
   ========================================================= */

function setActiveNavLink() {
  const currentPath = window.location.pathname;

  const currentFile = currentPath.split("/").pop();

  document.querySelectorAll(".navbar-nav a[data-page]").forEach((link) => {
    const page = link.dataset.page;

    const targetFile = `${page}.html`;

    if (currentFile === targetFile) {
      link.classList.add("active");
    } else {
      link.classList.remove("active");
    }
  });
}
