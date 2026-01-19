import { useState } from "react";
import { BrowserRouter, Routes, Route, useParams } from "react-router-dom";
import Navbar from "./components/navbar";
import Footer from "./components/Footer";
import Hero from "./components/Hero";
import WeatherSuggestions from "./components/WeatherSuggestions";
import Features from "./components/Features";
import Fleet from "./components/Fleet";
import Reservation from "./components/Reservation";
import Details from "./components/Details";
import Confirm from "./components/Confirm";

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

  const cars = [
    {
      id: 1,
      car_id: 1,
      type: "Convertible",
      series: "Z SERIES",
      name: "BMW Z4",
      desc: "Open-top performance with sharp handling and premium comfort.",
      hp: "382 hp",
      speed: "0–100 in 4.5s",
      image: "/assets/Z4Img.png",
      image_url: "Z4Img.png",
      price: 299,
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
      image: "/assets/X5Img.png",
      image_url: "X5Img.png",
      price: 249,
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
      image: "/assets/M5.png",
      image_url: "M5.png",
      price: 349,
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
      image: "/assets/M4_Convertible.png",
      image_url: "M4_Convertible.png",
      price: 329,
      price_per_day: 329,
    },
  ];

  const handleSelectCar = (car) => {
    setSelectedCar(car);
  };

  const handleCreateReservation = (reservation) => {
    setReservations((prev) => [...prev, reservation]);
  };

  function ReserveRoute() {
    const { carId } = useParams();
    const foundCar =
      selectedCar ||
      cars.find((c) => String(c.id) === String(carId)) ||
      cars.find((c) => String(c.car_id) === String(carId));

    return (
      <Reservation
        selectedCar={foundCar}
        datesData={datesData}
        onSaveDates={setDatesData}
      />
    );
  }

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <Navbar />
              <Hero />
              <Fleet onSelectCar={handleSelectCar} />
              <WeatherSuggestions onSelectCar={handleSelectCar} cars={cars} />
              <Features />
              <Footer />
            </>
          }
        />

        <Route path="/reserve/:carId" element={<ReserveRoute />} />

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
      </Routes>
    </BrowserRouter>
  );
}

export default App;
