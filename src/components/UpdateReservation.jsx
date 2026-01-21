import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import DatePicker from "react-datepicker";
import "../styles/UpdateReservationPage.css";
import Navbar from "./navbar";
import { useNavigate } from "react-router-dom";
import api from "../api";


function UpdateReservation() {
  const stored = localStorage.getItem("reservationToUpdate");
  const reservation = stored ? JSON.parse(stored) : null;

  const user = JSON.parse(localStorage.getItem("user"));

  const [pickupDate, setPickupDate] = useState(null);
  const [pickupTime, setPickupTime] = useState("");
  const [returnDate, setReturnDate] = useState(null);
  const [returnTime, setReturnTime] = useState("");

const navigate = useNavigate();

const today = new Date();
today.setHours(0, 0, 0, 0);



  useEffect(() => {
    if (!reservation) return;

    setPickupDate(new Date(reservation.pickup_date));
    setPickupTime(reservation.pickup_time);
    setReturnDate(new Date(reservation.return_date));
    setReturnTime(reservation.return_time);
  }, []);

  if (!reservation) {
    return (
      <div className="reservation-page">
        <Navbar />
        <p >No reservation selected.</p>
        <Link to="/reservations">Back</Link>
      </div>
    );
  }

  // dynamic price
  const oneDay = 24 * 60 * 60 * 1000;
  const days =
    pickupDate && returnDate
      ? Math.max(1, Math.round((returnDate - pickupDate) / oneDay))
      : 1;

  const totalPrice = days * reservation.price_per_day;

  const handleUpdate = async () => {
    if (!pickupDate || !returnDate || !pickupTime || !returnTime) {
      alert("Please complete all fields");
      return;
    }

    if (returnDate < pickupDate) {
      alert("Return date must be after pickup date");
      return;
    }

    try {
      await api.put(
        `/api/reservations/user/${reservation.reservation_id}`,
        {
          pickup_date: pickupDate.toISOString(),
          pickup_time: pickupTime,
          return_date: returnDate.toISOString(),
          return_time: returnTime,
        },
        {
          headers: {
            "x-user-id": user.user_id,
            "x-user-role": user.role,
          },
        }
      );

      alert("Reservation updated successfully");


      localStorage.removeItem("reservationToUpdate");
      
    navigate("/reservations");
    } catch (err) {
      console.error(err);
      alert("Update failed");
    }
  };

  return (
   <div className="update-reservation-page">
  <Navbar />

  <div className="update-layout">
    {/* LEFT — CAR */}
    <div className="update-summary">
      <img
        src={`/assets/${reservation.image_url}`}
        alt={reservation.car_name}
      />

      <div className="update-summary-content">
        <h3>{reservation.car_name}</h3>

        <p className="price-label">Price per day</p>
        <div className="price">${reservation.price_per_day}</div>

        <div className="days-box">
          <span>{days} days</span>
          <strong>${totalPrice}</strong>
        </div>
      </div>
    </div>

    {/* RIGHT — FORM */}
    <div className="update-form-panel">
      <h2>Update Reservation</h2>
      <p className="update-form-sub">Modify pickup and return details</p>

      <div className="update-form-grid">
        <div className="update-form-row">
          <div className="field">
            <label>Pickup Date</label>
           <DatePicker
  selected={pickupDate}
  onChange={setPickupDate}
  className="input"
  dateFormat="dd MMM yyyy"
  minDate={today}
/>
          </div>

          <div className="field">
            <label>Pickup Time</label>
            <select
              className="input"
              value={pickupTime}
              onChange={(e) => setPickupTime(e.target.value)}
            >
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

        <div className="update-form-row">
          <div className="field">
            <label>Return Date</label>
            <DatePicker
  selected={returnDate}
  onChange={setReturnDate}
  className="input"
  dateFormat="dd MMM yyyy"
  minDate={pickupDate || today}
/>

          </div>

          <div className="field">
            <label>Return Time</label>
            <select
              className="input"
              value={returnTime}
              onChange={(e) => setReturnTime(e.target.value)}
            >
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

      <div className="update-actions">
        <Link to="/reservations" className="update-cancel">
          Cancel
        </Link>

       <button
  className="continue-btn"
  onClick={handleUpdate}
>
  Confirm Update →
</button>

      </div>
    </div>
  </div>
</div>
  );
}

export default UpdateReservation;
