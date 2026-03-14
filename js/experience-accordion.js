window.Site = window.Site || {};

window.Site.initExperienceAccordion = function initExperienceAccordion() {
  var experienceAccordions = Array.prototype.slice.call(
    document.querySelectorAll(".experience-projects")
  );
  var highlightClassName = "is-proof-target";
  var highlightTimeoutMs = 1800;

  if (!experienceAccordions.length) {
    return {
      revealProjectByHash: function () {}
    };
  }

  function closeOtherAccordions(activeDetails) {
    experienceAccordions.forEach(function (other) {
      if (other !== activeDetails) {
        other.open = false;
      }
    });
  }

  function clearProjectHighlights() {
    var highlighted = Array.prototype.slice.call(
      document.querySelectorAll(".project-card." + highlightClassName)
    );
    highlighted.forEach(function (card) {
      card.classList.remove(highlightClassName);
    });
  }

  function revealProjectByHash(hashValue) {
    if (!hashValue || hashValue.charAt(0) !== "#") {
      return false;
    }

    var projectCard = document.querySelector(hashValue + ".project-card");
    if (!projectCard) {
      return false;
    }

    var parentAccordion = projectCard.closest(".experience-projects");
    if (parentAccordion) {
      parentAccordion.open = true;
      closeOtherAccordions(parentAccordion);
    }

    clearProjectHighlights();
    projectCard.classList.add(highlightClassName);
    window.setTimeout(function () {
      projectCard.classList.remove(highlightClassName);
    }, highlightTimeoutMs);

    projectCard.scrollIntoView({
      behavior: "smooth",
      block: "center"
    });

    return true;
  }

  experienceAccordions.forEach(function (detailsEl) {
    detailsEl.addEventListener("toggle", function () {
      if (!detailsEl.open) {
        return;
      }
      closeOtherAccordions(detailsEl);
    });
  });

  var initialHash = window.location.hash;
  if (initialHash) {
    revealProjectByHash(initialHash);
  }

  window.addEventListener("hashchange", function () {
    revealProjectByHash(window.location.hash);
  });

  var proofLinks = Array.prototype.slice.call(
    document.querySelectorAll(".proof-link[href^='#']")
  );
  proofLinks.forEach(function (linkEl) {
    linkEl.addEventListener("click", function () {
      var targetHash = linkEl.getAttribute("href");
      revealProjectByHash(targetHash);
    });
  });

  return {
    revealProjectByHash: revealProjectByHash
  };
};
