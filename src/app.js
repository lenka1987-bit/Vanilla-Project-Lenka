function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }
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
  return `${day} ${hours}:${minutes}`;
}

function showData(response) {
  console.log(response.data);
  let showTemperature = document.querySelector("#temp");
  let showCity = document.querySelector("#city");
  let showWeather = document.querySelector("#description");
  let humidity = document.querySelector("#humidity");
  let wind = document.querySelector("#windSpeed");
  let date = document.querySelector("#date");
  let iconElement = document.querySelector("#icon");
  showWeather.innerHTML = response.data.weather[0].description;
  showCity.innerHTML = response.data.name;
  showTemperature.innerHTML = Math.round(response.data.main.temp);
  humidity.innerHTML = response.data.main.humidity;
  wind.innerHTML = Math.round(response.data.wind.speed);
  date.innerHTML = formatDate(response.data.dt * 1000);
  iconElement.setAttribute("li", `http://openweathermap.org/img/wn/10d@2x.png`);
}

let apiKey = "64e05917145944cb1b0f8609f542a318";
let apiCall = `https://api.openweathermap.org/data/2.5/weather?q=Piestany&appid=${apiKey}&units=metric`;

axios.get(apiCall).then(showData);
