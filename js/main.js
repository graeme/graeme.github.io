window.Site = window.Site || {};

(function () {
  var viewportMeta = document.querySelector('meta[name="viewport"]');
  var baseViewportContent = "width=device-width, initial-scale=1, viewport-fit=cover";
  var viewportResetTimerId = null;
  var viewportStableScaleThreshold = 0.01;

  function isViewportScaleNormalized() {
    if (!window.visualViewport || typeof window.visualViewport.scale !== "number") {
      return true;
    }
    return Math.abs(window.visualViewport.scale - 1) <= viewportStableScaleThreshold;
  }

  function normalizeViewportScaleIfNeeded() {
    if (!viewportMeta || isViewportScaleNormalized()) {
      return;
    }

    // Briefly lock max scale to force a viewport recompute only when scale is off.
    viewportMeta.setAttribute("content", baseViewportContent + ", maximum-scale=1");
    if (viewportResetTimerId !== null) {
      window.clearTimeout(viewportResetTimerId);
    }

    viewportResetTimerId = window.setTimeout(function () {
      viewportResetTimerId = null;
      viewportMeta.setAttribute("content", baseViewportContent);
    }, 220);
  }

  function scheduleViewportNormalization(delayMs) {
    window.setTimeout(function () {
      normalizeViewportScaleIfNeeded();
    }, delayMs);
  }

  function handlePotentialViewportScaleIssue() {
    // Run a couple of delayed checks because some browsers settle scale gradually.
    scheduleViewportNormalization(120);
    scheduleViewportNormalization(320);
    scheduleViewportNormalization(520);
  }

  if (window.visualViewport) {
    window.visualViewport.addEventListener("resize", function () {
      if (!isViewportScaleNormalized()) {
        scheduleViewportNormalization(140);
      }
    });
  }

  if (viewportMeta) {
    window.setTimeout(function () {
      viewportMeta.setAttribute("content", baseViewportContent);
    }, 0);
  }

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

  window.addEventListener("orientationchange", function () {
    handlePotentialViewportScaleIssue();
  });

  window.addEventListener("pageshow", function () {
    handlePotentialViewportScaleIssue();
  });
})();
