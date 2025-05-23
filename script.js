async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "607b7e888608d55ab69dd95cf2c0deeb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const weatherBox = document.getElementById("weatherResult");
  const errorBox = document.getElementById("error");
  const loadingBox = document.getElementById("loading");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  weatherBox.classList.add("hidden");
  errorBox.classList.add("hidden");
  loadingBox.classList.remove("hidden");

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();
    const { name, sys, main, weather, wind } = data;

    document.getElementById("cityName").textContent = `${name}, ${sys.country}`;
    document.getElementById("countryFlag").textContent = `🇺🇳`; // Optional emoji (country flags via external libs if needed)

    document.getElementById("description").textContent = capitalize(weather[0].description);
    document.getElementById("temperature").textContent = main.temp;
    document.getElementById("feelsLike").textContent = main.feels_like;
    document.getElementById("humidity").textContent = main.humidity;
    document.getElementById("wind").textContent = wind.speed;

    document.getElementById("sunrise").textContent = formatTime(sys.sunrise);
    document.getElementById("sunset").textContent = formatTime(sys.sunset);

    document.getElementById("weatherIcon").src = `http://openweathermap.org/img/wn/${weather[0].icon}@2x.png`;

    loadingBox.classList.add("hidden");
    weatherBox.classList.remove("hidden");
  } catch (error) {
    loadingBox.classList.add("hidden");
    weatherBox.classList.add("hidden");
    errorBox.classList.remove("hidden");
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function formatTime(unix) {
  const date = new Date(unix * 1000);
  return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
}
