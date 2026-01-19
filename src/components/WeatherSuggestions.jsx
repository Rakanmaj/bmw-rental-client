import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import "../styles/weather.css";

const API_KEY = "b54bde8d5b4390e8d30ae5352023561d";

function WeatherSuggestions({ onSelectCar, cars }) {
  const [weather, setWeather] = useState(null);
  const [city, setCity] = useState("");
  const [suggestedCars, setSuggestedCars] = useState([]);

  // Fetch weather ONLY when cars are ready
  useEffect(() => {
    if (!cars || cars.length === 0) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        axios
          .get(
            `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${API_KEY}`
          )
          .then((res) => {
            const weatherMain = res.data.weather[0].main;
            setWeather(weatherMain);
            setCity(res.data.name);
            pickCarsByWeather(weatherMain);
          })
          .catch((err) => {
            console.error("Weather fetch error:", err);
          });
      },
      (err) => {
        console.error("Geolocation error:", err);
      }
    );
  }, [cars]);

  const pickCarsByWeather = (condition) => {
    let filtered = [];

    switch (condition) {
      case "Clear":
        filtered = cars.filter(
          (c) =>
            c.type.includes("Convertible") ||
            c.type.includes("Coupe") ||
            c.type.includes("Roadster")
        );
        break;

      case "Clouds":
        filtered = cars.filter(
          (c) => c.type.includes("Sedan") || c.type.includes("Coupe")
        );
        break;

      case "Rain":
      case "Thunderstorm":
      case "Snow":
        filtered = cars.filter((c) => c.type.includes("SUV"));
        break;

      default:
        filtered = cars;
    }

    setSuggestedCars(filtered.slice(0, 3));
  };

  if (!weather) return null;

  return (
    <section className={`weather-section weather-${weather.toLowerCase()}`}>
      <div className="weather-container">
        <div className="weather-header">
          <span className="weather-tag">SMART SUGGESTIONS</span>
          <h2>
            Weather in {city}: {weather}
          </h2>
          <p>Today’s weather sets the mood — these BMWs are tuned to match it.</p>
        </div>

        <div className="cards">
          {suggestedCars.map((car) => (
            <CarCard
              key={car.car_id}
              car={car}
              onSelectCar={onSelectCar}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeatherSuggestions;
