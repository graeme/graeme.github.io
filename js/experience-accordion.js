window.Site = window.Site || {};

window.Site.initExperienceAccordion = function initExperienceAccordion() {
  var experienceAccordions = Array.prototype.slice.call(
    document.querySelectorAll(".experience-projects")
  );

  if (!experienceAccordions.length) {
    return;
  }

  experienceAccordions.forEach(function (detailsEl) {
    detailsEl.addEventListener("toggle", function () {
      if (!detailsEl.open) {
        return;
      }
      experienceAccordions.forEach(function (other) {
        if (other !== detailsEl) {
          other.open = false;
        }
      });
    });
  });
};
