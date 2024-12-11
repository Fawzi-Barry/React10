import React, { useState } from "react";
import "./App.css";

function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  const fetchWeather = async () => {
    const apiKey = "58175f0dd6038396b5c3ebaa15d8fa91";
    const endpoint = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}`;
    try {
      const response = await fetch(endpoint);
      const data = await response.json();
      if (response.ok) {
        setWeather(data);
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error("Error fetching weather data:", error);
      alert("Failed to fetch weather data");
    }
  };

  return (
    <div className="app">
      <h1 className="title">Weather App</h1>
      <div className="search-section">
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          className="search-input"
        />
        <button onClick={fetchWeather} className="search-button">Search</button>
      </div>
      {weather && (
        <div className="weather-card">
          <h2>{weather.name}</h2>
          <p>{weather.weather[0].description}</p>
          <h3>{weather.main.temp}°C</h3>
          <p>Humidity: {weather.main.humidity}%</p>
          <p>Wind Speed: {weather.wind.speed} m/s</p>
        </div>
      )}
    </div>
  );
}

export default App;
