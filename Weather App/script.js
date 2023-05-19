const apiKey = "8250d8dea974602a2419d464eca953d9";
const apiCall =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const searchBox = document.querySelector(".search input");
const searchBtn = document.querySelector(".search button");
const weatherIcon = document.querySelector(".weather-icon");
const weatherDiv = document.querySelector(".weather");
const popularCities = [
  "London",
  "New York",
  "Tokyo",
  "Kolkata",
  "Mumbai",
  "Bangalore",
];

async function checkWeather(cityName) {
  const res = await fetch(apiCall + cityName + `&appid=${apiKey}`);

  if (res.status !== 200) {
    document.querySelector(".error").style.display = "block";
    document.querySelector(".weather").style.display = "none";
  } else {
    let data = await res.json();
    console.log(data.weather);
    document.querySelector(".city").innerHTML = data.name;
    document.querySelector(".temp").innerHTML =
      Math.round(data.main.temp) + "°c";
    document.querySelector(".humidity").innerHTML = data.main.humidity + "%";
    document.querySelector(".wind").innerHTML =
      Math.round(data.wind.speed) + " km/h";

    if (data.weather[0].main == "Clouds") {
      weatherIcon.src = "Graphics/clouds.png";
    } else if (data.weather[0].main == "Clear") {
      weatherIcon.src = "Graphics/clear.png";
    } else if (data.weather[0].main == "Rain") {
      weatherIcon.src = "Graphics/rain.png";
    } else if (data.weather[0].main == "Drizzle") {
      weatherIcon.src = "Graphics/drizzle.png";
    } else if (data.weather[0].main == "Mist") {
      weatherIcon.src = "Graphics/mist.png";
    }
    weatherDiv.style.display = "flex";
    document.querySelector(".error").style.display = "none";
  }
}

searchBtn.addEventListener("click", () => {
  checkWeather(searchBox.value);
});

function getPopularCityWeather(city) {
  searchBox.value = city;
  checkWeather(city);
}

const popularCityButtons = document.querySelectorAll(".popular-city");
popularCityButtons.forEach((button) => {
  button.addEventListener("click", () => {
    const city = button.dataset.city;
    getPopularCityWeather(city);
  });
});
