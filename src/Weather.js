import React, { useState } from 'react';
import './App.css';

function App() {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [error, setError] = useState(null);

  const API_KEY = '3b4f1fe182a7e9bc72d353d1f3546c96';  //enter your api here

  const fetchWeather = async () => {
    try {
      setError(null); // Clear any previous errors
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}`
      );
      if (!response.ok) {
        throw new Error('Weather data not found');
      }
      const data = await response.json();
      setWeather(data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
      setError('Weather data not found');
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent the default form submission behavior
    if (city) {
      fetchWeather();
    }
  };

  const handleChange = (e) => {
    setCity(e.target.value);
  };

  return (
<div className="App">
          <h1>Weather App</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Enter city name"
          value={city}
          onChange={handleChange}
        />
        <button type="submit">Get Weather</button>
      </form>
      {error && <p className="error">{error}</p>}
      {weather && (
        <div className="weather-info">
          <h2>Weather in {weather.name}, {weather.sys?.country}</h2>
          <p>Temperature: {Math.round(weather.main?.temp - 273.15)}°C / {Math.round((weather.main?.temp - 273.15) * 9/5 + 32)}°F</p>
          <p>Weather: {weather.weather[0]?.description}</p>
          <p>Humidity: {weather.main?.humidity}%</p>
        </div>
      )}
    </div>
  );
}

export default App;
