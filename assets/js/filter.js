/* =========================================================
   ZACK PORTFOLIO
   Project Filter
   ========================================================= */

function initProjectFilter() {
  const filterContainer = document.querySelector("[data-project-filters]");

  const projectContainer = document.querySelector("[data-projects]");

  if (!filterContainer || !projectContainer) {
    return;
  }

  const buttons = filterContainer.querySelectorAll("[data-filter]");

  if (!buttons.length) {
    return;
  }

  /* =========================
       Filter Function
       ========================= */

  const applyFilter = (category) => {
    const cards = projectContainer.querySelectorAll("[data-project-id]");

    cards.forEach((card) => {
      const cardCategory = card.dataset.category;

      const shouldShow = category === "all" || cardCategory === category;

      if (shouldShow) {
        card.hidden = false;

        requestAnimationFrame(() => {
          card.classList.add("is-visible");
        });
      } else {
        card.hidden = true;

        card.classList.remove("is-visible");
      }
    });
  };

  /* =========================
       Button Events
       ========================= */

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const category = button.dataset.filter;

      buttons.forEach((item) => {
        item.classList.remove("active");
      });

      button.classList.add("active");

      applyFilter(category);
    });
  });

  /* =========================
       Default Filter
       ========================= */

  const activeButton = filterContainer.querySelector('[data-filter="all"]');

  if (activeButton) {
    activeButton.classList.add("active");
  }

  document.addEventListener(
    "projectsLoaded",
    () => {
      applyFilter("all");
    },
    { once: true },
  );
}
