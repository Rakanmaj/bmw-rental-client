import { Link, useNavigate } from "react-router-dom";
import { FaBolt, FaTachometerAlt, FaCheck } from "react-icons/fa";
import Navbar from "./navbar";
import axios from "axios";
import "../styles/confirm.css";
import api from "../api";

function Confirm({ selectedCar, datesData, userDetails, onCreateReservation }) {
  const navigate = useNavigate();

  const ONE_DAY_MS = 24 * 60 * 60 * 1000; // ✅ naming convention (constant)
  const diffDays = Math.max(
    1,
    Math.round(Math.abs(datesData.returnDate - datesData.pickupDate) / ONE_DAY_MS)
  );

  const handleConfirm = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (!user) {
      alert("User is not logged in!");
      return;
    }

    // ✅ removed wrong console.log (userDetails.diffDays doesn't exist)
    // console.log(userDetails.diffDays);

    const reservation = {
      user_id: user.user_id,
      car_id: selectedCar.car_id,
      pickup_date: datesData.pickupDate,
      pickup_time: datesData.pickupTime,
      return_date: datesData.returnDate,
      return_time: datesData.returnTime,
      total_price: diffDays * selectedCar.price_per_day,
      status: "pending",
      admin_note: "",
    };

    api
      .post("/api/reservations", reservation, {
        headers: {
          "x-user-id": user.user_id,
          "x-user-role": user.role,
        },
      })
      .then((response) => {
        alert("Reservation confirmed!");
        onCreateReservation(response.data);
        navigate("/reservations");
      })
      .catch((error) => {
        console.error("Error confirming reservation:", error);
        alert("There was an error confirming the reservation. Please try again.");
      });
  };

  const totalDays = diffDays; // ✅ reuse diffDays instead of recalculating
  const totalPrice = totalDays * selectedCar.price_per_day;

  return (
    <div className="confirm-page">
      <Navbar />

      {/* STEPPER */}
      <div className="global-stepper">
        <div className="step-item completed">
          <div className="circle check">
            <FaCheck className="iconnn" />
          </div>
          <span>Dates</span>
        </div>
        <div className="step-line"></div>

        <div className="step-item completed">
          <div className="circle check">
            <FaCheck className="iconnn" />
          </div>
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
              <span>
                <FaBolt className="icon" /> {selectedCar.hp}
              </span>
              <span>
                <FaTachometerAlt className="icon" /> {selectedCar.speed}
              </span>
            </div>

            <p className="price-label">Price per day</p>
            <div className="price">${selectedCar.price_per_day}</div>

            <div className="days-box">
              <span>{totalDays} days</span>
              <strong>${totalPrice}</strong>
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
                  {datesData.pickupDate
                    ? datesData.pickupDate.toLocaleDateString("en-GB")
                    : "N/A"}{" "}
                  at {datesData.pickupTime}
                </div>
              </div>

              <div className="summary-col">
                <label>Return</label>
                <div className="summary-value">
                  {datesData.returnDate
                    ? datesData.returnDate.toLocaleDateString("en-GB")
                    : "N/A"}{" "}
                  at {datesData.returnTime}
                </div>
              </div>
            </div>

            <hr />

            <div className="summary-row">
              <div className="summary-col-full">
                <label>Customer</label>
                <div className="summary-value">
                  {userDetails.fullName}
                  <br />
                  {userDetails.email} • {userDetails.phone}
                </div>
              </div>
            </div>

            <hr />

            <div className="summary-row">
              <div className="summary-col-full">
                <label>Total</label>
                <div className="summary-total">${totalPrice}</div>
              </div>
            </div>
          </div>

          {/* BUTTONS */}
          <div className="confirm-buttons">
            <Link to="/details" className="back-btn">
              Back
            </Link>

            <button className="confirm-btn" onClick={handleConfirm}>
              <FaCheck className="iconright" /> Confirm Reservation
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Confirm;
