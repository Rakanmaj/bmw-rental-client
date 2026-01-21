import { useState, useEffect } from "react";
import CarCard from "./CarCard";
import "../styles/fleet.css";
import api from "../api";
function CarsPage({ onSelectCar = () => {} }) {
  const [cars, setCars] = useState([]);

  useEffect(() => {
  const fetchCars = async () => {
    try {
      const response = await api.get("/api/cars");
      setCars(response.data);
    } catch (error) {
      console.error("Error fetching car data:", error);
    }
  };

  fetchCars();
}, []);

  return (
    <section className="fleet">
      <section className="fleet cars-hero">
        <div className="fleet-header">
          <div className="fleet-left">
            <span className="section-tag">OUR FLEET</span>
            <h2 className="fleet-title">Find Your Perfect BMW</h2>
            <p className="fleet-intro">
              Browse our exclusive collection of BMW vehicles. From sporty M
              models to luxurious SUVs, find the perfect car for your journey.
            </p>
          </div>
        </div>
      </section>

      <div className="cards">
        {cars.map((car) => (
          <CarCard
            key={car.car_id}
            car={car}
            onSelectCar={onSelectCar}
          />
        ))}
      </div>
    </section>
  );
}

export default CarsPage;
