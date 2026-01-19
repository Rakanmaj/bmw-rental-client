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
import Admin from "./components/Admin";

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

  useEffect(() => {
    const storedCars = localStorage.getItem("carsData");

    if (storedCars) {
      setCars(JSON.parse(storedCars));
    } else {
      const mockCars = [
        {
          id: 1,
          car_id: 1,
          type: "Convertible",
          series: "Z SERIES",
          name: "BMW Z4",
          desc: "Open-top performance with sharp handling and premium comfort.",
          hp: "382 hp",
          speed: "0–100 in 4.5s",
          image_url: "Z4Img.png",
          price_per_day: 299,
        },
        {
          id: 2,
          car_id: 2,
          type: "SUV",
          series: "X SERIES",
          name: "BMW X5",
          desc: "Luxury SUV with confident power and all-weather capability.",
          hp: "335 hp",
          speed: "0–100 in 5.3s",
          image_url: "X5Img.png",
          price_per_day: 249,
        },
        {
          id: 3,
          car_id: 3,
          type: "Sedan",
          series: "M SERIES",
          name: "BMW M5",
          desc: "Executive sedan with supercar-level performance and comfort.",
          hp: "617 hp",
          speed: "0–100 in 3.3s",
          image_url: "M5.png",
          price_per_day: 349,
        },
        {
          id: 4,
          car_id: 4,
          type: "Coupe",
          series: "M SERIES",
          name: "BMW M4",
          desc: "Track-ready coupe with aggressive styling and precise control.",
          hp: "503 hp",
          speed: "0–100 in 3.9s",
          image_url: "M4_Convertible.png",
          price_per_day: 329,
        },
      ];

      setCars(mockCars);
      localStorage.setItem("carsData", JSON.stringify(mockCars));
    }
  }, []);

  const handleSelectCar = (car) => {
    setSelectedCar(car);
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
    }
  }, []);

  const handleCreateReservation = (reservation) => {
    setReservations((prev) => [
      ...prev,
      { ...reservation, status: "pending", adminNote: "" },
    ]);
  };

  const refreshReservations = () => {
    const stored = localStorage.getItem("reservations");
    const list = stored ? JSON.parse(stored) : [];
    setReservations(list);
  };

  useEffect(() => {
    refreshReservations();
  }, []);

  useEffect(() => {
    setAdminReservations(reservations);
  }, [reservations]);

  const handleUpdateReservationStatus = (id, status, note) => {
    setAdminReservations((prev) =>
      prev.map((r) =>
        r.reservation_id === id
          ? { ...r, status, admin_note: note }
          : r
      )
    );
  };

  return (
    <BrowserRouter>
      <Routes>
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
            <Reservation
              selectedCar={selectedCar}
              datesData={datesData}
              onSaveDates={setDatesData}
            />
          }
        />

        <Route
          path="/details"
          element={
            <Details
              selectedCar={selectedCar}
              datesData={datesData}
              userData={userDetails}
              onSaveUserDetails={setUserDetails}
            />
          }
        />

        <Route
          path="/confirm"
          element={
            <Confirm
              selectedCar={selectedCar}
              datesData={datesData}
              userDetails={userDetails}
              onCreateReservation={handleCreateReservation}
            />
          }
        />

        <Route
          path="/reservations"
          element={
            <>
              <Navbar user={userDetails} onLogout={handleLogout} />
              <Reservations
                reservations={reservations}
                onRefresh={refreshReservations}
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
              <Footer />
            </>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
