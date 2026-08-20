/* =========================================================
   ZACK PORTFOLIO
   Main Application
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Zack Portfolio initializing...");

  // Load HTML components first
  await loadComponents();

  // Initialize application
  initNavbar();
  initAnimations();
  initCounters();
  initProjects();
  initProjectFilter();
  initContactForm();

  // Utility
  initCurrentYear();

  console.log("Zack Portfolio initialized.");
});

/* =========================================================
   COMPONENT LOADER
   ========================================================= */

async function loadComponents() {
  const components = {
    "component-loader": "components/loader.html",

    "component-navbar": "components/navbar.html",

    "component-footer": "components/footer.html",
  };

  for (const [id, path] of Object.entries(components)) {
    const container = document.getElementById(id);

    if (!container) {
      console.warn(`Component container #${id} tidak ditemukan.`);

      continue;
    }

    try {
      const response = await fetch(path);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();

      container.innerHTML = html;

      console.log(`Component loaded: ${path}`);
    } catch (error) {
      console.error(`Failed loading component: ${path}`, error);
    }
  }

  // Load social links
  await loadSocialLinks();
}

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

async function loadSocialLinks() {
  const containers = document.querySelectorAll("[data-social-links]");

  if (!containers.length) {
    return;
  }

  try {
    const response = await fetch("components/social-links.html");

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    containers.forEach((container) => {
      container.innerHTML = html;
    });

    console.log("Component loaded: social-links.html");
  } catch (error) {
    console.error("Failed loading social-links.html", error);
  }
}

/* =========================================================
   CURRENT YEAR
   ========================================================= */

function initCurrentYear() {
  const yearElements = document.querySelectorAll("[data-current-year]");

  const currentYear = new Date().getFullYear();

  yearElements.forEach((element) => {
    element.textContent = currentYear;
  });
}
