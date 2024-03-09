import React, { useState } from 'react';
import axios from 'axios';

function BookingForm() {
  const [searched, setSearched] = useState(false);
  const [availableFlights, setAvailableFlights] = useState([]);

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    // Your form submission logic here

    // Assuming you make a request to fetch available flights
    try {
      const response = await axios.get('http://localhost:3000/api/available-flights');
      setAvailableFlights(response.data.availableFlights);
      setSearched(true); // Set searched to true after fetching flights
    } catch (error) {
      console.error('Error fetching available flights:', error);
    }
  };

  return (
    <div>
      <form onSubmit={handleFormSubmit}>
        {/* Your form inputs here */}
        <button type="submit">Search Flights</button>
      </form>

      {searched && availableFlights.length > 0 && (
        <div>
          <h2>Available Flights</h2>
          <ul>
            {availableFlights.map(flight => (
              <li key={flight._id}>
                <h3>{flight.airline}</h3>
                {/* Flight details */}
              </li>
            ))}
          </ul>
        </div>
      )}
      {searched && availableFlights.length === 0 && (
        <p>No flights available for the selected criteria.</p>
      )}
    </div>
  );
}

export default BookingForm;
