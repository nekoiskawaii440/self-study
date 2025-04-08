import { useState } from "react";
import "./App.css"; // CSS を読み込む

interface WeatherData {
  main: {
    temp: number;
  };
  weather: { description: string; icon: string }[];
}

const WeatherApp = () => {
  const [city, setCity] = useState<string>("Fukuoka");
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [error, setError] = useState<string | null>(null);

  const fetchWeather = async () => {
    try {
      const res = await fetch(`http://127.0.0.1:8000/weather?city=${city}`);
      if (!res.ok) {
        throw new Error("データが取得できませんでした");
      }
      const data: WeatherData = await res.json();
      setWeather(data);
      setError(null);
    } catch (err) {
      setError("天気情報を取得できませんでした。都市名を確認してください。");
      setWeather(null);
    }
  };

  return (
    <div className="container">
      <h1>Weather App</h1>
      <div className="input-container">
        <input
          type="text"
          value={city}
          onChange={(e) => setCity(e.target.value)}
          placeholder="都市名を入力"
          className="input"
        />
        <button onClick={fetchWeather} className="button">
          検索
        </button>
      </div>

      {error && <p className="error">{error}</p>}

      {weather ? (
        <div className="weather-card">
          <h3 className="city">{city}</h3>
          <p className="temp">🌡️ {weather.main.temp}°C</p>
          <img
            src={`https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`}
            alt="Weather icon"
            className="icon"
          />
          <p className="condition">🌥️ {weather.weather[0].description}</p>
        </div>
      ) : (
        <p>都市を入力して検索してください</p>
      )}
    </div>
  );
};

export default WeatherApp;