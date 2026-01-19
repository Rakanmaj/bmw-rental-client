import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WeatherSuggestions from "./components/WeatherSuggestions";
import Features from "./components/Features";
import Fleet from "./components/Fleet";

function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  const cars = [
    {
      id: 1,
      type: "Convertible",
      series: "Z SERIES",
      name: "BMW Z4",
      desc: "Open-top performance with sharp handling and premium comfort.",
      hp: "382 hp",
      speed: "0–100 in 4.5s",
      image: "/assets/Z4Img.png",
      price: 299,
    },
    {
      id: 2,
      type: "SUV",
      series: "X SERIES",
      name: "BMW X5",
      desc: "Luxury SUV with confident power and all-weather capability.",
      hp: "335 hp",
      speed: "0–100 in 5.3s",
      image: "/assets/X5Img.png",
      price: 249,
    },
    {
      id: 3,
      type: "Sedan",
      series: "M SERIES",
      name: "BMW M5",
      desc: "Executive sedan with supercar-level performance and comfort.",
      hp: "617 hp",
      speed: "0–100 in 3.3s",
      image: "/assets/M5.png",
      price: 349,
    },
    {
      id: 4,
      type: "Coupe",
      series: "M SERIES",
      name: "BMW M4",
      desc: "Track-ready coupe with aggressive styling and precise control.",
      hp: "503 hp",
      speed: "0–100 in 3.9s",
      image: "/assets/M4_Convertible.png",
      price: 329,
    },
  ];

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Fleet onSelectCar={handleSelectCar} />
              <WeatherSuggestions onSelectCar={handleSelectCar} cars={cars} />
              <Features />
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
