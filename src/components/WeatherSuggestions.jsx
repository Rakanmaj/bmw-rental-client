import { useState, useEffect } from "react";
import axios from "axios";
import CarCard from "./CarCard";
import "../styles/weather.css";

const weatherApiKey = import.meta.env.VITE_WEATHER_API_KEY;
 //const TEST_CITY = "Dubai";

function WeatherSuggestions({ onSelectCar, cars = [] }) {
  const [weatherCondition, setWeatherCondition] = useState(null);
  const [city, setCity] = useState("");
  const [suggestedCars, setSuggestedCars] = useState([]);

  // Loading + error states so it renders even if weather fails
  const [isWeatherLoading, setIsWeatherLoading] = useState(true);
  const [weatherErrorMessage, setWeatherErrorMessage] = useState("");

  // Make sure cars is always an array
  const safeCars = Array.isArray(cars) ? cars : [];

  const pickCarsByWeather = (condition) => {
    let filteredCars = [];

    switch (condition) {
      case "Clear":
        filteredCars = safeCars.filter((car) => {
          const carType = car?.type || "";
          return (
            carType.includes("Convertible") ||
            carType.includes("Coupe") ||
            carType.includes("Roadster")
          );
        });
        break;

      case "Clouds":
        filteredCars = safeCars.filter((car) => {
          const carType = car?.type || "";
          return carType.includes("Sedan") || carType.includes("Coupe");
        });
        break;

      case "Rain":
      case "Thunderstorm":
      case "Snow":
        filteredCars = safeCars.filter((car) =>
          (car?.type || "").includes("SUV")
        );
        break;

      default:
        filteredCars = safeCars;
    }

    setSuggestedCars(filteredCars.slice(0, 3));
  };

  // Fetch weather ONLY when cars are ready
  useEffect(() => {
    if (safeCars.length === 0) return;

    setIsWeatherLoading(true);
    setWeatherErrorMessage("");

    // If API key missing, fallback immediately
    if (!weatherApiKey) {
      setWeatherErrorMessage("Weather API key is missing");
      setIsWeatherLoading(false);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;

        try {
          const weatherResponse = await axios.get(
           `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&units=metric&appid=${weatherApiKey}`
           // `https://api.openweathermap.org/data/2.5/weather?q=${TEST_CITY}&units=metric&appid=${weatherApiKey}`
          );

          const condition = weatherResponse?.data?.weather?.[0]?.main;

          if (!condition) {
            setWeatherErrorMessage("Weather data missing");
            setIsWeatherLoading(false);
            return;
          }

          setWeatherCondition(condition);
          setCity(weatherResponse?.data?.name || "");
          pickCarsByWeather(condition);
          setIsWeatherLoading(false);
        } catch (error) {
          console.error("Weather fetch error:", error);
          setWeatherErrorMessage("Weather fetch failed");
          setIsWeatherLoading(false);
        }
      },
      (geoError) => {
        console.error("Geolocation error:", geoError);
        setWeatherErrorMessage("Location permission denied");
        setIsWeatherLoading(false);
      }
    );
  }, [safeCars]);

  // Show loading UI instead of returning null
  if (isWeatherLoading) {
    return (
      <section className="weather-section">
        <div className="weather-container">
          <div className="weather-header">
            <span className="weather-tag">SMART SUGGESTIONS</span>
            <h2>Loading weather...</h2>
            <p>Getting your location and weather to suggest the best BMWs.</p>
          </div>
        </div>
      </section>
    );
  }

  // Fallback UI if weather fails (still show some cars)
  if (weatherErrorMessage || !weatherCondition) {
    return (
      <section className="weather-section">
        <div className="weather-container">
          <div className="weather-header">
            <span className="weather-tag">SMART SUGGESTIONS</span>
            <h2>Weather suggestions</h2>
            <p>Weather is not available right now, so here are popular picks.</p>
          </div>

          <div className="cards">
            {safeCars.slice(0, 3).map((car) => (
              <CarCard key={car.car_id} car={car} onSelectCar={onSelectCar} />
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section
      className={`weather-section weather-${weatherCondition.toLowerCase()}`}
    >
      <div className="weather-container">
        <div className="weather-header">
          <span className="weather-tag">SMART SUGGESTIONS</span>
          <h2>
            Weather in {city}: {weatherCondition}
          </h2>
          <p>Today’s weather sets the mood — these BMWs are tuned to match it.</p>
        </div>

        <div className="cards">
          {suggestedCars.map((car) => (
            <CarCard key={car.car_id} car={car} onSelectCar={onSelectCar} />
          ))}
        </div>
      </div>
    </section>
  );
}

export default WeatherSuggestions;
