window.Site = window.Site || {};

window.Site.initCarouselModal = function initCarouselModal() {
  var modal = document.getElementById("app-carousel-modal");
  var modalImage = document.getElementById("carousel-image");
  var modalTitle = document.getElementById("carousel-app-title");
  var modalCaption = document.getElementById("carousel-caption");
  var modalDots = document.getElementById("carousel-dots");
  var modalInner = document.querySelector(".carousel-modal-inner");
  var closeButton = document.querySelector(".carousel-close");
  var prevButton = document.querySelector(".carousel-prev");
  var nextButton = document.querySelector(".carousel-next");

  var currentImages = [];
  var currentTitle = "";
  var currentIndex = 0;
  var touchStartX = null;
  var touchEndX = null;
  var originCard = null;
  var isTransitioning = false;
  var closeTransitionTimer = null;

  function setPopoutVars(sourceRect, targetRect) {
    if (!modal || !sourceRect || !targetRect) {
      return;
    }
    var sourceCenterX = sourceRect.left + sourceRect.width / 2;
    var sourceCenterY = sourceRect.top + sourceRect.height / 2;
    var targetCenterX = targetRect.left + targetRect.width / 2;
    var targetCenterY = targetRect.top + targetRect.height / 2;
    var translateX = sourceCenterX - targetCenterX;
    var translateY = sourceCenterY - targetCenterY;
    var scaleX = sourceRect.width / targetRect.width;
    var scaleY = sourceRect.height / targetRect.height;

    modal.style.setProperty("--popout-translate-x", translateX.toFixed(2) + "px");
    modal.style.setProperty("--popout-translate-y", translateY.toFixed(2) + "px");
    modal.style.setProperty("--popout-scale-x", Math.max(scaleX, 0.08).toFixed(4));
    modal.style.setProperty("--popout-scale-y", Math.max(scaleY, 0.08).toFixed(4));
  }

  function clearOriginCard() {
    if (!originCard) {
      return;
    }
    originCard.classList.remove("is-origin-card");
    originCard = null;
  }

  function renderSlide() {
    if (!currentImages.length || !modalImage) {
      return;
    }
    var current = currentImages[currentIndex];
    modalImage.src = current.src;
    modalImage.alt = current.alt;

    if (modalTitle) {
      modalTitle.textContent = currentTitle;
    }
    if (modalCaption) {
      modalCaption.textContent = (currentIndex + 1) + " / " + currentImages.length + " - " + current.alt;
    }
    if (modalDots) {
      Array.prototype.slice.call(modalDots.querySelectorAll(".carousel-dot")).forEach(function (dot, index) {
        dot.classList.toggle("is-active", index === currentIndex);
      });
    }
  }

  function renderDots() {
    if (!modalDots) {
      return;
    }

    modalDots.innerHTML = "";
    currentImages.forEach(function (img, index) {
      var dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel-dot";
      dot.setAttribute("aria-label", "Go to slide " + (index + 1));
      dot.style.backgroundImage = "url('" + img.src + "')";
      dot.addEventListener("click", function () {
        currentIndex = index;
        renderSlide();
      });
      modalDots.appendChild(dot);
    });
  }

  function open(images, title, index, sourceCard) {
    if (!modal || !modalInner || !sourceCard || !images.length || isTransitioning || !modal.hidden) {
      return;
    }

    isTransitioning = true;
    clearTimeout(closeTransitionTimer);
    clearOriginCard();

    originCard = sourceCard;
    originCard.classList.add("is-origin-card");
    currentImages = images;
    currentTitle = title || "";
    currentIndex = index || 0;
    renderDots();
    renderSlide();
    modal.hidden = false;
    document.body.style.overflow = "hidden";
    modal.classList.remove("is-closing", "is-open");
    modal.classList.add("is-preparing");

    var originRect = sourceCard.getBoundingClientRect();
    requestAnimationFrame(function () {
      var targetRect = modalInner.getBoundingClientRect();
      setPopoutVars(originRect, targetRect);
      modal.classList.remove("is-preparing");
      requestAnimationFrame(function () {
        modal.classList.add("is-open");
        isTransitioning = false;
      });
    });
  }

  function close() {
    if (!modal || modal.hidden || isTransitioning) {
      return;
    }
    isTransitioning = true;

    if (originCard && modalInner) {
      setPopoutVars(originCard.getBoundingClientRect(), modalInner.getBoundingClientRect());
    }

    modal.classList.remove("is-open");
    modal.classList.add("is-closing");

    function finishClose() {
      modal.hidden = true;
      modal.classList.remove("is-preparing", "is-closing", "is-open");
      document.body.style.overflow = "";
      clearOriginCard();
      isTransitioning = false;
    }

    var finished = false;
    function onTransitionEnd(event) {
      if (event.target !== modalInner || event.propertyName !== "transform" || finished) {
        return;
      }
      finished = true;
      modalInner.removeEventListener("transitionend", onTransitionEnd);
      clearTimeout(closeTransitionTimer);
      finishClose();
    }

    modalInner.addEventListener("transitionend", onTransitionEnd);
    closeTransitionTimer = setTimeout(function () {
      if (finished) {
        return;
      }
      finished = true;
      modalInner.removeEventListener("transitionend", onTransitionEnd);
      finishClose();
    }, 520);
  }

  function showNext() {
    if (!currentImages.length) {
      return;
    }
    currentIndex = (currentIndex + 1) % currentImages.length;
    renderSlide();
  }

  function showPrev() {
    if (!currentImages.length) {
      return;
    }
    currentIndex = (currentIndex - 1 + currentImages.length) % currentImages.length;
    renderSlide();
  }

  function isOpen() {
    return Boolean(modal && !modal.hidden);
  }

  document.querySelectorAll(".app-item").forEach(function (item) {
    var title = item.getAttribute("data-app-name") || "App";
    var images = Array.prototype.slice.call(item.querySelectorAll(".carousel-sources img"));
    var triggerButton = item.querySelector(".app-shot-trigger");

    if (!triggerButton) {
      return;
    }
    if (!images.length) {
      item.classList.add("is-disabled");
      triggerButton.setAttribute("disabled", "disabled");
      return;
    }

    item.classList.add("is-clickable");
    triggerButton.addEventListener("click", function () {
      open(images, title, 0, triggerButton);
    });
  });

  if (closeButton) {
    closeButton.addEventListener("click", close);
  }
  if (nextButton) {
    nextButton.addEventListener("click", showNext);
  }
  if (prevButton) {
    prevButton.addEventListener("click", showPrev);
  }
  if (modal) {
    modal.addEventListener("click", function (event) {
      if (event.target === modal) {
        close();
      }
    });
  }
  if (modalInner) {
    modalInner.addEventListener(
      "touchstart",
      function (event) {
        if (!event.changedTouches.length) {
          return;
        }
        touchStartX = event.changedTouches[0].screenX;
      },
      { passive: true }
    );

    modalInner.addEventListener(
      "touchend",
      function (event) {
        if (!event.changedTouches.length || touchStartX === null) {
          return;
        }
        touchEndX = event.changedTouches[0].screenX;
        var delta = touchStartX - touchEndX;
        if (Math.abs(delta) > 45) {
          if (delta > 0) {
            showNext();
          } else {
            showPrev();
          }
        }
        touchStartX = null;
        touchEndX = null;
      },
      { passive: true }
    );
  }

  return {
    isOpen: isOpen,
    close: close,
    showNext: showNext,
    showPrev: showPrev
  };
};
