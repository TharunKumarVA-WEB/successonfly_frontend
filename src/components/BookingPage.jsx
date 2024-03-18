
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

function BookingPage() {
  const [numAdults, setNumAdults] = useState(1);
  const [numChildren, setNumChildren] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");
  const navigate = useNavigate();
  const location = useLocation();
  const { flight } = location.state;

  const handleConfirmBooking = () => {
    // Add your logic here to handle the booking confirmation
    // This is just an example, you can replace it with your actual logic
    alert(`Booking confirmed for ${numAdults} adults, ${numChildren} children in ${selectedClass} class.`);
    // Redirect the user to the previous page after confirming the booking
    navigate(-1); // Navigate back one step
  };

  return (
    <div className="container mt-4">
      <h2 className="mb-4">Booking Details</h2>
      <div className="card mb-3">
        <div className="card-body">
          <h3 className="card-title">{flight.airline}</h3>
          <p className="card-text">Flight Number: {flight.flight_number}</p>
          <p className="card-text">Departure: {flight.departure.location} - {flight.departure.date_time}</p>
          <p className="card-text">Arrival: {flight.arrival.location} - {flight.arrival.date_time}</p>
          <p className="card-text">Business Class Seats: {flight.class_availability.Business.remaining_seats}</p>
          <p className="card-text">Economy Class Seats: {flight.class_availability.Economy.remaining_seats}</p>
        </div>
      </div>
      <div className="card mb-3">
        <div className="card-body">
          <label htmlFor="numAdults" className="form-label">Number of Adults:</label>
          <input type="number" id="numAdults" className="form-control mb-3" value={numAdults} min="1" onChange={(e) => setNumAdults(e.target.value)} />
          <label htmlFor="numChildren" className="form-label">Number of Children (below 2 years):</label>
          <input type="number" id="numChildren" className="form-control mb-3" value={numChildren} min="0" onChange={(e) => setNumChildren(e.target.value)} />
          <label htmlFor="class" className="form-label">Select Class:</label>
          <select id="class" className="form-select mb-3" value={selectedClass} onChange={(e) => setSelectedClass(e.target.value)}>
            <option value="Economy">Economy</option>
            <option value="Business">Business</option>
          </select>
          <button onClick={handleConfirmBooking} className="btn btn-primary">Confirm Booking</button>
        </div>
      </div>
    </div>
  );
}

export default BookingPage;
