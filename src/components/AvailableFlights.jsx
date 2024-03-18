
// import React, { useState } from "react";
// import { Button } from "react-bootstrap";

// function AvailableFlights({ availableFlights, onBookFlight }) {
//   const [bookingMessage, setBookingMessage] = useState("");

//   const handleBookFlight = async (flight, classSelection) => {
//     try {
//       const response = await fetch("https://successonfly-backend-1.onrender.com/api/book-flight", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify({ flight, classSelection }),
//       });

//       if (response.ok) {
//         const result = await response.json();
//         setBookingMessage(`Your journey was booked successfully! Booking ID: ${result.bookedFlight._id}`);
//       } else {
//         setBookingMessage("Error booking flight");
//       }
//     } catch (error) {
//       console.error("Error:", error);
//       setBookingMessage("Error booking flight");
//     }
//   };

//   return (
//     <div className="w-100" style={{ height: "100vh" }}>
//       <h2>Available Flights</h2>
//       {bookingMessage && <p>{bookingMessage}</p>}
//       <ul>
//         {availableFlights.map((flight, index) => (
//           <li key={index}>
//             <h3>{flight.airline}</h3>
//             <p>Departure: {flight.departure.date_time}</p>
//             <p>From: {flight.departure.location}</p>
//             <p>Arrival: {flight.arrival.date_time}</p>
//             <p>To: {flight.arrival.location}</p>
//             <p>Class Availability:</p>
//             <ul>
//               {Object.entries(flight.class_availability).map(([className, details]) => (
//                 <li key={className}>
//                   {className}: {details.remaining_seats} seats available at ${details.price}
//                   <Button onClick={() => handleBookFlight(flight, className)}>Book {className}</Button>
//                 </li>
//               ))}
//             </ul>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default AvailableFlights;

import React, { useState } from "react";
import { Button } from "react-bootstrap";

function AvailableFlights({ availableFlights, onBookFlight }) {
  const [bookingMessage, setBookingMessage] = useState("");

  const handleBookFlight = async (flight, classSelection) => {
    try {
      const response = await fetch("https://successonfly-backend-1.onrender.com/api/book-flight", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ flight, classSelection }),
      });

      if (response.ok) {
        const result = await response.json();
        setBookingMessage(`Your journey was booked successfully! Booking ID: ${result.bookedFlight._id}`);
      } else {
        setBookingMessage("Error booking flight");
      }
    } catch (error) {
      console.error("Error:", error); // Removed console.log
      setBookingMessage("Error booking flight");
    }
  };

  return (
    <div className="w-100" style={{ height: "100vh" }}>
      <h2>Available Flights</h2>
      {bookingMessage && <p>{bookingMessage}</p>}
      <ul>
        {availableFlights.map((flight, index) => (
          <li key={index}>
            <h3>{flight.airline}</h3>
            <p>Departure: {flight.departure.date_time}</p>
            <p>From: {flight.departure.location}</p>
            <p>Arrival: {flight.arrival.date_time}</p>
            <p>To: {flight.arrival.location}</p>
            <p>Class Availability:</p>
            <ul>
              {Object.entries(flight.class_availability).map(([className, details]) => (
                <li key={className}>
                  {className}: {details.remaining_seats} seats available at ${details.price}
                  <Button onClick={() => handleBookFlight(flight, className)}>Book {className}</Button>
                </li>
              ))}
            </ul>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AvailableFlights;
