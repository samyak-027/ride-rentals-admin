// src/App.jsx
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import AdminLogin from './pages/AdminLogin';
import Dashboard from './pages/Dashboard';
import Bookings from './pages/Bookings';
import Users from './pages/Users';
import CarForm from './pages/CarForm';
import ProtectedRoute from './components/ProtectedRoute';
import NavigationHandler from './components/NavigationHandler';
import BookingForm from './pages/BookingForm';

function App() {
  return (
    <Router>
      <NavigationHandler />
      <Routes>
        <Route path="/login" element={<AdminLogin />} />
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />
        <Route
          path="/bookings"
          element={
            <ProtectedRoute>
              <Bookings />
            </ProtectedRoute>
          }
        />
        <Route
          path="/users"
          element={
            <ProtectedRoute>
              <Users />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car-form"
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/car-form/:carId"
          element={
            <ProtectedRoute>
              <CarForm />
            </ProtectedRoute>
          }
        />
        <Route
          path="/booking-form"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />  
        <Route
          path="/booking-form/:bookingId"
          element={
            <ProtectedRoute>
              <BookingForm />
            </ProtectedRoute>
          }
        />  
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </Router>
  );
}

export default App;

// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import AdminLogin from './pages/AdminLogin';
// import Dashboard from './pages/Dashboard';
// import Bookings from './pages/Bookings';
// import Users from './pages/Users';
// import CarForm from './pages/CarForm';
// import './App.css';

// function App() {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/login" element={<AdminLogin />} />
//         <Route path="/dashboard" element={<Dashboard />} />
//         <Route path="/bookings" element={<Bookings />} />
//         <Route path="/users" element={<Users />} />
//         <Route path="/car-form" element={<CarForm />} />
//         <Route path="/car-form/:carId" element={<CarForm />} />
//         <Route path="*" element={<Navigate to="/login" replace />} />
//       </Routes>
//     </Router>
//   );
// }

// export default App;