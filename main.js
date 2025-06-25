 
document.getElementById("contact-form").addEventListener("submit", function (e) {
  e.preventDefault(); // Empêche le rechargement

  const form = e.target;
  const data = new FormData(form);

  fetch(form.action, {
    method: "POST",
    body: data,
    headers: {
      'Accept': 'application/json'
    }
  }).then(response => {
    if (response.ok) {
      document.getElementById("popup").classList.add("visible");
      form.reset();

      setTimeout(() => {
        document.getElementById("popup").classList.remove("visible");
      }, 4000);
    } else {
      alert("Une erreur est survenue. Veuillez réessayer.");
    }
  });
});

    // Animation à l'apparition avec Intersection Observer
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.2 });

    document.querySelectorAll('.fade-in').forEach(el => observer.observe(el));