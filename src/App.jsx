import { useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WeatherSuggestions from "./components/WeatherSuggestions";
import Features from "./components/Features";

function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  const cars = [
    {
      car_id: 1,
      type: "Convertible",
      name: "BMW Z4",
      image: "/assets/Z4Img.png",
      price: 299,
    },
    {
      car_id: 2,
      type: "SUV",
      name: "BMW X5",
      image: "/assets/X5Img.png",
      price: 249,
    },
    {
      car_id: 3,
      type: "Sedan",
      name: "BMW M5",
      image: "/assets/M5.png",
      price: 349,
    },
    {
      car_id: 4,
      type: "Coupe",
      name: "BMW M4",
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
