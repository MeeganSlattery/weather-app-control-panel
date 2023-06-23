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

function displayCurrentTemperatureSearch(response) {
  console.log(response.data);
  let roundedTempData = `°${Math.round(
    response.data.temperature.current
  )} <small>C</small>`;
  let currentTemperatureEliment = document.querySelector("#current-temp");
  currentTemperatureEliment.innerHTML = roundedTempData;

  let mainIconEliment = document.querySelector("#icon");
  let searchedIconData = response.data.condition.icon;
  mainIconEliment.setAttribute(
    "src",
    `http://shecodes-assets.s3.amazonaws.com/api/weather/icons/${searchedIconData}.png`
  );
  mainIconEliment.setAttribute("alt", searchedIconData);

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
  windEliment.innerHTML = `${searchedWindData} kmph`;

  let searchedConditionsData = response.data.condition.description;
  let forcastEliment = document.querySelector("#forecast");
  forcastEliment.innerHTML = searchedConditionsData;

  celsius = Math.round(response.data.temperature.current);
  wind = Math.round(response.data.wind.speed);
}

function displayWeeklyForcast() {
  let weeklyForcastEliment = document.querySelector("#weekly-ul");
  let forcastHtml = "";

  let days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
    "Sunday",
  ];

  // Create one row with two columns of three days each
  let row = `<div class="row">`;
  for (let i = 0; i < 6; i += 3) {
    row += `<div class="col-md-6">`;
    for (let j = i; j < i + 3; j++) {
      row += `<div class="week-box" id="week-box">
              <li class="weekday">
                ${days[j]} <span class="week-icon">☁︎</span><br /><span
                  class="week-high-low"
                >
                  <span class="high"> 00</span>
                  <span class="low">00 </span>
                </span>
              </li>
            </div>`;
    }
    row += `</div>`;
  }
  row += `</div>`;
  forcastHtml += row;

  weeklyForcastEliment.innerHTML = forcastHtml;
}

function searchedIframe(response) {
  let searchedCoorDataLat = response.data.coordinates.latitude;
  let searchedCoorDataLon = response.data.coordinates.longitude;
  console.log`${searchedCoorDataLat} ${searchedCoorDataLon}`;
  let iframe = document.querySelector("#iframe");
  iframe.innerHTML = `<iframe
              width="100%"
              height="300"
              src="https://embed.windy.com/embed2.html?lat=${searchedCoorDataLat}&lon=${searchedCoorDataLon}&detailLat=28.634&detailLon=-81.622&width=650&height=450&zoom=3&level=surface&overlay=wind&product=ecmwf&menu=&message=true&marker=&calendar=now&pressure=true&type=map&location=coordinates&detail=&metricWind=default&metricTemp=default&radarRange=-1"
              frameborder="0"
              class="iframe"
            >
              ></iframe
            >`;
}

function changeBackground(response) {
  let backgroundEliment = document.querySelector("#temp-box");
  let iconDecide = response.data.condition.icon;

  if (
    iconDecide === "clear-sky-night" ||
    iconDecide === "few-clouds-night" ||
    iconDecide === "scattered-clouds-night" ||
    iconDecide === "broken-clouds-night" ||
    iconDecide === "shower-rain-night" ||
    iconDecide === "rain-night" ||
    iconDecide === "snow-night" ||
    iconDecide === "mist-night"
  ) {
    backgroundEliment.classList.add("back-switch");
  } else {
    backgroundEliment.classList.remove("back-switch");
  }
}

function displayGeoWeather(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;

  let LatLon = document.querySelector("#unit-lable");
  LatLon.innerHTML = `Latitude ${latitude} <br /> Longitude ${longitude}`;

  console.log(latitude, longitude);
  let apiKey = "3f2244aoecf15c232c55c6ccebt260f0";
  let apiGeoUrl = `https://api.shecodes.io/weather/v1/current?lon=${longitude}&lat=${latitude}&key=${apiKey}&units=metric`;

  axios.get(apiGeoUrl).then(displayCurrentTemperatureSearch);
  axios.get(apiGeoUrl).then(searchedIframe);
  axios.get(apiGeoUrl).then(changeBackground);
}

function getGeoWeather(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(displayGeoWeather);
}

let currentLocationEliment = document.querySelector("#current-Location");
currentLocationEliment.addEventListener("click", getGeoWeather);

function search(city) {
  let apiKey = "3f2244aoecf15c232c55c6ccebt260f0";
  let apiUrlCity = `https://api.shecodes.io/weather/v1/current?query=${city}&key=${apiKey}&units=metric`;

  console.log(apiUrlCity);
  axios.get(apiUrlCity).then(displayCurrentTemperatureSearch);
  axios.get(apiUrlCity).then(searchedIframe);
  axios.get(apiUrlCity).then(changeBackground);
}

function handleSearch(event) {
  event.preventDefault();
  let searchInputElement = document.querySelector("#search-text-input");
  search(searchInputElement.value);
  console.log(searchInputElement.value);
}

let isFahrenheit = false;
let iskmph = false;

function toggleUnits(event) {
  let currentTemperatureElement = document.querySelector("#current-temp");
  // let unitLable = document.querySelector("#unit-lable");
  let windEliment = document.querySelector("#wind");

  if (isFahrenheit) {
    // Convert back to Celsius
    currentTemperatureElement.innerHTML = `°${Math.round(
      celsius
    )}  <small>C</small>`;
    windEliment.innerHTML = `${wind} kmph`;
    // unitLable.innerHTML = `C`;
    isFahrenheit = false;
  } else {
    // Convert to Fahrenheit
    let imperialwind = Math.round(wind / 1.609);
    let fahrenheit = (celsius * 9) / 5 + 32;
    currentTemperatureElement.innerHTML = `°${Math.round(
      fahrenheit
    )} <small>F</small>`;
    windEliment.innerHTML = `${imperialwind} mph`;
    // unitLable.innerHTML = `F`;
    isFahrenheit = true;
  }
}
let wind = null;
let celsius = null;

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

let unitButton = document.querySelector("#unit-button");
unitButton.addEventListener("click", toggleUnits);

search("London");
displayWeeklyForcast();
