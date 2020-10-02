function formatDate(timestamp) {
  let date = new Date(timestamp);

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];

  let day = days[date.getDay()];
  return `${day} ${formatHours(timestamp)}`;
}

function formatHours(timestamp) {
  let time = new Date(timestamp);
  let hours = time.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = time.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
  return `${hours}:${minutes}`;
}

function showData(response) {
  console.log(response.data);
  let showTemperature = document.querySelector("#temp");
  let showCity = document.querySelector("#city");
  let showWeather = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#windSpeed");
  let date = document.querySelector("#date");
  let sunrise = document.querySelector("#sunrise");
  let sunset = document.querySelector("#sunset");
  let iconElement = document.querySelector("#icon");

  showWeather.innerHTML = response.data.weather[0].description;
  showCity.innerHTML = response.data.name;
  celsiusTemperature = Math.round(response.data.main.temp);
  showTemperature.innerHTML = celsiusTemperature;
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  sunrise.innerHTML = formatHours(response.data.sys.sunrise * 1000);
  sunset.innerHTML = formatHours(response.data.sys.sunset * 1000);
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
}
// working on forecast
function displayForecast(response) {
  let forecastElement = document.querySelector("#forecast");
  let forecast = null;
  forecastElement.innerHTML = null;
  for (let index = 0; index < 5; index++) {
    forecast = response.data.list[index];
    forecastElement.innerHTML += `<div class="col-2">
              <ul>
                <li>${formatHours(forecast.dt * 1000)}</li>
                <li id="current-weather-icon"><img
                    src="http://openweathermap.org/img/wn/${
                      forecast.weather[0].icon
                    }@2x.png"
                    alt="weather-icon"
                    class="weather-icon weather-icon-forecast"
                    id="icon" /></li>
                <li class="max-temp"><strong>${Math.round(
                  forecast.main.temp_max
                )}℃</strong></li>
              </ul>
            </div>`;
  }
}
// working on searching engine

function search(city) {
  let apiKey = "64e05917145944cb1b0f8609f542a318";
  let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCall).then(showData);

  apiCall = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiCall).then(displayForecast);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInputElement = document.querySelector("#search-city");
  search(cityInputElement.value);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);

search("Piešťany");

// convert units
function convertToFahrenheit(event) {
  event.preventDefault();
  celsius.classList.remove("active");
  fahrenheit.classList.add("active");
  let temperatureElement = document.querySelector("#temp");
  let fahrenheitTemperature = (celsiusTemperature * 9) / 5 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToCelsius(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temp");
  celsius.classList.add("active");
  fahrenheit.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusTemperature = null; //global variable

let fahrenheit = document.querySelector("#fahrenheit-unit");
fahrenheit.addEventListener("click", convertToFahrenheit);

let celsius = document.querySelector("#celsius-unit");
celsius.addEventListener("click", convertToCelsius);
