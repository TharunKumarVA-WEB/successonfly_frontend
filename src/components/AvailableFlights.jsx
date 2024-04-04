
// import React, { useState } from 'react';
// import { Button } from 'react-bootstrap';
// import loadingGif from '../assets/Loading.gif';

// function AvailableFlights({ availableFlights, onBookFlight }) {
//   const [bookingMessage, setBookingMessage] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);
//   const [selectedFlight, setSelectedFlight] = useState(null);

//   const handleBookFlight = async (classSelection) => {
//     setIsLoading(true);
//     setError(null);

//     try {
//       const response = await fetch('https://successonfly-backend-1.onrender.com/api/book-flight', {
//         method: 'POST',
//         headers: {
//           'Content-Type': 'application/json',
//         },
//         body: JSON.stringify({ flight: selectedFlight, classSelection }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setBookingMessage(`Your journey was booked successfully! Booking ID: ${result.bookedFlight._id}`);
//       } else {
//         setError('Error booking flight');
//       }
//     } catch (error) {
//       console.error('Error:', error);
//       setError('Error booking flight');
//     } finally {
//       setIsLoading(false);
//     }
//   };


//   if (!availableFlights || availableFlights.length === 0) {
//     return <p>No flights available.</p>;
//   }


//   return (
//     <div className="w-100" style={{ height: '100vh' }}>
//       {availableFlights.map((flight) => (
//         <div key={flight._id}>
//           <h2>{flight.airline}</h2>
//           <p>Departure: {flight.departure.date_time}</p>
//           <p>From: {flight.departure.location}</p>
//           <p>Arrival: {flight.arrival.date_time}</p>
//           <p>To: {flight.arrival.location}</p>
//           <p>Class Availability:</p>
//           <ul>
//             {Object.entries(flight.class_availability).map(([className, details]) => (
//               <li key={className}>
//                 {className}: {details.remaining_seats} seats available at ${details.price}
//                 <Button onClick={() => { setSelectedFlight(flight); handleBookFlight(className); }}>Book</Button>
//               </li>
//             ))}
//           </ul>
//         </div>
//       ))}
//       {bookingMessage && <p>{bookingMessage}</p>}
//       {isLoading && (
//         <div className="d-flex justify-content-center align-items-center">
//           <img src={loadingGif} alt="Loading" className="loading-gif" />
//         </div>
//       )}
//       {error && <p>{error}</p>}
//     </div>
//   );
// }

// export default AvailableFlights;


import React, { useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import loadingGif from '../assets/Loading.gif';

function AvailableFlights({ availableFlights, onBookFlight }) {
  const [bookingMessage, setBookingMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [selectedFlight, setSelectedFlight] = useState(null);

  const handleBookFlight = async (classSelection) => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch('https://successonfly-backend-1.onrender.com/api/book-flight', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ flight: selectedFlight, classSelection }),
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

  if (!availableFlights || availableFlights.length === 0) {
    return <p>No flights available.</p>;
  }

  return (
    <div className="w-100" style={{ height: '100vh' }}>
      {availableFlights.map((flight) => (
        <div key={flight._id} className="mb-4">
          <h2>{flight.airline}</h2>
          <p>Departure: {flight.departure.date_time}</p>
          <p>From: {flight.departure.location}</p>
          <p>Arrival: {flight.arrival.date_time}</p>
          <p>To: {flight.arrival.location}</p>
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
                  <td>${details.price}</td>
                  <td>
                    <Button onClick={() => { setSelectedFlight(flight); handleBookFlight(className); }}>Book</Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </Table>
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
