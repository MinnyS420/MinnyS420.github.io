import cardTemplate from "./helperFunctions/cardTemplate.js";
import getLocation from "./helperFunctions/getLocation.js";
import DataHelpers from "./helperFunctions/dataHelper.js";

const apiParameters = {
    apiKey: `74e59f6374abe0d9b758877616ae444c`,
    apiFirstUrl: `https://api.openweathermap.org/data/2.5/onecall`,
    apiSecondUrl: `https://api.openweathermap.org/data/2.5/forecast`,
    imgUrl: `http://openweathermap.org/img/wn/`,
};

const weatherDiv = document.querySelector('#container');
const locationSearchText = document.getElementById('locationSearchText');
const locationSearchButton = document.getElementById('locationSearchButton');
const cityHeadline = document.getElementById('cityHeadline');

const hourlyButton = document.getElementById('hourlyButton');
const dailyButton = document.getElementById('dailyButton');

// This function initializes the weather app by fetching data from the OpenWeatherMap API 
// and setting the city name and weather data in the DOM.

async function initializeWeatherApp(local, city = 'Skopje', dailyData) {
    city = city.trim()
    if (city.length == 0) city = 'Skopje';

    try {
        let lat;
        let lon;
        let cityName;

        if (!local) {
            const cityData = await DataHelpers.getDataFromURLorLocal(`${apiParameters.apiSecondUrl}?q=${city}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            const cityObjectParameters = DataHelpers.getCityNameAndGeolocation(cityData.city);
            lat = cityObjectParameters.coord.lat;
            lon = cityObjectParameters.coord.lon;
            cityName = cityObjectParameters.name
        }
        else {
            const position = await getLocation();
            lat = position.coords.latitude;
            lon = position.coords.longitude;
            const cityToExtract = await DataHelpers.getDataFromURLorLocal(`${apiParameters.apiSecondUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
            cityName = cityToExtract.city.name;
        }

        const data = await DataHelpers.getDataFromURLorLocal(`${apiParameters.apiFirstUrl}?lat=${lat}&lon=${lon}&units=metric&appid=${apiParameters.apiKey}&exclude=minutely`)
        cityHeadline.innerHTML = cityName;

        weatherDiv.innerHTML = '';

        if (dailyData) {
            data.daily.forEach((element, index) => {
                const cardHtml = cardTemplate.daily(element, data.timezone_offset, index);
                weatherDiv.innerHTML += cardHtml;
            })
        }
        else {
            for (let element of data.hourly) {
                const cardHtml = cardTemplate.hourly(element, data.timezone_offset);
                weatherDiv.innerHTML += cardHtml;
            }
        }

    }
    catch (e) {
        console.error(e);
    }
}

locationSearchButton.addEventListener('click', () => {
    initializeWeatherApp(false, locationSearchText.value);
})

hourlyButton.addEventListener('click', () => {
    initializeWeatherApp(false, locationSearchText.value, false);
})

dailyButton.addEventListener('click', () => {
    initializeWeatherApp(false, locationSearchText.value, true);
})

initializeWeatherApp(true);