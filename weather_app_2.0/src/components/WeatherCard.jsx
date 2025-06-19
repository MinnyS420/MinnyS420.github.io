import React from "react";

const WeatherCard = ({ weather }) => {
  const windSpeedMps = weather.wind.speed;
  const windSpeedKmh = (windSpeedMps * 3.6).toFixed(1);

  return (
    <div>
      <h2 className="text-2xl font-semibold text-center mt-4">
        {weather.name}, {weather.sys.country}
      </h2>
      <div className="flex items-center justify-center mt-4">
        <img
          src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
          alt={weather.weather[0].description}
          className="w-16 h-16"
        />
        <p className="text-4xl font-bold">{Math.round(weather.main.temp)}°C</p>
      </div>
      <p className="text-center text-gray-100 capitalize">
        {weather.weather[0].description}
      </p>
      <div className="grid grid-cols-2 gap-4 mt-6">
        <div className="text-center">
          <p className="text-gray-300">Humidity</p>
          <p className="text-2xl font-semibold">{weather.main.humidity}%</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300">Wind</p>
          <p className="text-2xl font-semibold">{windSpeedKmh} km/h</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300">Pressure</p>
          <p className="text-2xl font-semibold">{weather.main.pressure} hPa</p>
        </div>
        <div className="text-center">
          <p className="text-gray-300">Feels like</p>
          <p className="text-2xl font-semibold">
            {Math.round(weather.main.feels_like)}°C
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
