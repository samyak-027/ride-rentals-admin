import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import EditCarIcon from '../assets/update-car.svg';

function CarCard({ car, onDelete }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleEdit = () => {
    navigate(`/car-form/${car._id}`); // Navigate to edit route with car ID
  };

  const handleDelete = () => {
    onDelete(car._id);
    setShowModal(false);
  };

  return (
    <>
      <div className="card glass w-96 m-4">
        <figure>
          <img src={car.image} alt={car.name} className="object-cover h-48 w-full" />
        </figure>
        <div className="card-body">
          <h2 className="card-title">{car.name}</h2>
          <p>Model: {car.model}</p>
          <p>Capacity: {car.capacity}</p>
          <p>Fuel: {car.fueltype}</p>
          <p>Price Per Day: ${car.pricePerDay}</p>
          <div className="card-actions justify-end">
            {/* Edit Button */}
            <button 
              onClick={handleEdit} 
              className="btn btn-success btn-sm"
            >
              <img src={EditCarIcon} alt="Edit Car" className="w-6 h-6" />
            </button>
            
            {/* Delete Button */}
            <button 
              onClick={() => setShowModal(true)} 
              className="btn btn-error btn-sm"
            >
              <img src="/delete-car.svg" alt="Delete Car" className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>

      {showModal && (
        <div className="modal modal-open">
          <div className="modal-box">
            <h3 className="font-bold text-lg">Confirm Delete</h3>
            <p className="py-4">Are you sure you want to delete {car.name}?</p>
            <div className="modal-action">
              <button onClick={handleDelete} className="btn btn-error">Delete</button>
              <button onClick={() => setShowModal(false)} className="btn">Cancel</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}

export default CarCard;
