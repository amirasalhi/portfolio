document.addEventListener("DOMContentLoaded", () => {
  const form = document.getElementById("weatherForm");
  const cityInput = document.getElementById("cityInput");
  const errorDiv = document.getElementById("error");
  const weatherResult = document.getElementById("weatherResult");
  const cityNameElem = document.getElementById("cityName");
  const weatherIconElem = document.getElementById("weatherIcon");
  const weatherDescElem = document.getElementById("weatherDesc");
  const temperatureElem = document.getElementById("temperature");
  const detailsGrid = document.getElementById("detailsGrid");

  const iconMap = {
    Sunny: "☀️",
    Rain: "🌧️",
    Clouds: "☁️",
    Snow: "❄️",
    Clear: "🌕",
    Overcast: "☁️",
    Mist: "🌫️",
    Fog: "🌁"
  };

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = cityInput.value.trim();
  errorDiv.textContent = "";
  weatherResult.hidden = true;
  detailsGrid.innerHTML = "";

  if (!city) {
    errorDiv.textContent = "Veuillez entrer un nom de ville.";
    return;
  }

  try {
    const response = await fetch(`https://wttr.in/${encodeURIComponent(city)}?format=j1`);
    const contentType = response.headers.get("content-type");

    if (!response.ok || !contentType || !contentType.includes("application/json")) {
      const errorText = await response.text();
     // throw new Error("Erreur : " + errorText);
	  errorDiv.textContent = "Veuillez entrer un nom de ville correcte.";
    }

    const data = await response.json();

    // Vérifier si les données météo sont présentes
    if (!data.current_condition || data.current_condition.length === 0) {
      throw new Error("Ville introuvable. Veuillez vérifier le nom.");
    }

    const current = data.current_condition[0];
    const area = data.nearest_area?.[0]?.areaName?.[0]?.value || city;
    const country = data.nearest_area?.[0]?.country?.[0]?.value || "";

    cityNameElem.textContent = `${area}, ${country}`;
    const description = current.weatherDesc[0].value;
    weatherDescElem.textContent = description;
    temperatureElem.textContent = `${current.temp_C} °C`;

    weatherIconElem.src = "https://cdn.jsdelivr.net/gh/twitter/twemoji@14.0.2/assets/svg/2600.svg";
    weatherIconElem.alt = description;

    const detailsHTML = `
      <div class="detail-item"><span class="detail-icon">💧</span><span>${current.humidity} %</span></div>
      <div class="detail-item"><span class="detail-icon">🌬️</span><span>${current.windspeedKmph} km/h</span></div>
      <div class="detail-item"><span class="detail-icon">🌡️</span><span>Ressentie : ${current.FeelsLikeC} °C</span></div>
      <div class="detail-item"><span class="detail-icon">📈</span><span>Pression : ${current.pressure} hPa</span></div>
    `;
    detailsGrid.innerHTML = detailsHTML;

    weatherResult.hidden = false;
    weatherResult.classList.add("show");
  } catch (err) {
    errorDiv.textContent = err.message;
    cityInput.value = "";  // vider l'input si erreur (ville non trouvée)
  }
});


  const toggleBtn = document.getElementById("toggleTheme");

  // Appliquer le thème au chargement
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "dark") {
    document.body.classList.add("dark-mode");
    toggleBtn.textContent = "☀️";
  }

  toggleBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDark = document.body.classList.contains("dark-mode");
    toggleBtn.textContent = isDark ? "☀️" : "🌙";
    localStorage.setItem("theme", isDark ? "dark" : "light");
  });
});
