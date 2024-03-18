

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/signIn'; 
import SignUp from './components/signup';
import BookingForm from './components/Bookingform';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import FlightsDefault from "./components/DedaultFlights";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAvailableFlights, setShowAvailableFlights] = useState(true);

  const handleLogin = (email) => {
    setUserEmail(email);
    setLoggedIn(true);
  };

  const handleBookNow = () => {
    setShowAvailableFlights(false);
  };

  return (
    <Router>
      <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userEmail={userEmail} />
        <Routes>
          {/* Render the SignIn component at the /signin route */}
          <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<BookingForm handleBookNow={handleBookNow} />} />
          <Route path="/booking" element={<BookingPage />} />
        </Routes>

        {showAvailableFlights && <FlightsDefault />}

        <Footer />
      </div>
    </Router>
  );
}

export default App;
