/* =========================================================
   PROJECT FILTER
   ========================================================= */

function initProjectFilter() {
  const filterContainer = document.querySelector("[data-project-filters]");

  const projectContainer = document.querySelector("[data-projects]");

  if (!filterContainer || !projectContainer) {
    return;
  }

  const buttons = filterContainer.querySelectorAll("[data-filter]");

  const projects = projectContainer.querySelectorAll("[data-category]");

  const emptyState = document.querySelector("[data-projects-empty]");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      /* Active button */

      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");

      let visibleCount = 0;

      /* Filter projects */

      projects.forEach((project) => {
        const categories = (project.dataset.category || "")
          .toLowerCase()
          .split(" ");

        const show =
          filter === "all" || categories.includes(filter.toLowerCase());

        if (show) {
          project.style.display = "";

          visibleCount++;

          requestAnimationFrame(() => {
            project.classList.remove("filter-hidden");
          });
        } else {
          project.classList.add("filter-hidden");

          setTimeout(() => {
            if (project.classList.contains("filter-hidden")) {
              project.style.display = "none";
            }
          }, 200);
        }
      });

      /* Empty state */

      if (emptyState) {
        if (visibleCount === 0) {
          emptyState.style.display = "block";
        } else {
          emptyState.style.display = "none";
        }
      }
    });
  });
}
