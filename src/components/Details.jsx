import { Link } from "react-router-dom";
import { useState } from "react";
import { FaBolt, FaTachometerAlt, FaCheck, FaArrowRight } from "react-icons/fa";
import Navbar from "./navbar";
import "../styles/details.css";

function Details({ selectedCar, datesData, userData, onSaveUserDetails }) {
  const [fullName, setFullName] = useState(userData?.fullName || "");
  const [email, setEmail] = useState(userData?.email || "");
  const [phone, setPhone] = useState(userData?.phone || "");

  const handleSave = () => {
    onSaveUserDetails({ fullName, email, phone });
  };

  const handleHoverMove = (e) => {
    const box = e.currentTarget;
    const rect = box.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    box.style.setProperty("--x", `${x}px`);
    box.style.setProperty("--y", `${y}px`);
  };

  const OneDayMs = 24 * 60 * 60 * 1000;
  const diffDays = Math.max(
    1,
    Math.round(Math.abs(datesData.returnDate - datesData.pickupDate) / OneDayMs)
  );

  const totalPrice = diffDays * selectedCar.price_per_day;

  return (
    <div className="details-page">
      <Navbar />

      {/* ---- GLOBAL STEPPER ---- */}
      <div className="global-stepper">
        <div className="step-item completed">
          <div className="circle check">
            <FaCheck className="iconnnn" />
          </div>
          <span>Dates</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item active">
          <div className="circle">2</div>
          <span>Details</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item">
          <div className="circle">3</div>
          <span>Confirm</span>
        </div>
      </div>

      {/* ---- LAYOUT ---- */}
      <div className="details-layout">
        {/* LEFT CARD */}
        <div className="details-car-card">
          <img src={`/assets/${selectedCar.image_url}`} alt="" className="car-img" />

          <div className="car-content">
            <span className="tag">{selectedCar.type}</span>
            <h2 className="car-title">{selectedCar.name}</h2>
            <p className="subtitle">{selectedCar.series}</p>

            <div className="car-stats">
              <span>
                <FaBolt className="icon" /> {selectedCar.hp}
              </span>
              <span>
                <FaTachometerAlt className="icon" /> {selectedCar.speed}
              </span>
            </div>

            <p className="price-label">Price per day</p>
            <div className="price">${selectedCar.price_per_day}</div>

            <div className="days-box" onMouseMove={handleHoverMove}>
              <span>{diffDays} days</span>
              <strong>${totalPrice}</strong>
            </div>
          </div>
        </div>

        {/* RIGHT FORM */}
        <div className="details-form-panel">
          <h2>Your Details</h2>
          <p className="form-sub">Enter your contact information.</p>

          <div className="form-fields">
            <div className="field">
              <label>Full Name</label>
              <input
                className="input"
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Email Address</label>
              <input
                className="input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            <div className="field">
              <label>Phone Number</label>
              <input
                className="input"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
          </div>

          {/* BUTTONS */}
          <div className="details-buttons">
            <Link
              to={`/reserve/${selectedCar.car_id}`}  // ✅ fixed id key
              className="back-btn"
            >
              Back
            </Link>

            <Link to="/confirm" className="continue-btn" onClick={handleSave}>
              Review Booking <FaArrowRight className="icon" />
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Details;
