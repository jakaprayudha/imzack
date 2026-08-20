/* =========================================================
   ZACK PORTFOLIO
   Projects
   ========================================================= */

let portfolioProjects = [];

async function initProjects() {
  const projectContainer = document.querySelector("[data-projects]");

  if (!projectContainer) {
    return;
  }

  try {
    const response = await fetch("data/projects.json");

    if (!response.ok) {
      throw new Error("Failed to load projects.");
    }

    portfolioProjects = await response.json();

    renderProjects(portfolioProjects, projectContainer);

    /* Make available for filter.js */

    window.portfolioProjects = portfolioProjects;

    document.dispatchEvent(
      new CustomEvent("projectsLoaded", {
        detail: portfolioProjects,
      }),
    );
  } catch (error) {
    console.error("Project loading error:", error);

    projectContainer.innerHTML = `
            <div class="project-error">
                <p>
                    Unable to load projects.
                </p>
            </div>
        `;
  }
}

/* =========================
   Render Projects
   ========================= */

function renderProjects(projects, container) {
  if (!projects.length) {
    container.innerHTML = `
            <div class="project-empty">
                <p>No projects found.</p>
            </div>
        `;

    return;
  }

  container.innerHTML = projects
    .map((project) => {
      const technologies = Array.isArray(project.technologies)
        ? project.technologies
        : [];

      return `
                    <article
                        class="project-card"
                        data-project-id="${escapeHtml(project.id)}"
                        data-category="${escapeHtml(project.category || "")}"
                    >

                        <div class="project-image">
                            <img
                                src="${escapeHtml(project.image)}"
                                alt="${escapeHtml(project.title)}"
                                loading="lazy"
                            >
                        </div>

                        <div class="project-content">

                            <span class="project-category">
                                ${escapeHtml(project.category || "")}
                            </span>

                            <h3 class="project-title">
                                ${escapeHtml(project.title)}
                            </h3>

                            <p class="project-description">
                                ${escapeHtml(project.description || "")}
                            </p>

                            <div class="project-technologies">

                                ${technologies
                                  .map(
                                    (technology) => `
                                            <span class="badge">
                                                ${escapeHtml(technology)}
                                            </span>
                                        `,
                                  )
                                  .join("")}

                            </div>

                            ${
                              project.link
                                ? `
                                        <a
                                            href="${escapeHtml(project.link)}"
                                            class="project-link"
                                        >
                                            View Case Study →
                                        </a>
                                    `
                                : ""
                            }

                        </div>

                    </article>
                `;
    })
    .join("");
}

/* =========================
   HTML Escape
   ========================= */

function escapeHtml(value) {
  const div = document.createElement("div");

  div.textContent = String(value ?? "");

  return div.innerHTML;
}
