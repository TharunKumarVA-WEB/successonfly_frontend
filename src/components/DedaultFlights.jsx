


import React, { useState, useEffect } from "react";
import { Card, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import loadingGif from "../assets/Loading.gif";

function DefaultFlights() {
  const [availableFlights, setAvailableFlights] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // Initialize useNavigate hook

  useEffect(() => {
    fetchAllFlights();
  }, []);

  const fetchAllFlights = async () => {
    try {
      const response = await fetch("https://successonfly-backend-1.onrender.com/api/get-all-flights");

      if (response.ok) {
        const data = await response.json();
        setAvailableFlights(data.availableFlights);
      } else {
        console.error("Error fetching flights:", response.statusText);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleBookNow = (flight) => {

    window.scrollTo(0, 0);
    // Navigate to the booking page with selected flight details
    navigate("/booking", { state: { flight: flight } }); // Pass the flight data in state
  };

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center mt-3">
        <img src={loadingGif} alt="Loading" className="loading-gif" />
      </div>
    );
  }

  return (
    <div className="container mt-2">
      <h2 className="mb-4">Default Flights</h2>
      <div className="row row-cols-1 row-cols-md-2 g-4">
        {availableFlights.length > 0 ? (
          availableFlights.map((flight) => (
            <div key={flight._id} className="col">
              <Card>
                <Card.Body>
                  <Card.Title>{flight.airline}</Card.Title>
                  <Card.Text>
                    <strong>Flight Number:</strong> {flight.flight_number}
                    <br />
                    <strong>Departure:</strong> {flight.departure.location} - {flight.departure.date_time}
                    <br />
                    <strong>Arrival:</strong> {flight.arrival.location} - {flight.arrival.date_time}
                    <br />
                    <strong>Business Class Seats:</strong> {flight.class_availability.Business.remaining_seats}
                    <br />
                    <strong>Economy Class Seats:</strong> {flight.class_availability.Economy.remaining_seats}
                  </Card.Text>
                  <Button variant="primary" onClick={() => handleBookNow(flight)}>Book Now</Button>
                </Card.Body>
              </Card>
            </div>
          ))
        ) : (
          <div className="col">
            <div className="alert alert-warning" role="alert">
              No available flights
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default DefaultFlights;
