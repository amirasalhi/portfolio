     // Animation à l'apparition avec Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));
	document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("contact-form");
  const toast = document.getElementById("toast");

  if (form && toast) {
    form.addEventListener("submit", function (e) {
      e.preventDefault();

      showToast("📤 Envoi en cours...");

      const data = new FormData(form);

      fetch(form.action, {
        method: "POST",
        body: data,
        headers: { 'Accept': 'application/json' }
      }).then(response => {
        if (response.ok) {
          showToast("✅ Message envoyé avec succès !");
          form.reset();
        } else {
          showToast("❌ Une erreur est survenue.");
        }
      }).catch(() => {
        showToast("⚠️ Échec de l’envoi. Vérifiez votre connexion.");
      });
    });
  }

  function showToast(message) {
    toast.textContent = message;
    toast.classList.add("show");
    clearTimeout(toast.timer);
    toast.timer = setTimeout(() => toast.classList.remove("show"), 4000);
  }
});
