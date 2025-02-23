import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import for navigation
import AdminNavbar from '../components/AdminNavbar';
import CarCard from '../components/CarCard';
import Loader from '../components/Loader';
import Skeleton from '../components/Skeleton';
import AddCarIcon from '../assets/add-car.svg'; // Import SVG

function Dashboard() {
  const [cars, setCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [skeleton, setSkeleton] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Simulate skeleton state for 2 seconds
    const skeletonTimer = setTimeout(() => {
      setSkeleton(false);
    }, 2000);

    // Fetch all cars from backend API
    fetch('http://localhost:5007/api/cars/getCars')
      .then((res) => res.json())
      .then((data) => {
        // Simulate additional loader for 1 second
        setTimeout(() => {
          setCars(data);
          setLoading(false);
        }, 1000);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });

    return () => clearTimeout(skeletonTimer);
  }, []);

  const handleDeleteCar = (carId) => {
    // Call backend API to delete car and then update state
    fetch(`http://localhost:5007/api/cars/${carId}`, { method: 'DELETE' })
      .then((res) => res.json())
      .then(() => {
        setCars((prev) => prev.filter((car) => car._id !== carId));
      })
      .catch((err) => console.error(err));
  };

  return (
    <>
      <AdminNavbar />
      <div className="p-4">
        <div className="flex justify-between items-center mb-4">
          <h1 className="text-2xl font-bold">All Cars</h1>
          <button
            onClick={() => navigate('/car-form')}
            className="flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-600"
          >
            <img src={AddCarIcon} alt="Add Car" className="w-5 h-5" />
            Add Car
          </button>
        </div>

        {skeleton && <Skeleton />}
        {loading ? (
          <Loader />
        ) : (
          <div className="flex flex-wrap">
            {cars.map((car) => (
              <CarCard key={car._id} car={car} onDelete={handleDeleteCar} />
            ))}
          </div>
        )}
      </div>
    </>
  );
}

export default Dashboard;