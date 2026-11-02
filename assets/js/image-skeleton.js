/* =========================================================
   ZACK PORTFOLIO
   Image Skeleton Loader
   Shows a shimmer placeholder on image containers until the
   image finishes loading, then fades it in.
   ========================================================= */

(() => {
  const CONTAINER_SELECTOR = [
    ".hero-image-frame",
    ".about-image-frame",
    ".product-image",
    ".product-showcase-image",
    ".project-showcase-image",
  ].join(",");

  const markLoaded = (img) => {
    img.classList.add("img-loaded");

    const container = img.closest(CONTAINER_SELECTOR);
    if (container) {
      container.classList.remove("img-skeleton");
    }
  };

  const attach = (img) => {
    const container = img.closest(CONTAINER_SELECTOR);
    if (!container) return;

    // Already cached/loaded before this script ran
    if (img.complete && img.naturalWidth > 0) {
      markLoaded(img);
      return;
    }

    container.classList.add("img-skeleton");

    img.addEventListener("load", () => markLoaded(img), { once: true });

    img.addEventListener(
      "error",
      () => container.classList.remove("img-skeleton"),
      { once: true },
    );
  };

  const init = () => {
    const imgSelector = CONTAINER_SELECTOR.split(",")
      .map((selector) => `${selector} img`)
      .join(",");

    document.querySelectorAll(imgSelector).forEach(attach);
  };

  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", init);
  } else {
    init();
  }
})();
