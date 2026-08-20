/* =========================================================
   ZACK PORTFOLIO
   Counter Animation
   ========================================================= */

function initCounters() {
  const counters = document.querySelectorAll("[data-counter]");

  if (!counters.length) {
    return;
  }

  const animateCounter = (element) => {
    const target = Number(element.dataset.counter);

    const duration = Number(element.dataset.duration) || 1800;

    const suffix = element.dataset.suffix || "";

    let startTime = null;

    const updateCounter = (currentTime) => {
      if (!startTime) {
        startTime = currentTime;
      }

      const elapsed = currentTime - startTime;

      const progress = Math.min(elapsed / duration, 1);

      /* Ease out */

      const easedProgress = 1 - Math.pow(1 - progress, 3);

      const currentValue = Math.floor(easedProgress * target);

      element.textContent = currentValue + suffix;

      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        element.textContent = target + suffix;
      }
    };

    requestAnimationFrame(updateCounter);
  };

  const observer = new IntersectionObserver(
    (entries, observerInstance) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) {
          return;
        }

        animateCounter(entry.target);

        observerInstance.unobserve(entry.target);
      });
    },
    {
      threshold: 0.6,
    },
  );

  counters.forEach((counter) => {
    observer.observe(counter);
  });
}
