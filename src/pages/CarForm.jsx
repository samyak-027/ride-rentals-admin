import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import AdminNavbar from '../components/AdminNavbar';
import Loader from '../components/Loader';

function CarForm() {
  const { carId } = useParams(); // Get carId from URL
  const [isLoadingCar, setIsLoadingCar] = useState(!!carId); // Set loading state if in edit mode
  const [carData, setCarData] = useState({
    name: '',
    model: '',
    capacity: '',
    fueltype: '',
    pricePerDay: '',
    image: '', // Store file object
  });
  const [imagePreview, setImagePreview] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Fetch car data when in edit mode
  useEffect(() => {
    if (carId) {
      setIsLoadingCar(true);
      fetch(`http://localhost:5007/api/cars/${carId}`)
        .then((res) => res.json())
        .then((data) => {
          setCarData({
            name: data.name,
            model: data.model,
            capacity: data.capacity,
            fueltype: data.fueltype,
            pricePerDay: data.pricePerDay,
            image: '', // Reset image file input
          });
          setImagePreview(data.image); // Set image preview URL
          setIsLoadingCar(false);
        })
        .catch((err) => {
          console.error(err);
          setError('Failed to load car data');
          setIsLoadingCar(false);
        });
    }
  }, [carId]);

  // Handle changes for text inputs and file input
  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === 'image' && files && files.length > 0) {
      setCarData((prev) => ({ ...prev, image: files[0] }));
      setImagePreview(URL.createObjectURL(files[0])); // Show preview
    } else {
      setCarData((prev) => ({ ...prev, [name]: value }));
    }
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    // Validate required text fields
    if (
      !carData.name ||
      !carData.model ||
      !carData.capacity ||
      !carData.fueltype ||
      !carData.pricePerDay
    ) {
      setError('All fields are required.');
      setLoading(false);
      return;
    }

    // When adding a new car, image is required
    if (!carId && !carData.image) {
      setError('Image is required.');
      setLoading(false);
      return;
    }

    // Build the FormData explicitly
    const formData = new FormData();
    formData.append('name', carData.name);
    formData.append('model', carData.model);
    formData.append('capacity', carData.capacity);
    formData.append('fueltype', carData.fueltype);
    formData.append('pricePerDay', carData.pricePerDay);
    if (carData.image) {
      formData.append('image', carData.image);
    }

    // Define static endpoints for add and update
    const ADD_ENDPOINT = 'http://localhost:5007/api/cars/add-car';
    const UPDATE_ENDPOINT = `http://localhost:5007/api/cars/${carId}`;
    const endpoint = carId ? UPDATE_ENDPOINT : ADD_ENDPOINT;
    const method = carId ? 'PUT' : 'POST';

    try {
      const response = await fetch(endpoint, {
        method,
        body: formData,
      });
      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Failed to save car');
      }

      alert(carId ? 'Car updated successfully!' : 'Car added successfully!');
      if (!carId) {
        // Reset form for adding new car
        setCarData({
          name: '',
          model: '',
          capacity: '',
          fueltype: '',
          pricePerDay: '',
          image: '',
        });
        setImagePreview('');
      }
    } catch (err) {
      console.error(err);
      setError(err.message);
    } finally {
      setLoading(false);
    }
    navigate('/dashboard');
  };

  if (isLoadingCar) {
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
          {carId ? 'Update Car' : 'Add Car'}
        </h1>
        {error && <div className="text-red-500 mb-4">{error}</div>}
        <form
          onSubmit={handleSubmit}
          className="max-w-lg mx-auto space-y-4"
          encType="multipart/form-data"
        >
          <div>
            <label className="block mb-1">Name</label>
            <input
              type="text"
              name="name"
              value={carData.name}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Model</label>
            <input
              type="text"
              name="model"
              value={carData.model}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Capacity</label>
            <input
              type="number"
              name="capacity"
              value={carData.capacity}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Fuel Type</label>
            <select
              name="fueltype"
              value={carData.fueltype}
              onChange={handleChange}
              className="select select-bordered w-full"
              required
            >
              <option value="">Select Fuel Type</option>
              <option value="Petrol">Petrol</option>
              <option value="Diesel">Diesel</option>
              <option value="Electric">Electric</option>
              <option value="Hybrid">Hybrid</option>
            </select>
          </div>
          <div>
            <label className="block mb-1">Price Per Day</label>
            <input
              type="number"
              name="pricePerDay"
              value={carData.pricePerDay}
              onChange={handleChange}
              className="input input-bordered w-full"
              required
            />
          </div>
          <div>
            <label className="block mb-1">Image Upload</label>
            <input
              type="file"
              name="image"
              onChange={handleChange}
              className="file-input file-input-bordered w-full"
              accept="image/*"
              required={!carId}
            />
            {imagePreview && (
              <img
                src={imagePreview}
                alt="Preview"
                className="mt-2 w-32 h-32 object-cover rounded-lg"
              />
            )}
          </div>
          <button type="submit" className="btn btn-primary w-full" disabled={loading}>
            {loading ? <Loader /> : carId ? 'Update Car' : 'Add Car'}
          </button>
        </form>
      </div>
    </>
  );
}

export default CarForm;