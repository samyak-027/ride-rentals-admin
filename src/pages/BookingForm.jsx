// src/pages/BookingForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Loader from "../components/Loader";

function BookingForm() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [bookingData, setBookingData] = useState({
    carName: "",
    userName: "",
    startDate: "",
    endDate: "",
    from: "",
    to: "",
  });
  const [loading, setLoading] = useState(!!bookingId);
  const [error, setError] = useState("");

  useEffect(() => {
    if (bookingId) {
      fetch(`http://localhost:5007/api/bookings/${bookingId}`)
        .then((res) => res.json())
        .then((data) => {
          setBookingData({
            carName: data.car?.name || "",
            userName: data.user?.name || "",
            startDate: data.startDate,
            endDate: data.endDate,
            from: data.from,
            to: data.to,
          });
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setError("Failed to load booking data");
          setLoading(false);
        });
    }
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const endpoint = bookingId
      ? `http://localhost:5007/api/bookings/update/${bookingId}`
      : "http://localhost:5007/api/bookings/new-booking";
    const method = bookingId ? "PUT" : "POST";

    try {
      const res = await fetch(endpoint, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to save booking");
      }
      navigate("/bookings");
    } catch (err) {
      console.error(err);
      setError(err.message);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <>
        <AdminNavbar />
        <div className="p-4">
          <Loader />
        </div>
      </>
    );
  }

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-bold mb-4">
          {bookingId ? "Update Booking" : "New Booking"}
        </h1>
        {error && <div className="alert alert-error mb-4">{error}</div>}
        <form onSubmit={handleSubmit} className="max-w-lg mx-auto space-y-4">
          <div>
            <label className="block mb-1">Car Name</label>
            <input
              type="text"
              name="carName"
              value={bookingData.carName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">User Name</label>
            <input
              type="text"
              name="userName"
              value={bookingData.userName}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Journey Start Date</label>
            <input
              type="date"
              name="startDate"
              value={bookingData.startDate ? bookingData.startDate.substring(0, 10) : ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Journey End Date</label>
            <input
              type="date"
              name="endDate"
              value={bookingData.endDate ? bookingData.endDate.substring(0, 10) : ""}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">From</label>
            <input
              type="text"
              name="from"
              value={bookingData.from}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">To</label>
            <input
              type="text"
              name="to"
              value={bookingData.to}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? "Saving..." : bookingId ? "Update Booking" : "Create Booking"}
          </button>
        </form>
      </div>
    </>
  );
}

export default BookingForm;