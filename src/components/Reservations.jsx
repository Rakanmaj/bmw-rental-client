// Reservations.jsx
import { Link, useLocation } from "react-router-dom";
import { useEffect } from "react";
import {
  FaCalendarAlt,
  FaUser,
  FaPhoneAlt,
  FaArrowRight,
} from "react-icons/fa";

import "../styles/reservations.css";
import "../styles/icons.css";
import CancelReservation from "./CancelReservation";

function Reservations({ reservations, onCancel, onRefresh }) {
  const location = useLocation();

  const handleCardMove = (e) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    card.style.setProperty("--mx", `${x}%`);
    card.style.setProperty("--my", `${y}%`);
  };

  useEffect(() => {
    onRefresh();
  }, [location.pathname]); // (same logic)

  return (
    <div className="reservations-page">
      <div className="reservations-header">
        <div>
          <h1>Reservations</h1>
          <p>Manage your BMW rental reservations</p>
        </div>

        <Link to="/cars" className="primary">
          Make a Reservation
        </Link>
      </div>

      {/* EMPTY STATE */}
      {reservations.length === 0 && (
        <div className="empty-box">
          <h3>No keys in hand — yet.</h3>
          <p>
            Your next <span id="Blue">B</span>
            <span id="dark-blue">M</span>
            <span id="red">W</span>{" "}
            experience starts with a single choice. Browse the fleet and book your drive.
          </p>
          <Link to="/cars" className="primary">
            Explore Fleet <FaArrowRight className="icon" />
          </Link>
        </div>
      )}

      {reservations.map((res) => (
        <div
          key={res.reservation_id}
          className="reservation-card"
          onMouseMove={handleCardMove}
        >
          <div className="reservation-image">
            <img src={`/assets/${res.image_url}`} alt={res.car_name} />
          </div>

          <div className="reservation-info">
            <h3>{res.car_name}</h3>

            <span className={`status ${res.status}`}>
              {res.status?.toUpperCase()}
            </span>

            {res.status === "denied" && (
              <p className="admin-note">Reason: {res.admin_note}</p>
            )}

            <p className="reservation-meta">
              <FaCalendarAlt className="icon" />{" "}
              {new Date(res.pickup_date).toLocaleDateString("en-GB")} at {res.pickup_time}
              {" "}–{" "}
              {new Date(res.return_date).toLocaleDateString("en-GB")} at {res.return_time}
              {" "} — <FaUser className="icon" /> {res.full_name}
              {" "} — <FaPhoneAlt className="icon" /> {res.phone}
            </p>
          </div>

          <div className="reservation-summary">
            <div className="price">${res.total_price}</div>
            <div className="reservation-id">ID: {res.reservation_id}</div>
          </div>

          {/* ✅ CANCEL (component-based, authorized) */}
          {res.status !== "accepted" && (
            <CancelReservation reservation={res} onCancel={onCancel} />
          )}

          {/* ✅ UPDATE (link-based, clean) */}
          {res.status === "pending" && (
            <Link
              to="/update-reservation"
              className="update-btn"
              onClick={() =>
                localStorage.setItem("reservationToUpdate", JSON.stringify(res))
              }
            >
              Update
            </Link>
          )}
        </div>
      ))}
    </div>
  );
}

export default Reservations;
