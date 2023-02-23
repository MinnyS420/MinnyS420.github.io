import getDay from "./getDay.js";

export default class cardTemplate {

    static hourly(element) {
        const temperature = Math.round(element.temp);
        const feels_like = Math.round(element.feels_like);
        const time = new Date(element.dt * 1000);
        let weatherImage = '';

        if (element.weather[0].main === 'Clear') {
            weatherImage = '<img class = "Clear-Cloud" src="./img/sunny.gif" alt="clear-weather">';
        } else if (element.weather[0].main === 'Clouds') {
            weatherImage = '<img class = "Clear-Cloud" src="./img/Cloudy.gif" alt="clear-weather">';
        } else if (element.weather[0].main === 'Rain') {
            weatherImage = '<img class = "Clear-Cloud" src="./img/Weather rain.gif" alt="clear-weather">';
        } else if (element.weather[0].main === 'Sun') {
            weatherImage = 'Sunny';
        } else if (element.weather[0].main === 'Snow') {
            weatherImage = '<img class = "Clear-Cloud" src="./img/snowing.gif" alt="clear-weather">';
        }

        const cardHTML =
            `
    <div id="cardElement">
        <div id="time">Time: ${time.getHours()}:00</div>
        <div id="weather-description">${weatherImage}<div id="temperature">${temperature}°C</div></div>
        <div id="weather-info">
            <div id="feels-like">Feels like: ${feels_like}°C</div>
            <div id="pressure">Pressure: ${element.pressure} mb</div>
            <div id="wind_speed">Wind Speed: ${Math.round(element.wind_speed)} km/h</div>
        </div>
    </div>
`
        return cardHTML;
    }

    static daily(element, timezoneOffset, index = 0) {
        const currentDay = getDay((new Date().getDay() + index))
        const timezone_offset = timezoneOffset * 1000;
        const current_time = element.dt * 1000
        const dayTemp = element.feels_like.day;
        const nightTemp = element.feels_like.night;
        const time = new Date(current_time + timezone_offset);
        console.log(element);
        const htmlToReturn = `
        <div class = "weather-card" >
        <div class="weather-card__day">${currentDay}</div>
            <div class="weather-card__temp">${Math.round(element.temp.max)}° <div id="dayTemp">Day: ${dayTemp}°</div><div id="nightTemp">Night: ${nightTemp}°</div></div>
        <div id="weather-info">
            <div class="weather-card__precipitation"><span class ="weather-card__precipitation__span">Precipitation</span> : ${Math.floor(element.pop * 100)}%</div>
            <div class="weather-card__wind-speed">Wind Speed : ${Math.floor(element.wind_speed)}m/s</div>
            </div>
        </div>  
        `
        return htmlToReturn;

    }
}