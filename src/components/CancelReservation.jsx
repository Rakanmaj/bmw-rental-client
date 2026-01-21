import { useState } from "react";

import "../styles/reservations.css";
import api from "../api";
function CancelReservation({ reservation, onCancel }) {
  const [open, setOpen] = useState(false);
  const cancelReservation = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("You must be logged in");
        return;
      }

      await api.delete(
        `/api/reservations/${reservation.reservation_id}`,
        {
          headers: {
            "x-user-id": user.user_id,
            "x-user-role": user.role,
          },
        }
      );

      // Update UI instantly (no refresh needed)
      onCancel(reservation.reservation_id);
      setOpen(false);
    } catch (err) {
      console.error("Cancel error:", err);
      alert("Failed to cancel reservation");
    }
  };

  return (
    <>
      <button className="cancel-btn" onClick={() => setOpen(true)}>
        Cancel
      </button>

      {open && (
        <div className="modal-overlay">
          <div className="modal">
            <h3>Cancel Reservation</h3>
            <p>
              Cancel reservation for <strong>{reservation.car_name}</strong>?
            </p>

            <div className="modal-actions">
              <button onClick={() => setOpen(false)}>Keep</button>
              <button className="danger" onClick={cancelReservation}>
                Confirm Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CancelReservation;
