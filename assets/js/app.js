/* =========================================================
   ZACK PORTFOLIO
   Main Application
   ========================================================= */

document.addEventListener("DOMContentLoaded", async () => {
  console.log("Zack Portfolio initializing...");

  /*
   * Detect current page location
   *
   * index.html
   *      → ./components/
   *
   * pages/about.html
   *      → ../components/
   */

  const BASE_PATH = window.location.pathname.includes("/pages/") ? "../" : "";

  /* =====================================================
       LOAD COMPONENTS FIRST
       ===================================================== */

  await loadComponents(BASE_PATH);

  /* =====================================================
       INITIALIZE APPLICATION
       ===================================================== */

  if (typeof initNavbar === "function") {
    initNavbar();
  }

  if (typeof initAnimations === "function") {
    initAnimations();
  }

  if (typeof initCounters === "function") {
    initCounters();
  }

  if (typeof initProjects === "function") {
    initProjects();
  }

  if (typeof initProjectFilter === "function") {
    initProjectFilter();
  }

  if (typeof initContactForm === "function") {
    initContactForm();
  }

  /* =====================================================
       CURRENT YEAR
       ===================================================== */

  initCurrentYear();

  console.log("Zack Portfolio initialized.");
});

/* =========================================================
   COMPONENT LOADER
   ========================================================= */

async function loadComponents(BASE_PATH) {
  const components = {
    "component-loader": `${BASE_PATH}components/loader.html`,

    "component-navbar": `${BASE_PATH}components/navbar.html`,

    "component-footer": `${BASE_PATH}components/footer.html`,
  };

  /*
   * Load main components
   */

  for (const [elementId, componentPath] of Object.entries(components)) {
    const container = document.getElementById(elementId);

    if (!container) {
      console.warn(`Container #${elementId} tidak ditemukan.`);

      continue;
    }

    try {
      const response = await fetch(componentPath);

      if (!response.ok) {
        throw new Error(`HTTP ${response.status}`);
      }

      const html = await response.text();

      container.innerHTML = html;

      console.log(`✓ Component loaded: ${componentPath}`);
    } catch (error) {
      console.error(`✕ Failed loading component: ${componentPath}`, error);
    }
  }

  /*
   * Load social links AFTER
   * navbar/footer/components exist
   */

  await loadSocialLinks(BASE_PATH);
}

/* =========================================================
   SOCIAL LINKS
   ========================================================= */

async function loadSocialLinks(BASE_PATH) {
  const containers = document.querySelectorAll("[data-social-links]");

  if (!containers.length) {
    return;
  }

  try {
    const response = await fetch(`${BASE_PATH}components/social-links.html`);

    if (!response.ok) {
      throw new Error(`HTTP ${response.status}`);
    }

    const html = await response.text();

    containers.forEach((container) => {
      container.innerHTML = html;
    });

    console.log("✓ Social links loaded");
  } catch (error) {
    console.error("✕ Failed loading social-links.html", error);
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
