import { showModal } from "./modal.js";

const BASEURL = "https://api.openweathermap.org/data/2.5";
const API_KEY = "edc228562ac0a8aa3116d41c0687cf56";

const getWeatherData = async (type, data) => {
  // console.log(type, data);
  let url = null;

  switch (type) {
    case "current":
      if (typeof data === "string") {
        // url = `${BASEURL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
        url = `${BASEURL}/weather?q=${data}&appid=${API_KEY}&units=metric`; //data === string  mishe ke dar asl karbar name city vared mikone
      } else {
        // url = `${BASEURL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        url = `${BASEURL}/weather?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`; //ba in func az data gerefte mishan
      }
      break;

    case "forecast":
      if (typeof data === "string") {
        // url = `${BASEURL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
        url = `${BASEURL}/forecast?q=${data}&appid=${API_KEY}&units=metric`;
      } else {
        // url = `${BASEURL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
        url = `${BASEURL}/forecast?lat=${data.latitude}&lon=${data.longitude}&appid=${API_KEY}&units=metric`; //ba in func az data gerefte mishan
      }
      break;

    default:
      url = `${BASEURL}/weather?q=Tehran&appid=${API_KEY}&units=metric`;
      break;
  }

  try {
    const response = await fetch(url);
    const json = await response.json();
    // console.log(json);
    if (+json.cod === 200) {
      return json;
    } else {
      // console.log(json.message);
      showModal(json.message);
    }
  } catch (error) {
    // console.log("An error occured when fetching data");
    showModal("An error occured when fetching data");
  }
};

export default getWeatherData;

//////////////////////////////////////////////////////////////
//ba neveshtane func bala dige niazi be func haye zir nist
//////////////////////////////////////////////////////////////

// const getCurrentWeatherByName = async (city) => {
//   const url = `${BASEURL}/weather?q=${city}&appid=${API_KEY}&units=metric`;
//   //   console.log(url);
//   const response = await fetch(url);
//   const json = await response.json();

//   return json;
// };

// const getCurrentWeatherByCoordinates = async (lat, lon) => {
//   const url = `${BASEURL}/weather?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   //   console.log(url);
//   const response = await fetch(url);
//   const json = await response.json();

//   return json;
// };

// const getForecastWeatherByName = async (city) => {
//   const url = `${BASEURL}/forecast?q=${city}&appid=${API_KEY}&units=metric`;
//   //   console.log(url);
//   const response = await fetch(url);
//   const json = await response.json();

//   return json;
// };

// const getForecastWeatherByCoordinates = async (lat, lon) => {
//   const url = `${BASEURL}/forecast?lat=${lat}&lon=${lon}&appid=${API_KEY}&units=metric`;
//   //   console.log(url);
//   const response = await fetch(url);
//   const json = await response.json();

//   return json;
// };
