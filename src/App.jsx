import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Hero from "./components/Hero";
import WeatherSuggestions from "./components/WeatherSuggestions";
import Features from "./components/Features";
import Footer from "./components/Footer";
import Reservation from "./components/Reservation";
import Details from "./components/Details";
import Confirm from "./components/Confirm";
import CarsPage from "./components/CarsPage";
import About from "./components/About";
import Reservations from "./components/Reservations";
import Auth from "./components/Auth";
import Admin from "./components/Admin";
import axios from "axios";
import RequireAuth from "./components/RequireAuth";
import UpdateReservation from "./components/UpdateReservation";
import api from "./api";
function App() {
  const [selectedCar, setSelectedCar] = useState(null);

  const [datesData, setDatesData] = useState({
    pickupDate: null,
    pickupTime: "",
    returnDate: null,
    returnTime: "",
  });

  const [userDetails, setUserDetails] = useState({
    fullName: "",
    email: "",
    phone: "",
    role: "",
  });

  const [reservations, setReservations] = useState([]);
  const [cars, setCars] = useState([]);
  const [adminReservations, setAdminReservations] = useState([]);
  const [editReservation, setEditReservation] = useState(null);

  // ✅ Fetch cars once (single source of truth)
  useEffect(() => {
    const storedCars = localStorage.getItem("carsData");

    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      fetchCars();
    }
  }, []);

  const fetchCars = async () => {
  try {
    const res = await api.get("/api/cars");

    setCars(res.data);
    localStorage.setItem("carsData", JSON.stringify(res.data));

  } catch (error) {
    console.error("Error fetching cars data:", error);
  }
};


  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const fetchUserReservations = () => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;
    if (!user) return;

    api
      .get(`/api/reservations/user/${user.user_id}`, {
        headers: {
          "x-user-id": user.user_id,
          "x-user-role": user.role,
        },
      })
      .then((response) => {
        setReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching reservations:", error);
      });
  };

  const fetchAdminReservations = () => {
    const user = JSON.parse(localStorage.getItem("user"));

    api
      .get("/api/reservations", {
        headers: {
          "x-user-id": user.user_id,
          "x-user-role": user.role,
        },
      })
      .then((response) => {
        setAdminReservations(response.data);
      })
      .catch((error) => {
        console.error("Error fetching admin reservations:", error);
      });
  };

  const handleLogin = (userData) => {
    setUserDetails(userData);
    localStorage.setItem("user", JSON.stringify(userData));
    fetchUserReservations();
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    setUserDetails({
      fullName: "",
      email: "",
      phone: "",
      role: "",
    });
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setUserDetails(user);
      fetchUserReservations();
    }
  }, []);

  const handleCreateReservation = (reservation) => {
    setReservations((prev) => [
      ...prev,
      { ...reservation, status: "pending", admin_note: "" }, // ✅ fixed naming
    ]);
    fetchUserReservations();
  };

  const handleCancelReservation = (id) => {
    setReservations((prev) => prev.filter((r) => r.reservation_id !== id));
  };

  const handleUpdateReservationStatus = (id, status, note) => {
    setAdminReservations((prev) =>
      prev.map((r) =>
        r.reservation_id === id ? { ...r, status, admin_note: note } : r
      )
    );

    fetchUserReservations();
  };

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const user = storedUser ? JSON.parse(storedUser) : null;

    if (user && user.role === "admin") {
      fetchAdminReservations();
    }
  }, [userDetails.role]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/auth" element={<Auth onLogin={handleLogin} />} />

        <Route
          path="/"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              <Hero />
              <WeatherSuggestions onSelectCar={handleSelectCar} cars={cars} />
              <Features />
              <Footer />
            </>
          }
        />

        <Route
          path="/cars"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              <CarsPage cars={cars} onSelectCar={handleSelectCar} />
              <Footer />
            </>
          }
        />

        <Route
          path="/reserve/:carId"
          element={
            <RequireAuth>
              <Reservation
                selectedCar={selectedCar}
                datesData={datesData}
                onSaveDates={setDatesData}
                editReservation={editReservation}
              />
            </RequireAuth>
          }
        />

        <Route
          path="/details"
          element={
            <RequireAuth>
              <Details
                selectedCar={selectedCar}
                datesData={datesData}
                userData={userDetails}
                onSaveUserDetails={setUserDetails}
                editReservation={editReservation}
              />
            </RequireAuth>
          }
        />

        <Route
          path="/confirm"
          element={
            <RequireAuth>
              <Confirm
                selectedCar={selectedCar}
                datesData={datesData}
                userDetails={userDetails}
                onCreateReservation={handleCreateReservation}
              />
            </RequireAuth>
          }
        />

        <Route
          path="/reservations"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              <Reservations
                reservations={reservations}
                onCancel={handleCancelReservation}
                onRefresh={fetchUserReservations}
              />
              <Footer />
            </>
          }
        />

        <Route
          path="/about"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              <About />
              <Footer />
            </>
          }
        />

        <Route
          path="/update-reservation"
          element={
            <RequireAuth>
              <UpdateReservation />
            </RequireAuth>
          }
        />

        <Route
          path="/admin"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              {userDetails.role === "admin" ? (
                <Admin
                  reservations={adminReservations}
                  onUpdateStatus={handleUpdateReservationStatus}
                />
              ) : (
                <p>You do not have permission to access the admin page.</p>
              )}
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;