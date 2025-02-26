// src/pages/Bookings.jsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Loader from "../components/Loader";
import BookingCard from "../components/BookingCard";

function Bookings() {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [bookingToDelete, setBookingToDelete] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://localhost:5007/api/bookings/allBookings")
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

  const handleDeleteBooking = (bookingId) => {
    fetch(`http://localhost:5007/api/bookings/${bookingId}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then(() => {
        setBookings((prev) => prev.filter((b) => b._id !== bookingId));
        setDeleteModalOpen(false);
      })
      .catch((err) => console.error(err));
  };

  const openDeleteModal = (booking) => {
    setBookingToDelete(booking);
    setDeleteModalOpen(true);
  };

  const closeDeleteModal = () => {
    setBookingToDelete(null);
    setDeleteModalOpen(false);
  };

  const handleUpdateBooking = (booking) => {
    // Navigate to the BookingForm route with the booking's id for update
    navigate(`/booking-form/${booking._id}`);
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <div className="mb-6">
          <h1 className="text-5xl font-extrabold">All Bookings</h1>
        </div>
        {loading ? (
          <Loader />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {bookings.length ? (
              bookings.map((booking) => (
                <BookingCard
                  key={booking._id}
                  booking={booking}
                  onUpdate={handleUpdateBooking}
                  onDelete={openDeleteModal}
                />
              ))
            ) : (
              <p>No bookings found.</p>
            )}
          </div>
        )}

        {/* Delete Confirmation Modal */}
        {deleteModalOpen && bookingToDelete && (
          <div className="modal modal-open">
            <div className="modal-box">
              <h3 className="font-bold text-lg">Cancel Booking?</h3>
              <p className="py-4">
                Do you want to cancel booking for {bookingToDelete.car?.name}?
              </p>
              <div className="modal-action">
                <button
                  onClick={() => handleDeleteBooking(bookingToDelete._id)}
                  className="btn btn-error"
                >
                  Delete
                </button>
                <button onClick={closeDeleteModal} className="btn">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
}

export default Bookings;