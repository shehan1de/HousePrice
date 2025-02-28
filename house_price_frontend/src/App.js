import React, { useState } from 'react';
import { Button, Col, Container, Form, Row } from 'react-bootstrap'; // Import Bootstrap components

function App() {
  const [inputValues, setInputValues] = useState({
    MedInc: '',
    HouseAge: '',
    AveRooms: '',
    AveBedrms: '',
    Population: '',
    AveOccup: '',
    Latitude: '',
    Longitude: ''
  });
  const [prediction, setPrediction] = useState(null);

  const handleChange = (e) => {
    setInputValues({
      ...inputValues,
      [e.target.name]: e.target.value
    });
  };

  const handlePredict = async () => {
    const inputArray = [
      parseFloat(inputValues.MedInc),
      parseFloat(inputValues.HouseAge),
      parseFloat(inputValues.AveRooms),
      parseFloat(inputValues.AveBedrms),
      parseFloat(inputValues.Population),
      parseFloat(inputValues.AveOccup),
      parseFloat(inputValues.Latitude),
      parseFloat(inputValues.Longitude)
    ];

    try {
      const response = await fetch('http://localhost:5000/predict', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ input: inputArray })
      });

      const data = await response.json();
      setPrediction(data.prediction);
    } catch (error) {
      console.error("Error fetching prediction:", error);
    }
  };

  return (
    <Container style={{ marginTop: '50px' }}>
      <h1 className="text-center mb-4">California House - Price Prediction</h1>

      <Form>
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="MedInc">
              <Form.Label>Median Income</Form.Label>
              <Form.Control
                type="number"
                name="MedInc"
                value={inputValues.MedInc}
                onChange={handleChange}
                placeholder="Enter Median Income"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="HouseAge">
              <Form.Label>House Age</Form.Label>
              <Form.Control
                type="number"
                name="HouseAge"
                value={inputValues.HouseAge}
                onChange={handleChange}
                placeholder="Enter House Age"
              />
            </Form.Group>
          </Col>
        </Row>

        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="AveRooms">
              <Form.Label>Average Rooms</Form.Label>
              <Form.Control
                type="number"
                name="AveRooms"
                value={inputValues.AveRooms}
                onChange={handleChange}
                placeholder="Enter Average Rooms"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="AveBedrms">
              <Form.Label>Average Bedrooms</Form.Label>
              <Form.Control
                type="number"
                name="AveBedrms"
                value={inputValues.AveBedrms}
                onChange={handleChange}
                placeholder="Enter Average Bedrooms"
              />
            </Form.Group>
          </Col>
        </Row>

       {/* <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="Population">
              <Form.Label>Population</Form.Label>
              <Form.Control
                type="number"
                name="Population"
                value={inputValues.Population}
                onChange={handleChange}
                placeholder="Enter Population"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="AveOccup">
              <Form.Label>Average Occupancy</Form.Label>
              <Form.Control
                type="number"
                name="AveOccup"
                value={inputValues.AveOccup}
                onChange={handleChange}
                placeholder="Enter Average Occupancy"
              />
            </Form.Group>
          </Col>
        </Row>
*/}
        <Row className="mb-3">
          <Col md={6}>
            <Form.Group controlId="Latitude">
              <Form.Label>Latitude</Form.Label>
              <Form.Control
                type="number"
                name="Latitude"
                value={inputValues.Latitude}
                onChange={handleChange}
                placeholder="Enter Latitude"
              />
            </Form.Group>
          </Col>
          <Col md={6}>
            <Form.Group controlId="Longitude">
              <Form.Label>Longitude</Form.Label>
              <Form.Control
                type="number"
                name="Longitude"
                value={inputValues.Longitude}
                onChange={handleChange}
                placeholder="Enter Longitude"
              />
            </Form.Group>
          </Col>
        </Row>

        <Button variant="primary" onClick={handlePredict} block>
          Get Prediction
        </Button>
      </Form>

      {prediction !== null && (
  <h2 style={{ marginTop: '20px' }}>Predicted Price: ${(prediction * 100000).toFixed(2)}</h2>
)}
    </Container>
  );
}

export default App;
