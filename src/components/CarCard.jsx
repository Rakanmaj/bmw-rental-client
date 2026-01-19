import { Link } from "react-router-dom";
import { FaBolt, FaTachometerAlt, FaArrowRight } from "react-icons/fa";
import "../styles/fleet.css";
import "../styles/icons.css";
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

        {/* STATS */}
        <div className="card-stats">
          <span>
            <FaBolt className="icon" /> {car.hp}
          </span>
          <span>
            <FaTachometerAlt className="icon" />{car.speed}
          </span>
        </div>

        <hr />

        {/* FOOTER */}
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
            Book Now <FaArrowRight />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default CarCard;
