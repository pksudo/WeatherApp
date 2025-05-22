async function getWeather() {
  const city = document.getElementById("cityInput").value.trim();
  const apiKey = "607b7e888608d55ab69dd95cf2c0deeb";
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${encodeURIComponent(city)}&appid=${apiKey}&units=metric`;

  const weatherBox = document.getElementById("weatherResult");
  const errorBox = document.getElementById("error");

  if (!city) {
    alert("Please enter a city name.");
    return;
  }

  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error("City not found");

    const data = await response.json();

    document.getElementById("cityName").textContent = data.name;
    document.getElementById("description").textContent = data.weather[0].description;
    document.getElementById("temperature").textContent = data.main.temp;
    document.getElementById("humidity").textContent = data.main.humidity;
    document.getElementById("wind").textContent = data.wind.speed;

    errorBox.classList.add("hidden");
    weatherBox.classList.remove("hidden");
  } catch (error) {
    weatherBox.classList.add("hidden");
    errorBox.classList.remove("hidden");
  }
}
