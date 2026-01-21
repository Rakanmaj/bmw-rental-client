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

  // ----------------------------
  // Cars (single source of truth)
  // ----------------------------
  const fetchCars = async () => {
    try {
      const carsResponse = await api.get("/api/cars");
      const carsData = carsResponse.data;

      setCars(carsData);
      localStorage.setItem("carsData", JSON.stringify(carsData));
    } catch (fetchCarsError) {
      console.error("Error fetching cars data:", fetchCarsError);
    }
  };

  useEffect(() => {
    const storedCarsData = localStorage.getItem("carsData");

    if (storedCarsData) {
      setCars(JSON.parse(storedCarsData));
      return;
    }

    fetchCars();
  }, []);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  // ----------------------------
  // Reservations (User)
  // ----------------------------
  const fetchUserReservations = async () => {
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    if (!currentUser) return;

    try {
      const reservationsResponse = await api.get(
        `/api/reservations/user/${currentUser.user_id}`,
        {
          headers: {
            "x-user-id": currentUser.user_id,
            "x-user-role": currentUser.role,
          },
        }
      );

      setReservations(reservationsResponse.data);
    } catch (fetchReservationsError) {
      console.error("Error fetching reservations:", fetchReservationsError);
    }
  };

  // ----------------------------
  // Reservations (Admin)
  // ----------------------------
  const fetchAdminReservations = async () => {
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;
    if (!currentUser) return;

    try {
      const adminReservationsResponse = await api.get("/api/reservations", {
        headers: {
          "x-user-id": currentUser.user_id,
          "x-user-role": currentUser.role,
        },
      });

      setAdminReservations(adminReservationsResponse.data);
    } catch (fetchAdminReservationsError) {
      console.error(
        "Error fetching admin reservations:",
        fetchAdminReservationsError
      );
    }
  };

  // ----------------------------
  // Auth handlers
  // ----------------------------
  const handleLogin = (authenticatedUser) => {
    setUserDetails(authenticatedUser);
    localStorage.setItem("user", JSON.stringify(authenticatedUser));
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

  // Load user from localStorage once
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (!storedUser) return;

    const currentUser = JSON.parse(storedUser);
    setUserDetails(currentUser);
    fetchUserReservations();
  }, []);

  // ----------------------------
  // Reservation actions
  // ----------------------------
  const handleCreateReservation = (newReservation) => {
    setReservations((previousReservations) => [
      ...previousReservations,
      { ...newReservation, status: "pending", admin_note: "" }, // ✅ fixed naming
    ]);

    fetchUserReservations();
  };

  const handleCancelReservation = (reservationId) => {
    setReservations((previousReservations) =>
      previousReservations.filter(
        (reservation) => reservation.reservation_id !== reservationId
      )
    );
  };

  const handleUpdateReservationStatus = (reservationId, status, note) => {
    setAdminReservations((previousAdminReservations) =>
      previousAdminReservations.map((reservation) =>
        reservation.reservation_id === reservationId
          ? { ...reservation, status, admin_note: note }
          : reservation
      )
    );

    fetchUserReservations();
  };

  // If user is admin, fetch admin reservations
  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const currentUser = storedUser ? JSON.parse(storedUser) : null;

    if (currentUser && currentUser.role === "admin") {
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
