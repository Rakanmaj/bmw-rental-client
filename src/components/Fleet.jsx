import { Link } from "react-router-dom";

import XMImg from "../assets/BmwXM.png";
import M8Img from "../assets/M8.png";
import M5CS from "../assets/CS.png";

import "../styles/fleet.css";

function Fleet({ onSelectCar = () => {} }) {
  

  const cars = [
   {
       id: "m8-competition",
       name: "BMW M8 Competition",
       type: "Coupe",
       series: "8 Series • 2024",
       price: 599,
       hp: "617 HP",
       speed: "2.9s 0–60",
       image: M8Img,
       desc: "BMW's most powerful coupe — pure speed, elegant design, unmatched presence.",
     },
    {
        id: "xm",
        name: "BMW XM",
        type: "SUV",
        series: "M Hybrid • 2024",
        price: 529,
        hp: "644 HP",
        speed: "4.1s 0–60",
        image: XMImg,
        desc: "A bold, electrified M monster — extreme design, massive torque, hybrid power.",
      },
    {
      id: "bmw-m5-cs",
      name: "BMW M5 CS",
      type: "Sedan",
      series: "5 Series • 2023 Limited",
      price: 499,
      hp: "627 HP",
      speed: "2.8s 0–60",
      image: M5CS,
      desc: "BMW’s fastest production car ever — lightweight, track-ready, and brutally quick."
    },
  ];
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
          <Link to="/cars" className="ghost view-all">View All Cars →</Link>
        </div>
      </div>

      {/* CAR LIST */}
      <div className="cards">
        {cars.map((car) => (
          <div className="car-card" key={car.id}>
            <div className="card-media">
              <img src={car.image} alt={car.name} loading="lazy" />
              <div className="pill">{car.type}</div>
            </div>

            <div className="card-body">
              <small className="series">{car.series}</small>
              <h3>{car.name}</h3>
              <p className="desc">{car.desc}</p>

              <div className="card-stats">
                <span>⚡ {car.hp}</span>
                <span>⏱️ {car.speed}</span>
              </div>

              <hr />

              <div className="card-footer">
                <div className="price">
                  <strong>${car.price}</strong>
                  <span>/day</span>
                </div>

                {/* Clicking Book Now sets selected car via onSelectCar and navigates */}
                <Link
                  to={`/reserve/${car.id}`}
                  className="primary small"
                  onClick={() => onSelectCar(car)} 
                >
                  Book Now →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}

export default Fleet;