/* =========================================================
   ZACK PORTFOLIO
   Navbar
   ========================================================= */

function initNavbar() {
  const navbar = document.querySelector(".navbar");
  const menuToggle = document.querySelector(".navbar-toggle");
  const navMenu = document.querySelector(".navbar-menu");
  const navLinks = document.querySelectorAll(".navbar-link");

  if (!navbar) {
    return;
  }

  /* =========================
       Sticky Navbar
       ========================= */

  const handleScroll = () => {
    if (window.scrollY > 30) {
      navbar.classList.add("is-scrolled");
    } else {
      navbar.classList.remove("is-scrolled");
    }
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  handleScroll();

  /* =========================
       Mobile Menu
       ========================= */

  if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", () => {
      const isOpen = navMenu.classList.toggle("is-open");

      menuToggle.classList.toggle("is-active", isOpen);

      document.body.classList.toggle("menu-open", isOpen);

      menuToggle.setAttribute("aria-expanded", String(isOpen));
    });

    /* Close when clicking navigation */

    navLinks.forEach((link) => {
      link.addEventListener("click", () => {
        navMenu.classList.remove("is-open");
        menuToggle.classList.remove("is-active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      });
    });

    /* Close when clicking outside */

    document.addEventListener("click", (event) => {
      const clickedInsideNavbar = navbar.contains(event.target);

      if (!clickedInsideNavbar) {
        navMenu.classList.remove("is-open");
        menuToggle.classList.remove("is-active");

        document.body.classList.remove("menu-open");

        menuToggle.setAttribute("aria-expanded", "false");
      }
    });
  }

  /* =========================
       Active Navigation
       ========================= */

  const currentPath = window.location.pathname.split("/").pop() || "index.html";

  navLinks.forEach((link) => {
    const href = link.getAttribute("href");

    if (!href) {
      return;
    }

    const linkPath = href.split("/").pop();

    if (
      linkPath === currentPath ||
      (currentPath === "" && linkPath === "index.html")
    ) {
      link.classList.add("active");
    }
  });
}
