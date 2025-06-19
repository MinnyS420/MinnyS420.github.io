import React, { useState } from "react";

const SearchBar = ({ fetchWeather }) => {
  const [city, setCity] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (city.trim()) {
      fetchWeather(city);
      setCity("");
    }
  };

  return (
    <form className="flex" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Enter a city name"
        value={city}
        onChange={(e) => setCity(e.target.value)}
        className="flex-1 p-2 border border-gray-300 border-r-0 rounded-lg rounded-r-none outline-none"
      />
      <button
        className="bg-blue-500 border cursor-pointer border-l-0 rounded-lg rounded-l-none p-2 hover:bg-blue-600"
        type="submit"
      >
        Search
      </button>
    </form>
  );
};

export default SearchBar;
