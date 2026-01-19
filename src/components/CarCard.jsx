import { Link } from "react-router-dom";
import "../styles/fleet.css"; 
function CarCard({ car, onSelectCar }) {
  return (
    <div className="car-card">
      {/* IMAGE */}
      <div className="card-media">
        <img
          src={`/assets/${car.image_url}`}
          alt={car.name}
          loading="lazy"
        />
        <div className="pill">{car.type}</div>
      </div>

      {/* BODY */}
      <div className="card-body">
        <small className="series">{car.series}</small>
        <h3>{car.name}</h3>
        <p className="desc">{car.description}</p>

        <div className="card-stats">
          <span>⚡ {car.hp}</span>
          <span>⏱️ {car.speed}</span>
        </div>

        <hr />

        <div className="card-footer">
          <div className="price">
            <strong>${car.price_per_day}</strong>
            <span>/day</span>
          </div>

          <Link
            to={`/reserve/${car.car_id}`}
            className="primary small"
            onClick={() => onSelectCar(car)}
          >
            Book Now →
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
