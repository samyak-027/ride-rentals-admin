// src/components/BookingCard.jsx
import React from "react";
import UpdateBookingIcon from "../assets/edit.svg";
import CancelBookingIcon from "../assets/cancel-booking.svg";

function BookingCard({ booking, onUpdate, onDelete }) {
  return (
    <div className="card bg-base-100 shadow-xl p-4">
      <div className="card-body">
        <p className="font-semibold">
          User: {booking.user?.name} ({booking.user?.email})
        </p>
        <p>
          Car: {booking.car?.name} {booking.car?.model}
        </p>
        <p>
          Journey Start: {new Date(booking.startDate).toLocaleDateString()}
        </p>
        <p>
          Journey End: {new Date(booking.endDate).toLocaleDateString()}
        </p>
        <p>Total Cost: ${booking.totalCost}</p>
        <p>
          Booking Date: {new Date(booking.createdAt).toLocaleDateString()}
        </p>
        <div className="flex justify-end gap-2 mt-4">
          <button
            onClick={() => onUpdate(booking)}
            className="btn btn-success btn-sm"
          >
            <img
              src={UpdateBookingIcon}
              alt="Update Booking"
              className="w-6 h-6"
            />
          </button>
          <button
            onClick={() => onDelete(booking)}
            className="btn btn-error btn-sm"
          >
            <img
              src={CancelBookingIcon}
              alt="Delete Booking"
              className="w-6 h-6"
            />
          </button>
        </div>
      </div>
    </div>
  );
}

export default BookingCard;
