/* =========================================================
   ZACK PORTFOLIO
   Contact Form
   ========================================================= */

function initContactForm() {
  const form = document.querySelector("[data-contact-form]");

  if (!form) {
    return;
  }

  const status = form.querySelector("[data-form-status]");

  form.addEventListener("submit", async (event) => {
    event.preventDefault();

    clearFormStatus();

    if (!form.checkValidity()) {
      form.reportValidity();

      return;
    }

    const submitButton = form.querySelector('button[type="submit"]');

    if (submitButton) {
      submitButton.disabled = true;
      submitButton.dataset.originalText = submitButton.textContent;

      submitButton.textContent = "Sending...";
    }

    try {
      /*
       * Backend/API integration
       * will be added later.
       */

      await new Promise((resolve) => setTimeout(resolve, 800));

      showFormStatus("success", "Thank you. Your message has been received.");

      form.reset();
    } catch (error) {
      console.error("Contact form error:", error);

      showFormStatus("error", "Something went wrong. Please try again.");
    } finally {
      if (submitButton) {
        submitButton.disabled = false;

        submitButton.textContent =
          submitButton.dataset.originalText || "Send Message";
      }
    }
  });

  function showFormStatus(type, message) {
    if (!status) {
      return;
    }

    status.hidden = false;

    status.className = `form-status ${type}`;

    status.textContent = message;
  }

  function clearFormStatus() {
    if (!status) {
      return;
    }

    status.hidden = true;
    status.textContent = "";
    status.className = "form-status";
  }
}
