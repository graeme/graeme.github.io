window.Site = window.Site || {};

window.Site.initContactModal = function initContactModal(options) {
  var config = options || {};
  var isCarouselOpen = typeof config.isCarouselOpen === "function" ? config.isCarouselOpen : function () { return false; };

  var contactEmailModal = document.getElementById("contact-email-modal");
  var openContactEmailModalButtons = Array.prototype.slice.call(
    document.querySelectorAll("[data-open-contact-email-modal]")
  );
  var closeContactEmailModalButton = document.getElementById("close-contact-email-modal");
  var cancelContactEmailModalButton = document.getElementById("cancel-contact-email-modal");
  var contactEmailForm = document.getElementById("contact-email-form");
  var contactEmailToast = document.getElementById("contact-email-toast");
  var lastFocusedElement = null;
  var toastTimer = null;

  function open() {
    if (!contactEmailModal || !contactEmailModal.hidden) {
      return;
    }
    lastFocusedElement = document.activeElement;
    contactEmailModal.hidden = false;
    document.body.style.overflow = "hidden";

    var firstInput = contactEmailModal.querySelector("input, textarea");
    if (firstInput) {
      firstInput.focus();
    }
  }

  function close() {
    if (!contactEmailModal || contactEmailModal.hidden) {
      return;
    }
    contactEmailModal.hidden = true;
    if (!isCarouselOpen()) {
      document.body.style.overflow = "";
    }
    if (lastFocusedElement && typeof lastFocusedElement.focus === "function") {
      lastFocusedElement.focus();
    }
  }

  function isOpen() {
    return Boolean(contactEmailModal && !contactEmailModal.hidden);
  }

  function showContactToast(message) {
    if (!contactEmailToast) {
      return;
    }
    contactEmailToast.textContent = message || "Message sent successfully.";
    contactEmailToast.classList.add("is-visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(function () {
      contactEmailToast.classList.remove("is-visible");
    }, 2600);
  }

  openContactEmailModalButtons.forEach(function (button) {
    button.addEventListener("click", function (event) {
      event.preventDefault();
      open();
    });
  });

  if (closeContactEmailModalButton) {
    closeContactEmailModalButton.addEventListener("click", close);
  }
  if (cancelContactEmailModalButton) {
    cancelContactEmailModalButton.addEventListener("click", close);
  }
  if (contactEmailModal) {
    contactEmailModal.addEventListener("click", function (event) {
      if (event.target === contactEmailModal) {
        close();
      }
    });
  }

  if (contactEmailForm) {
    contactEmailForm.addEventListener("submit", function (event) {
      event.preventDefault();
      var submitButton = contactEmailForm.querySelector('button[type="submit"]');
      if (submitButton && submitButton.disabled) {
        return;
      }

      var defaultSubmitLabel = submitButton ? submitButton.textContent : "";
      if (submitButton) {
        submitButton.disabled = true;
        submitButton.textContent = "Sending...";
      }

      var formData = new FormData(contactEmailForm);
      fetch(contactEmailForm.action || "https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
        headers: {
          Accept: "application/json"
        }
      })
        .then(function (response) {
          return response
            .json()
            .catch(function () {
              return {};
            })
            .then(function (data) {
              return {
                ok: response.ok,
                data: data
              };
            });
        })
        .then(function (result) {
          if (!result.ok || !result.data || !result.data.success) {
            throw new Error((result.data && result.data.message) || "Unable to send message.");
          }
          close();
          contactEmailForm.reset();
          showContactToast("Message sent successfully.");
        })
        .catch(function (error) {
          console.error("Web3Forms submission failed:", error);
          window.alert("Sorry, your message could not be sent right now. Please try again.");
        })
        .then(function () {
          if (submitButton) {
            submitButton.disabled = false;
            submitButton.textContent = defaultSubmitLabel;
          }
        });
    });
  }

  return {
    isOpen: isOpen,
    close: close
  };
};
