// Fade-in animation using Intersection Observer
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));

// Toast & Form Logic
document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");
  const spinner = document.querySelector(".spinner");

  if (form && toast) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      // Affiche "Envoi en cours..." avec spinner
      showToast("Envoi en cours...", true);

      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          form.reset();
          showToast("Message envoyé avec succès !", false);
        } else {
          showToast("Erreur lors de l’envoi.", false);
        }
      }).catch(() => {
        showToast("Erreur réseau.", false);
      });
    });
  }

  function showToast(message, isLoading = false) {
    toastMessage.textContent = message;
    toast.classList.add("show");
    spinner.style.display = isLoading ? "inline-block" : "none";

    if (!isLoading) {
      setTimeout(() => {
        toast.classList.remove("show");
      }, 4000);
    }
  }
});
