import { Link } from "react-router-dom";
import CarCard from "./CarCard"; // ✅ import it
import "../styles/fleet.css";
import "../styles/icons.css";

function Fleet({ onSelectCar = () => {} }) {
  return (
    <section className="fleet">
      <div className="fleet-header">
        <div className="fleet-left">
          <span className="section-tag">FEATURED FLEET</span>
          <h2>Handpicked for Excellence</h2>
          <p className="fleet-intro">
            Discover our most popular BMW models, each offering a unique blend
            of performance, luxury, and driving pleasure.
          </p>
        </div>

        <div className="fleet-right">
          <Link to="/cars" className="ghost view-all">
            View All Cars →
          </Link>
        </div>
      </div>

      <div className="cards">
        {cars.map((car) => {
         
          const adaptedCar = {
            car_id: car.id,
            name: car.name,
            type: car.type,
            series: car.series,
            hp: car.hp,
            speed: car.speed,
            price_per_day: car.price,
            description: car.desc,
            image_url: car.image_url || car.image, // supports both
          };

          return (
            <CarCard
              key={car.id}
              car={adaptedCar}
              onSelectCar={onSelectCar}
            />
          );
        })}
      </div>
    </section>
  );
}

export default Fleet;
