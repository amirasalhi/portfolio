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
  const form = document.getElementById("contactForm");
  const toast = document.getElementById("toast");
  const toastMessage = document.getElementById("toast-message");

  form.addEventListener("submit", async function (e) {
    e.preventDefault();

    toast.style.display = "flex";
    toastMessage.textContent = "Envoi en cours...";

    const formData = new FormData(form);

		try {
		  const response = await fetch("https://formsubmit.co/amirasalhi1@gmail.com", {
			method: "POST",
			headers: {
			  'Accept': 'application/json'
			},
			body: formData
		  });

		  if (response.ok) {
			toastMessage.textContent = "Message envoyé avec succès !";
			form.reset();
		  } else {
			// Essaye de lire le texte brut de l'erreur (HTML)
			const text = await response.text();
			console.error("Réponse non JSON :", text);
			toastMessage.textContent = "Erreur lors de l’envoi.";
		  }
		} catch (error) {
		  toastMessage.textContent = "Erreur réseau.";
		  console.error("Erreur réseau :", error);
		}

    setTimeout(() => {
      toast.style.display = "none";
    }, 4000);
  });
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


