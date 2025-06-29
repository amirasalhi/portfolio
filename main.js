// Animation fade-in avec Intersection Observer
  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        // Optionnel : arrêter d'observer après la 1ère apparition
        observer.unobserve(entry.target);
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
// Simple particle animation for hero background

const canvas = document.createElement('canvas');
canvas.id = 'particle-canvas';
document.querySelector('.hero').appendChild(canvas);
const ctx = canvas.getContext('2d');

let particlesArray;
const maxParticles = 80;

function initParticles() {
  particlesArray = [];
  for (let i = 0; i < maxParticles; i++) {
    particlesArray.push({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      radius: Math.random() * 2 + 0.5,
      speedX: (Math.random() - 0.5) * 0.4,
      speedY: (Math.random() - 0.5) * 0.4,
      opacity: Math.random() * 0.6 + 0.3,
    });
  }
}

function resizeCanvas() {
  canvas.width = canvas.offsetWidth;
  canvas.height = canvas.offsetHeight;
}

function drawParticles() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particlesArray.forEach(p => {
    ctx.beginPath();
    ctx.arc(p.x, p.y, p.radius, 0, Math.PI * 2);
    ctx.fillStyle = `rgba(209, 79, 255, ${p.opacity})`;
    ctx.shadowColor = `rgba(255, 102, 204, ${p.opacity})`;
    ctx.shadowBlur = 10;
    ctx.fill();

    // Move particles
    p.x += p.speedX;
    p.y += p.speedY;

    // Wrap around edges
    if (p.x > canvas.width) p.x = 0;
    else if (p.x < 0) p.x = canvas.width;
    if (p.y > canvas.height) p.y = 0;
    else if (p.y < 0) p.y = canvas.height;
  });

  requestAnimationFrame(drawParticles);
}

window.addEventListener('resize', () => {
  resizeCanvas();
  initParticles();
});

resizeCanvas();
initParticles();
drawParticles();
