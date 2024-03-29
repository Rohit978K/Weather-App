const key = "5437a74dbe5a8f04079d8466e6f61b59";

const input = document.getElementById("search-input");

const searchBtn = document.getElementById("search-btn")

const form = document.getElementById("search-box");

const weatherIcon = document.getElementById("weather-icon");

const cityName = document.getElementById("city-name");

const temperature = document.getElementById("temperature")

const description = document.getElementById("description")

const fetchWeather = async (city) => {
  try {
    const res = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${key}&units=metric`);

    const data = await res.json();

    if (data.cod == 200) {
      return data;
    } else {
      throw new Error(data.message)
    }
  } catch (err) {
    console.error(err.message, 'this is error');
    description.innerText = err.message;
    return null;
  }
}

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  const city = input.value;
  const data = await fetchWeather(city);
  if (data) {
    cityName.innerText = data.name + ", " + data.sys.country;
    temperature.innerText = data.main.temp + " °C";
    description.innerText = data.weather[0].description;

    weatherIcon.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png" alt="${data.weather.description}" loading="lazy">`;
  }
})