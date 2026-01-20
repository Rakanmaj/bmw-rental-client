# BMW Rental Frontend (React)

This is the frontend for the **BMW Rental System**, a modern car rental web application built using **React + Vite**.

---

## Description

The BMW Rental application allows users to browse available BMW vehicles, make online reservations, and manage bookings easily through a clean and user-friendly interface.

The system supports **two types of users**:

---

### Customers
- Browse BMW cars
- View car details
- Select pickup and return dates and times
- Create rental reservations
- Update or cancel pending reservations
- View reservation history

---

### Administrators
- View all reservations
- Approve or reject booking requests
- Add administrative notes
- Monitor rental activity

---

The frontend communicates with a backend API built using **Express and PostgreSQL**, and all data is persisted in the database.

---

## User Requirements

### Authentication
- Users can sign up using email and password
- Users can log in to the system
- Roles include:
  - `user` (default)
  - `admin`
- Login sessions are stored using **localStorage**

---

### Customer Requirements
- View available BMW vehicles
- View detailed vehicle information
- Select rental dates and times
- Create reservations
- View personal bookings
- Update reservations while status is **pending**
- Cancel owned reservations

---

### Administrator Requirements
- Access the admin dashboard
- View all reservations
- Approve or deny booking requests
- Add admin notes to reservations

---

## Weather-Based Car Suggestions

The application integrates with the **OpenWeather API** to provide:

- Automatic weather detection using browser geolocation
- Smart BMW vehicle recommendations based on current weather
- Optional test city mode for development and testing

---

## Technologies Used

- **React 18**
- **Vite**
- **Axios**
- **React Router**
- **OpenWeather API**
- **LocalStorage**
- **CSS**

---

## Environment Variables

The frontend uses environment variables for configuration.

Create a `.env` file in the project root:

```env
VITE_SERVER_URL=http://localhost:3000
VITE_WEATHER_API_KEY=your_openweather_api_key
```
A `.env.sample` file is included for reference.

---

### Notes

- Environment variables must start with `VITE_`
- `.env` files are ignored by GitHub
- `.env.sample` documents required variables

## API Integration

All backend communication is handled through a **centralized Axios instance** located at:

**src/api.js**


---

### This provides:

- A single backend base URL  
- Clean and reusable API calls  
- No hardcoded `localhost` URLs  
- Easy deployment configuration  

---

### Example Usage

```js
api.get("/api/cars");
api.post("/api/reservations");
api.put("/api/reservations/1");
api.delete("/api/reservations/1");

```
## Clone the Repository

```bash
git clone https://github.com/your-username/bmw-rental-frontend.git
cd bmw-rental-client
```

---
## Getting Started

### Install dependencies

```bash
npm install
```
### Run the development server

```bash
npm run dev
```
### Open in browser

http://localhost:5173
```md
## Project Structure

BMW-RENTAL-CLIENT/
│
├── src/
│ ├── api.js
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── App.jsx
│ └── main.jsx
│
├── .env
├── .env.sample
├── index.html
├── vite.config.js
├── package.json
└── README.md

```
## Features Summary

- User authentication system  
- Role-based access control  
- BMW vehicle browsing  
- Online reservation management  
- Admin approval workflow  
- Weather-based car recommendations  
- Centralized API communication  
- Secure environment configuration  
- Responsive user interface  

