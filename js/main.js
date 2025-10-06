window.Site = window.Site || {};

(function () {
  if (typeof window.Site.initNavigation === "function") {
    window.Site.initNavigation();
  }

  if (typeof window.Site.initExperienceAccordion === "function") {
    window.Site.initExperienceAccordion();
  }

  var carousel = { isOpen: function () { return false; }, close: function () {}, showNext: function () {}, showPrev: function () {} };
  if (typeof window.Site.initCarouselModal === "function") {
    carousel = window.Site.initCarouselModal() || carousel;
  }

  var contact = { isOpen: function () { return false; }, close: function () {} };
  if (typeof window.Site.initContactModal === "function") {
    contact = window.Site.initContactModal({
      isCarouselOpen: carousel.isOpen
    }) || contact;
  }

  document.addEventListener("keydown", function (event) {
    if (event.key === "Escape" && contact.isOpen()) {
      contact.close();
      return;
    }
    if (!carousel.isOpen()) {
      return;
    }
    if (event.key === "Escape") {
      carousel.close();
    } else if (event.key === "ArrowRight") {
      carousel.showNext();
    } else if (event.key === "ArrowLeft") {
      carousel.showPrev();
    }
  });
})();
