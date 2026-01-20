import { Link } from "react-router-dom";
import { useState } from "react";
import Navbar from "./navbar";
import "../styles/reservation.css";
import "../styles/icons.css";

import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

import { FaBolt, FaTachometerAlt, FaArrowRight } from "react-icons/fa";

function Reservation({ selectedCar = null, datesData, onSaveDates }) {
  const data = selectedCar;

  const [pickupDate, setPickupDate] = useState(datesData?.pickupDate || null);
  const [pickupTime, setPickupTime] = useState(datesData?.pickupTime || "");
  const [returnDate, setReturnDate] = useState(datesData?.returnDate || null);
  const [returnTime, setReturnTime] = useState(datesData?.returnTime || "");

  const handleContinue = (e) => {
    
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      e.preventDefault();
      alert("Please choose pickup/return dates AND times.");
      return;
    }

    const start = new Date(pickupDate);
    const end = new Date(returnDate);

    // ✅ Return date must be same or later
    if (end < start) {
      e.preventDefault();
      alert("Return date must be the same or later than pickup date.");
      return;
    }

    const reservationDates = {
      pickupDate: start,
      pickupTime,
      returnDate: end,
      returnTime,
    };

    onSaveDates(reservationDates);
  };

  // Optional safety: if user somehow reached this page without selecting a car
  if (!data) {
    return (
      <div className="reservation-page">
        <Navbar />
        <div style={{ padding: "40px", textAlign: "center" }}>
          <h2>No car selected</h2>
          <p>Please go back and select a car first.</p>
          <Link to="/cars" className="continue-btn">
            Go to Cars <FaArrowRight className="iconnn" />
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="reservation-page">
      <Navbar />

      {/* Stepper */}
      <div className="global-stepper">
        <div className="step-item active">
          <div className="circle">1</div>
          <span>Dates</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item">
          <div className="circle">2</div>
          <span>Details</span>
        </div>

        <div className="step-line"></div>

        <div className="step-item">
          <div className="circle">3</div>
          <span>Confirm</span>
        </div>
      </div>

     {/* Main layout */}
      <div className="reservation-layout">
        {/* LEFT — CAR SUMMARY */}
        <div className="car-card">
          <img src={`/assets/${data.image_url}`} alt={data.name} className="car-img" />

          <div className="car-content">
            <span className="tag">{data.type}</span>
            <h2 className="car-title">{data.name}</h2>
            <p className="subtitle">{data.series}</p>

            <div className="car-stats">
              <span><FaBolt className="icon" /> {data.hp}</span>
              <span><FaTachometerAlt className="icon" /> {data.speed}</span>
            </div>

            <p className="price-label">Price per day</p>
            <div className="price">${data.price_per_day}</div>
          </div>
        </div>


        {/* RIGHT — FORM */}
        <div className="form-panel">
          <h2 className="form-title">Select Dates & Times</h2>
          <p className="form-sub">Choose your pickup and return schedule.</p>

          <div className="form-grid">
            {/* PICKUP */}
            <div className="form-row">
              <div className="field">
                <label>Pickup Date</label>
                <div className="date-input-wrapper">
                  <DatePicker
                    selected={pickupDate}
                    onChange={(date) => setPickupDate(date)}
                    placeholderText="Choose date"
                    dateFormat="dd MMM yyyy"
                    className="input"
                    minDate={new Date()}
                  />
                </div>
              </div>

              <div className="field">
                <label>Pickup Time</label>
                <select
                  className="input"
                  value={pickupTime}
                  onChange={(e) => setPickupTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>01:00 PM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                  <option>04:00 PM</option>
                  <option>05:00 PM</option>
                  <option>06:00 PM</option>
                  <option>07:00 PM</option>
                  <option>08:00 PM</option>
                  <option>09:00 PM</option>
                </select>
              </div>
            </div>

            {/* RETURN */}
            <div className="form-row">
              <div className="field">
                <label>Return Date</label>
                <div className="date-input-wrapper">
                  <DatePicker
                    selected={returnDate}
                    onChange={(date) => setReturnDate(date)}
                    placeholderText="Choose date"
                    dateFormat="dd MMM yyyy"
                    className="input"
                    minDate={pickupDate || new Date()}
                  />
                </div>
              </div>

              <div className="field">
                <label>Return Time</label>
                <select
                  className="input"
                  value={returnTime}
                  onChange={(e) => setReturnTime(e.target.value)}
                >
                  <option value="">Select time</option>
                  <option>09:00 AM</option>
                  <option>10:00 AM</option>
                  <option>11:00 AM</option>
                  <option>12:00 PM</option>
                  <option>01:00 PM</option>
                  <option>02:00 PM</option>
                  <option>03:00 PM</option>
                  <option>04:00 PM</option>
                  <option>05:00 PM</option>
                  <option>06:00 PM</option>
                  <option>07:00 PM</option>
                  <option>08:00 PM</option>
                  <option>09:00 PM</option>
                </select>
              </div>
            </div>
          </div>

          {/* Continue */}
          <Link to="/details" className="continue-btn" onClick={handleContinue}>
            Continue <FaArrowRight className="iconnn" />
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Reservation;
