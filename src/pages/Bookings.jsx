// src/pages/Bookings.jsx
import React, { useEffect, useState } from 'react';
import AdminNavbar from '../components/AdminNavbar';
import Loader from '../components/Loader';

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch('http://localhost:5007/api/bookings/allBookings')
      .then((res) => res.json())
      .then((data) => {
        setBookings(data);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">All Bookings</h1>
        {loading ? (
          <Loader />
        ) : (
          <div>
            {bookings.length ? (
              bookings.map((booking) => (
                <div key={booking._id} className="card p-4 m-2">
                  {/* Access nested properties */}
                  <p>User: {booking.user?.name} ({booking.user?.email})</p>
                  <p>Car: {booking.car?.name} {booking.car?.model}</p>
                  <p>Journey Start Date: {new Date(booking.startDate).toLocaleDateString()}</p>
                  <p>Journey End Date: {new Date(booking.endDate).toLocaleDateString()}</p>
                  <p>Total Cost: ${booking.totalCost}</p>
                  <p>Booking Date: {booking.createdAt}</p>
                </div>
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;