import { useState } from "react";
import axios from "axios";
import "../styles/admin.css";
import AlertDismissible from "./AlertDismissible";

function Admin({ reservations, onUpdateStatus }) {
  const [notes, setNotes] = useState({});
   const user = JSON.parse(localStorage.getItem("user"));
  const updateStatus = async (id, status, note) => {
    try {
      await axios.put(
  `http://localhost:3000/api/reservations/${id}`,
  
  {
    status,
    admin_note: note,
  },
  {
    headers: {
      "x-user-id": user.user_id,
      "x-user-role": user.role,
    },
  }
);

      // update UI immediately
      onUpdateStatus(id, status, note);
    } catch (err) {
      console.error("Update failed", err);
      alert("Failed to update reservation");
    }
  };


  return (
    <div className="admin-page">
      <AlertDismissible />

      <h1>Admin Dashboard</h1>
      <p className="admin-sub">Manage all reservations</p>

      <div className="admin-list">
        {reservations.map((r) => (
          <div key={r.reservation_id} className="admin-card">
            <div className="admin-info">
              <h3>{r.car_name}</h3>

              <p><strong>Customer:</strong> {r.full_name}</p>
              <p><strong>Email:</strong> {r.email}</p>
              <p><strong>Phone:</strong> {r.phone}</p>

              <p>
                <strong>Pickup:</strong>{" "}
                {new Date(r.pickup_date).toDateString()} — {r.pickup_time}
              </p>

              <p>
                <strong>Return:</strong>{" "}
                {new Date(r.return_date).toDateString()} — {r.return_time}
              </p>

              <p className={`status ${r.status}`}>
                Status: {r.status.toUpperCase()}
              </p>

              {r.status === "denied" && (
                <p className="denied-reason">
                  <strong>Reason:</strong> {r.admin_note}
                </p>
              )}
            </div>

            {r.status === "pending" && (
              <div className="admin-actions">
                <button
                  className="accept"
                  onClick={() =>
                    updateStatus(r.reservation_id, "accepted", "")
                  }
                >
                  Accept
                </button>

                <textarea
                  placeholder="Reason for denial"
                  value={notes[r.reservation_id] || ""}
                  onChange={(e) =>
                    setNotes((prev) => ({
                      ...prev,
                      [r.reservation_id]: e.target.value,
                    }))
                  }
                />

                <button
                  className="deny"
                  onClick={() =>
                    updateStatus(
                      r.reservation_id,
                      "denied",
                      notes[r.reservation_id] || ""
                      
                    )

                  }
                >
                  Deny
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Admin;
