(() => {
  "use strict";

  const header = document.getElementById("site-header");
  const menuToggle = document.getElementById("menu-toggle");
  const mobileMenu = document.getElementById("mobile-menu");
  const leadDialog = document.getElementById("lead-dialog");
  const leadForm = document.getElementById("lead-form");
  const whatsappNumber = "263775364959";
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  const setHeaderState = () => {
    header?.classList.toggle("is-scrolled", window.scrollY > 12);
  };

  const setMenu = (open) => {
    if (!menuToggle || !mobileMenu) {
      return;
    }

    menuToggle.setAttribute("aria-expanded", String(open));
    mobileMenu.hidden = !open;
  };

  const openLeadDialog = () => {
    if (!leadDialog?.open) {
      leadDialog.showModal();
    }
  };

  const closeLeadDialog = () => {
    if (leadDialog?.open) {
      leadDialog.close();
      sessionStorage.setItem("freshinnovLeadDismissed", "true");
    }
  };

  window.addEventListener("scroll", setHeaderState, { passive: true });
  setHeaderState();

  menuToggle?.addEventListener("click", () => {
    setMenu(menuToggle.getAttribute("aria-expanded") !== "true");
  });

  mobileMenu?.querySelectorAll("a, button").forEach((item) => {
    item.addEventListener("click", () => setMenu(false));
  });

  document.querySelectorAll("[data-open-lead]").forEach((button) => {
    button.addEventListener("click", openLeadDialog);
  });

  document.querySelectorAll("[data-close-lead]").forEach((button) => {
    button.addEventListener("click", closeLeadDialog);
  });

  leadDialog?.addEventListener("click", (event) => {
    if (event.target === leadDialog) {
      closeLeadDialog();
    }
  });

  leadForm?.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = String(formData.get("name") || "").trim();
    const business = String(formData.get("business") || "").trim();
    const phone = String(formData.get("phone") || "").trim();
    const message = [
      "Hi Freshinnov Labs, I need a website quote.",
      `Name: ${name}`,
      `Business Type: ${business}`,
      `Phone Number: ${phone}`
    ].join("\n");

    window.open(`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(message)}`, "_blank", "noopener");
    leadForm.reset();
    closeLeadDialog();
  });

  if (!sessionStorage.getItem("freshinnovLeadDismissed")) {
    window.setTimeout(() => {
      if (!leadDialog?.open) {
        openLeadDialog();
      }
    }, reducedMotion ? 0 : 6200);
  }

  const slides = [...document.querySelectorAll(".testimonial-slide")];
  const dots = [...document.querySelectorAll("[data-testimonial-dot]")];
  const previousButton = document.querySelector("[data-testimonial-prev]");
  const nextButton = document.querySelector("[data-testimonial-next]");
  let activeSlide = 0;
  let testimonialTimer;

  const showTestimonial = (index) => {
    activeSlide = (index + slides.length) % slides.length;
    slides.forEach((slide, slideIndex) => slide.classList.toggle("is-active", slideIndex === activeSlide));
    dots.forEach((dot, dotIndex) => dot.classList.toggle("is-active", dotIndex === activeSlide));
  };

  const restartTestimonials = () => {
    if (reducedMotion || slides.length < 2) {
      return;
    }

    window.clearInterval(testimonialTimer);
    testimonialTimer = window.setInterval(() => showTestimonial(activeSlide + 1), 5600);
  };

  previousButton?.addEventListener("click", () => {
    showTestimonial(activeSlide - 1);
    restartTestimonials();
  });

  nextButton?.addEventListener("click", () => {
    showTestimonial(activeSlide + 1);
    restartTestimonials();
  });

  dots.forEach((dot) => {
    dot.addEventListener("click", () => {
      showTestimonial(Number(dot.dataset.testimonialDot));
      restartTestimonials();
    });
  });

  if (slides.length) {
    showTestimonial(0);
    restartTestimonials();
  }
})();
