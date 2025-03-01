// src/pages/BookingForm.jsx
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import AdminNavbar from "../components/AdminNavbar";
import Loader from "../components/Loader";

function BookingForm() {
  const { bookingId } = useParams();
  const navigate = useNavigate();
  const [cars, setCars] = useState([]);
  const [users, setUsers] = useState([]);
  const [bookingData, setBookingData] = useState({
    car: "",
    user: "",
    startDate: "",
    endDate: "",
    from: "",
    to: "",
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // Fetch available cars and users, and booking details (if updating)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [carsResponse, usersResponse] = await Promise.all([
          fetch("http://localhost:5007/api/cars/for-booking"),
          fetch("http://localhost:5007/api/users/for-booking"),
        ]);

        if (!carsResponse.ok) throw new Error("Failed to fetch cars");
        if (!usersResponse.ok) throw new Error("Failed to fetch users");

        const carsData = await carsResponse.json();
        const usersData = await usersResponse.json();

        setCars(Array.isArray(carsData.cars) ? carsData.cars : carsData);
        setUsers(Array.isArray(usersData.users) ? usersData.users : usersData);

        if (bookingId) {
          const bookingRes = await fetch(`http://localhost:5007/api/bookings/${bookingId}`);
          if (!bookingRes.ok) throw new Error("Failed to fetch booking");
          const booking = await bookingRes.json();

          setBookingData({
            car: booking.car?._id || "",
            user: booking.user?._id || "",
            startDate: booking.startDate,
            endDate: booking.endDate,
            from: booking.from,
            to: booking.to,
          });
        }
        setLoading(false);
      } catch (err) {
        console.error(err);
        setError(err.message);
        setLoading(false);
      }
    };

    fetchData();
  }, [bookingId]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setBookingData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    const endpoint = bookingId
      ? `http://localhost:5007/api/bookings/update/${bookingId}`
      : "http://localhost:5007/api/bookings/new-booking";

    try {
      const res = await fetch(endpoint, {
        method: bookingId ? "PUT" : "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(bookingData),
      });
      if (!res.ok) {
        const errMsg = await res.text();
        throw new Error(errMsg);
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
            <label className="block mb-1">Select Car</label>
            <select
              name="car"
              value={bookingData.car}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Car</option>
              {cars.map((car) => (
                <option key={car._id} value={car._id}>
                  {car.name} ({car.model})
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1">Select User</label>
            <select
              name="user"
              value={bookingData.user}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select User</option>
              {users.map((user) => (
                <option key={user._id} value={user._id}>
                  {user.name} ({user.email})
                </option>
              ))}
            </select>
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
