window.Site = window.Site || {};

window.Site.initNavigation = function initNavigation() {
  var menuToggle = document.querySelector(".menu-toggle");
  var nav = document.querySelector(".site-nav");
  if (!menuToggle || !nav) {
    return;
  }

  menuToggle.addEventListener("click", function () {
    var isOpen = nav.classList.toggle("is-open");
    menuToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  var navLinks = document.querySelectorAll(".site-nav .page-link, .site-title");
  navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
      if (!nav.classList.contains("is-open")) {
        return;
      }
      nav.classList.remove("is-open");
      menuToggle.setAttribute("aria-expanded", "false");
    });
  });
};
