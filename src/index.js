console.log("Hello there");
function displayCurrentDate() {
  let currentDate = new Date();
  let options = { hour: "2-digit", minute: "2-digit", hour12: false };
  let globalTime = currentDate.toLocaleTimeString("en-US", options);
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let weekDay = days[currentDate.getDay()];
  let date = document.querySelector("#date-time");
  date.innerHTML = `${weekDay}, ${globalTime}`;
}
displayCurrentDate();

function displayCurrentTemperature(response) {
  console.log(response.data);
  let roundedTempData = Math.round(response.data.temperature.current);
  let currentTemperatureEliment = document.querySelector("#current-temp");
  currentTemperatureEliment.innerHTML = roundedTempData;

  let searchedCityData = response.data.city;
  let LocationEliment = document.querySelector("#location");
  LocationEliment.innerHTML = searchedCityData;

  let searchedPressureData = response.data.temperature.pressure;
  let pressureEliment = document.querySelector("#pressure");
  pressureEliment.innerHTML = `${searchedPressureData} mb`;

  let searchedHumidityData = response.data.temperature.humidity;
  let humidityEliment = document.querySelector("#humidity");
  humidityEliment.innerHTML = `${searchedHumidityData}%`;

  let searchedWindData = Math.round(response.data.wind.speed);
  let windEliment = document.querySelector("#wind");
  windEliment.innerHTML = `${searchedWindData} km`;

  let searchedConditionsData = response.data.condition.description;
  let forcastEliment = document.querySelector("#forecast");
  forcastEliment.innerHTML = searchedConditionsData;
}

let apiKey = "3f2244aoecf15c232c55c6ccebt260f0";
let q = "Lisbon";
let apiUrlCity = `https://api.shecodes.io/weather/v1/current?query=${q}&key=${apiKey}&units=metric`;

console.log(apiUrlCity);
axios.get(apiUrlCity).then(displayCurrentTemperature);
