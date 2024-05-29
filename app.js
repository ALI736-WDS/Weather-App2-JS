import getWeatherData from "./utils/httpReq.js";
import { getWeekDay } from "./utils/customeDate.js";
import { showModal, removeModal } from "./utils/modal.js";

const searchInput = document.querySelector("input");
const searchButton = document.querySelector("button");
const weatherContainer = document.getElementById("weather");
const loader = weatherContainer.querySelector("span");
const forecastContainer = document.getElementById("forecast");
const locationIcon = document.getElementById("location");
const modalButton = document.getElementById("modal-button");

const renderCurrentWeather = (data) => {
  // console.log(data);
  if (!data) return (weatherContainer.innerHTML = loader);
  //agar name city vared nashod, pas data nadarim, pas return mishe ke error nade to consol
  const weatherJSX = `
   
  <h1> ${data.name}, ${data.sys.country} </h1>
    <div id="main">
      <img src="http://openweathermap.org/img/w/${
        data.weather[0].icon
      }.png" alt="weather icon" />
    </div>
    <span> ${data.weather[0].main} </span>
    <p> ${Math.round(data.main.temp)} °C </p>
    <div id="info">
      <p> Humidity: <span> ${data.main.humidity} % </span> </p>
      <p> Humidity: <span> ${data.wind.speed} m/s </span> </p>
    </div>
    `;

  weatherContainer.innerHTML = weatherJSX;
};

const renderForecastWeather = (data) => {
  // console.log(data);
  if (!data) return; //agar name city vared nashod, pas data nadarim, pas return mishe ke error nade to consol

  forecastContainer.innerHTML = "";
  // console.log(data);
  data = data.list.filter((obj) => obj.dt_txt.endsWith("12:00:00"));
  // console.log(data);
  data.forEach((i) => {
    const forecastJSX = `
    <div>
      <img src="http://openweathermap.org/img/w/${
        i.weather[0].icon
      }.png" alt="weather icon" />
      <h3> ${getWeekDay(i.dt)} </h3>
      <p> ${Math.round(i.main.temp)} </p>
      <span> ${i.weather[0].main} </span>
    </div>
    `;

    forecastContainer.innerHTML += forecastJSX;
  });
};

//in func ham bayad async bashe chun dar currentData az func bala mikhune
const searchHandler = async () => {
  const cityName = searchInput.value;

  if (!cityName) {
    // alert("Please Enter City Name");
    showModal("Please Enter City Name");
    return; //ke error nade
  }

  // const currentData = await getCurrentWeatherByName(cityName);  //code ghabl az refactor kardane code ha (dar file httpReq)
  const currentData = await getWeatherData("current", cityName); //code bad az refactor kardane code ha (dar file httpReq)
  // console.log(currentData);
  renderCurrentWeather(currentData);

  // const forecastData = await getForecastWeatherByName(cityName);
  const forecastData = await getWeatherData("forecast", cityName);
  // console.log(forecastData)
  renderForecastWeather(forecastData);
};

//chun const getCurrentWeatherByCoordinates async hast
const positionCallback = async (position) => {
  console.log(position);
  const { latitude, longitude } = position.coords;
  // console.log(latitude, longitude);
  // const currentData = await getCurrentWeatherByCoordinates(latitude, longitude);
  const currentData = await getWeatherData("current", position.coords);
  // console.log(currentData);
  renderCurrentWeather(currentData);

  // const forecastData = await getForecastWeatherByCoordinates(
  //   latitude,
  //   longitude
  // );
  const forecastData = await getWeatherData("forecast", position.coords);
  renderForecastWeather(forecastData);
};

const errorCallback = (error) => {
  console.log(error);
  // console.log(error.message);
  showModal(error.message);
};

const locationHandler = () => {
  console.log(navigator);
  // console.log(navigator.geolocation);
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(positionCallback, errorCallback);
  } else {
    // alert("Your Browser Dose Not Support Geolocation");
    showModal("Your Browser Dose Not Support Geolocation");
  }
};

//zamani ke etelaat gerefte shod, dar line 32:(weatherContainer.innerHTML = weatherJSX;), innerHTML taghir mikone , loader mire , data miad
const initHandler = async () => {
  const currentData = await getWeatherData("current", "tehran"); //code bad az refactor kardane code ha (dar file httpReq)
  renderCurrentWeather(currentData);

  const forecastData = await getWeatherData("forecast", "tehran");
  renderForecastWeather(forecastData);
};

searchButton.addEventListener("click", searchHandler);
locationIcon.addEventListener("click", locationHandler);
modalButton.addEventListener("click", removeModal);
document.addEventListener("DOMContentLoaded", initHandler);
