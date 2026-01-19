import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import Navbar from "./navbar";
import axios from "axios";  // Import axios for making the API call
import "../styles/confirm.css";

function Confirm({ selectedCar, datesData, userDetails, onCreateReservation }) {
const navigate = useNavigate();


  const oneDay = 24 * 60 * 60 * 1000;
  const diffDays = Math.max(
    1,
    Math.round(Math.abs(datesData.returnDate - datesData.pickupDate) / oneDay)
  );



const handleConfirm = () => {
  // Retrieve user_id from localStorage
  const storedUser = localStorage.getItem("user");
  const user = storedUser ? JSON.parse(storedUser) : null;
  
  if (!user) {
    alert("User is not logged in!");
    return;
  }

  console.log (userDetails.diffDays);

  const reservation = {
    user_id: user.user_id,  // Send the user_id from localStorage
    car_id: selectedCar.car_id,
    pickup_date: datesData.pickupDate,
    pickup_time: datesData.pickupTime,
    return_date: datesData.returnDate,
    return_time: datesData.returnTime,
    total_price: diffDays * selectedCar.price_per_day,
    status: "pending",
      admin_note: "",
  };

  // Send the reservation data to the backend
  axios.post(
  "http://localhost:3000/api/reservations",
  reservation,
  {
    headers: {
      "x-user-id": user.user_id,
      "x-user-role": user.role,
    },
  }
)
    .then((response) => {
      
      alert("Reservation confirmed!");
      onCreateReservation(response.data);
      navigate("/reservations");  // Redirect to reservations page after confirmation
      
    })
    .catch((error) => {
      console.error("Error confirming reservation:", error);
      alert("There was an error confirming the reservation. Please try again.");
    });
};


  return (
    <div className="confirm-page">
      <Navbar />

      {/* STEPPER */}
      <div className="global-stepper">
        <div className="step-item completed">
          <div className="circle check">✓</div>
          <span>Dates</span>
        </div>
        <div className="step-line"></div>

        <div className="step-item completed">
          <div className="circle check">✓</div>
          <span>Details</span>
        </div>
        <div className="step-line"></div>

        <div className="step-item active">
          <div className="circle">3</div>
          <span>Confirm</span>
        </div>
      </div>

      {/* MAIN */}
      <div className="confirm-layout">
        {/* LEFT */}
        <div className="confirm-car-card">
          <img src={`/assets/${selectedCar.image_url}`} className="car-img" alt="" />

          <div className="car-content">
            <span className="tag">{selectedCar.type}</span>
            <h2 className="car-title">{selectedCar.name}</h2>
            <p className="subtitle">{selectedCar.series}</p>

            <div className="car-stats">
              <span>⚡ {selectedCar.hp}</span>
              <span>⏱️ {selectedCar.speed}</span>
            </div>

            <p className="price-label">Price per day</p>
            <div className="price">${selectedCar.price_per_day}</div>

            <div className="days-box">
              <span>
                {Math.max(1, (datesData.returnDate - datesData.pickupDate) / (24 * 60 * 60 * 1000))} days
              </span>
              <strong>
                ${Math.max(1, (datesData.returnDate - datesData.pickupDate) / (24 * 60 * 60 * 1000)) * selectedCar.price_per_day}
              </strong>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div className="confirm-panel">
          <h2>Confirm Your Reservation</h2>
          <p className="form-sub">Review your booking details before confirming.</p>

          <div className="summary-box">


<div className="summary-row">
  <div className="summary-col">
    <label>Pickup</label>
    <div className="summary-value">
      {datesData.pickupDate ? datesData.pickupDate.toLocaleDateString("en-GB") : 'N/A'} at {datesData.pickupTime}
    </div>
  </div>

  <div className="summary-col">
    <label>Return</label>
    <div className="summary-value">
      {datesData.returnDate ? datesData.returnDate.toLocaleDateString("en-GB") : 'N/A'} at {datesData.returnTime}
    </div>
  </div>
</div>


            <hr />

            <div className="summary-row">
              <div className="summary-col-full">
                <label>Customer</label>
                <div className="summary-value">
                  {userDetails.fullName}<br />
                  {userDetails.email} • {userDetails.phone}
                </div>
              </div>
            </div>

            <hr />

            <div className="summary-row">
              <div className="summary-col-full">
                <label>Total</label>
                <div className="summary-total">
                  ${Math.max(1, (datesData.returnDate - datesData.pickupDate) / (24 * 60 * 60 * 1000)) * selectedCar.price_per_day}
                </div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="confirm-buttons">
            <Link to="/details" className="back-btn">Back</Link>

            <button
              className="confirm-btn"
              onClick={handleConfirm}
             
            >
              ✓ Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
