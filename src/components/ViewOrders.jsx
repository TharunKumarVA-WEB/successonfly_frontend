// import React, { useState, useEffect } from 'react';
// import loadingGif from '../assets/Loading.gif';

// function ViewOrders({ userEmail }) {
//   const [orders, setOrders] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [error, setError] = useState(null);

//   useEffect(() => {
//     const fetchOrders = async () => {
//       setIsLoading(true);
//       try {
//         const response = await fetch(`https://successonfly-backend-1.onrender.com/api/get-user-orders?email=${userEmail}`);
//         if (response.ok) {
//           const data = await response.json();
//           setOrders(data.orders);
//         } else {
//           setError('Failed to fetch orders');
//         }
//       } catch (error) {
//         console.error('Error fetching orders:', error);
//         setError('Failed to fetch orders');
//       } finally {
//         setIsLoading(false);
//       }
//     };
//     fetchOrders();
//   }, [userEmail]);

//   if (isLoading) {
//     return (
//       <div className="d-flex justify-content-center align-items-center">
//         <img src={loadingGif} alt="Loading" className="loading-gif" />
//       </div>
//     );
//   }

//   if (error) {
//     return <p>{error}</p>;
//   }

//   return (
//     <div>
//       <h2>Your Orders</h2>
//       {orders.length === 0 ? (
//         <p>No orders found.</p>
//       ) : (
//         <ul>
//           {orders.map((order, index) => (
//             <li key={index}>
//               <p>Flight: {order.airline}</p>
//               <p>Departure: {order.departure.date_time}</p>
//               <p>Class: {order.classSelection}</p>
//             </li>
//           ))}
//         </ul>
//       )}
//     </div>
//   );
// }

// export default ViewOrders;



import React, { useState, useEffect } from 'react';
import loadingGif from '../assets/Loading.gif';

function ViewOrders({ userEmail }) {
  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrders = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(`https://successonfly-backend-1.onrender.com/api/get-user-orders?email=${userEmail}`);
        if (response.ok) {
          const data = await response.json();
          setOrders(data.orders);
        } else {
          setError('Failed to fetch orders');
        }
      } catch (error) {
        console.error('Error fetching orders:', error);
        setError('Failed to fetch orders');
      } finally {
        setIsLoading(false);
      }
    };
    fetchOrders();
  }, [userEmail]);

  if (isLoading) {
    return (
      <div className="d-flex justify-content-center align-items-center">
        <img src={loadingGif} alt="Loading" className="loading-gif" />
      </div>
    );
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div>
      <h2>Your Orders</h2>
      {/* {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <ul>
          {orders.map((order, index) => (
            <li key={index}>
              <p>Flight: {order.airline}</p>
              <p>Departure: {order.departure.date_time}</p>
              <p>Class: {order.classSelection}</p>
            </li>
          ))}
        </ul>
      )} */}


{/* 
      {orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  <ul>
    {orders.map((order, index) => (
      <li key={index}>
        {order.flight ? (
          <>
            <p>Flight: {order.flight.airline}</p>
            <p>Departure: {order.flight.departure.date_time}</p>
            <p>Class: {order.classSelection}</p>
          </>
        ) : null}
      </li>
    ))}
  </ul>
)} */}


{console.log('Orders:', orders)}
{orders.length === 0 ? (
  <p>No orders found.</p>
) : (
  <ul>
    {orders.map((order, index) => {
      console.log('Order:', order);
      return (
        <li key={index}>
          {order && order.flight ? (
            <>
              <p>Flight: {order.flight.airline}</p>
              <p>Departure: {order.flight.departure.date_time}</p>
              <p>Class: {order.classSelection}</p>
            </>
          ) : null}
        </li>
      );
    })}
  </ul>
)}



    </div>
  );
}

export default ViewOrders;
