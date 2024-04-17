


// AvailableFlights.js

import React, { useState } from 'react';
import { Button, Card, Table } from 'react-bootstrap';
import loadingGif from '../assets/Loading.gif';

function AvailableFlights({ availableFlights, startDate, endDate, userEmail }) {
  const [bookingMessage, setBookingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB');
  };

  const handleBookFlight = async (flight, className) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('http://localhost:3000/api/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flight, classSelection: className, userEmail }),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingMessage(`Your journey was booked successfully! Booking ID: ${result.bookedFlight._id}`);
      } else {
        setError('Error booking flight');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error booking flight');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container mt-4">
      {availableFlights.map((flight) => (
        <div key={flight._id} className="mb-4">
          <Card>
            <Card.Body>
              <Card.Title>{flight.airline}</Card.Title>
              <strong>Flight Number:</strong> {flight.flight_number}
              <div className="d-flex justify-content-between mt-2">
                <div className='row'>
                  <p className="card-text">Departure: {flight.departure.date_time}</p>
                  <p className="card-text">From: {flight.departure.location}</p>
                </div>
                <div className='row'>
                  <p className="card-text">Arrival: {flight.arrival.date_time}</p>
                  <p className="card-text">To: {flight.arrival.location}</p>
                </div>
              </div>
              <Table responsive>
                <thead>
                  <tr>
                    <th>Class</th>
                    <th>Remaining Seats</th>
                    <th>Price</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(flight.class_availability).map(([className, details]) => (
                    <tr key={className}>
                      <td>{className}</td>
                      <td>{details.remaining_seats}</td>
                      <td>{details.price}</td>
                      <td>
                        <Button onClick={() => handleBookFlight(flight, className)}>Book</Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </Table>
            </Card.Body>
          </Card>
        </div>
      ))}
      {bookingMessage && <p>{bookingMessage}</p>}
      {isLoading && (
        <div className="d-flex justify-content-center align-items-center">
          <img src={loadingGif} alt="Loading" className="loading-gif" />
        </div>
      )}
      {error && <p>{error}</p>}
    </div>
  );
}

export default AvailableFlights;

