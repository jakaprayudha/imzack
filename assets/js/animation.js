/* =========================================================
   ZACK PORTFOLIO
   Scroll Animations
   ========================================================= */

function initAnimations() {
  const animatedElements = document.querySelectorAll(
    ".fade-up, .fade-in, .scale-in, .stagger-item",
  );

  if (!animatedElements.length) {
    return;
  }

  /* =========================
       Observer
       ========================= */

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        entry.target.classList.add("is-visible");

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.12,
      rootMargin: "0px 0px -40px 0px",
    },
  );

  animatedElements.forEach((element) => {
    observer.observe(element);
  });
}
