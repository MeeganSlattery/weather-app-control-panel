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
  let roundedTempData = `°${Math.round(response.data.temperature.current)}`;
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
  windEliment.innerHTML = `${searchedWindData} km`;

  let searchedConditionsData = response.data.condition.description;
  let forcastEliment = document.querySelector("#forecast");
  forcastEliment.innerHTML = searchedConditionsData;

  celsius = Math.round(response.data.temperature.current);
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

function toggleUnits(event) {
  let currentTemperatureElement = document.querySelector("#current-temp");
  let unitLable = document.querySelector("#unit-lable");

  if (isFahrenheit) {
    // Convert back to Celsius
    currentTemperatureElement.innerHTML = `°${Math.round(celsius)}`;
    unitLable.innerHTML = `C`;
    isFahrenheit = false;
  } else {
    // Convert to Fahrenheit
    let fahrenheit = (celsius * 9) / 5 + 32;
    currentTemperatureElement.innerHTML = `°${Math.round(fahrenheit)}`;
    unitLable.innerHTML = `F`;
    isFahrenheit = true;
  }
}

let celsius = null;

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", handleSearch);

let unitButton = document.querySelector("#unit-button");
unitButton.addEventListener("click", toggleUnits);

search("London");
