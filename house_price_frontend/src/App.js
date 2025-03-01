import 'bootstrap/dist/css/bootstrap.min.css';
import React, { useState } from 'react';
import './App.css';
import houseImage from './img/house.jpg'; // Import the image

function App() {
  const [formData, setFormData] = useState({
    MedInc: '',
    HouseAge: '',
    AveRooms: '',
    AveBedrms: '',
    Population: '',
    AveOccup: '',
    Latitude: '',
    Longitude: '',
  });

  const [errors, setErrors] = useState({});
  const [predictedPrice, setPredictedPrice] = useState(null);
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: '' });
  };

  const validateForm = () => {
    const newErrors = {};
    for (const key in formData) {
      if (formData[key] === '') {
        newErrors[key] = 'This field is required';
      }
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) return;

    try {
      const response = await fetch('http://127.0.0.1:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        setPredictedPrice(data.predicted_price);
        setErrorMessage('');
      } else {
        setErrorMessage('Failed to get prediction. Try again.');
      }
    } catch (error) {
      setErrorMessage('Error: ' + error.message);
    }
  };

  return (
    <div>
      {/* Navigation Bar */}
      <nav className="navbar navbar-expand-lg navbar-dark bg-primary">
        <div className="container-fluid">
          <a className="navbar-brand">
            Tabular California House Price Prediction System
          </a>
        </div>
      </nav>

      <div className="container mt-5">
        <div className="row">
          {/* Form Section */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body">
                <h2 className="card-title text-center text-primary">Enter Details</h2>
                {errorMessage && (
                  <div className="alert alert-danger" role="alert">
                    {errorMessage}
                  </div>
                )}
                <form onSubmit={handleSubmit}>
                  <div className="row">
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Median Income</label>
                        <input
                          type="number"
                          className={`form-control ${errors.MedInc ? 'is-invalid' : ''}`}
                          name="MedInc"
                          value={formData.MedInc}
                          onChange={handleChange}
                          required
                        />
                        {errors.MedInc && (
                          <div className="invalid-feedback">{errors.MedInc}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">House Age</label>
                        <input
                          type="number"
                          className={`form-control ${errors.HouseAge ? 'is-invalid' : ''}`}
                          name="HouseAge"
                          value={formData.HouseAge}
                          onChange={handleChange}
                          required
                        />
                        {errors.HouseAge && (
                          <div className="invalid-feedback">{errors.HouseAge}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Average Rooms</label>
                        <input
                          type="number"
                          className={`form-control ${errors.AveRooms ? 'is-invalid' : ''}`}
                          name="AveRooms"
                          value={formData.AveRooms}
                          onChange={handleChange}
                          required
                        />
                        {errors.AveRooms && (
                          <div className="invalid-feedback">{errors.AveRooms}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Average Bedrooms</label>
                        <input
                          type="number"
                          className={`form-control ${errors.AveBedrms ? 'is-invalid' : ''}`}
                          name="AveBedrms"
                          value={formData.AveBedrms}
                          onChange={handleChange}
                          required
                        />
                        {errors.AveBedrms && (
                          <div className="invalid-feedback">{errors.AveBedrms}</div>
                        )}
                      </div>
                    </div>
                    <div className="col-md-6">
                      <div className="mb-3">
                        <label className="form-label">Population</label>
                        <input
                          type="number"
                          className={`form-control ${errors.Population ? 'is-invalid' : ''}`}
                          name="Population"
                          value={formData.Population}
                          onChange={handleChange}
                          required
                        />
                        {errors.Population && (
                          <div className="invalid-feedback">{errors.Population}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Average Occupation</label>
                        <input
                          type="number"
                          className={`form-control ${errors.AveOccup ? 'is-invalid' : ''}`}
                          name="AveOccup"
                          value={formData.AveOccup}
                          onChange={handleChange}
                          required
                        />
                        {errors.AveOccup && (
                          <div className="invalid-feedback">{errors.AveOccup}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Latitude</label>
                        <input
                          type="number"
                          className={`form-control ${errors.Latitude ? 'is-invalid' : ''}`}
                          name="Latitude"
                          value={formData.Latitude}
                          onChange={handleChange}
                          required
                        />
                        {errors.Latitude && (
                          <div className="invalid-feedback">{errors.Latitude}</div>
                        )}
                      </div>
                      <div className="mb-3">
                        <label className="form-label">Longitude</label>
                        <input
                          type="number"
                          className={`form-control ${errors.Longitude ? 'is-invalid' : ''}`}
                          name="Longitude"
                          value={formData.Longitude}
                          onChange={handleChange}
                          required
                        />
                        {errors.Longitude && (
                          <div className="invalid-feedback">{errors.Longitude}</div>
                        )}
                      </div>
                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary w-100">
                    Predict Price
                  </button>
                </form>
              </div>
            </div>
          </div>

          {/* Prediction Display Section */}
          <div className="col-md-6">
            <div className="card">
              <div className="card-body text-center">
                <h2 className="text-primary">Predicted Price</h2>
                {predictedPrice !== null ? (
                  <>
                    <h3 className="text-success">$ {predictedPrice*100000}</h3>
                    
                  </>
                ) : (
                  <h4 className="text-muted">Enter details to see prediction</h4>
                )}
                <img 
                      src={houseImage} 
                      alt="House"
                      className="img-fluid mt-3 rounded"
                      style={{ maxHeight: '400px', objectFit: 'cover' }}
                    />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
