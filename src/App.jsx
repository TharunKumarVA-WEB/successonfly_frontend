

import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/SignIn'; 
import SignUp from './components/SignUp';
import BookingForm from './components/BookingForm';
import Footer from './components/Footer';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');

  const handleLogin = (email) => {
    setUserEmail(email);
    setLoggedIn(true);
  };

  return (
    <Router>
      <div>
        <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userEmail={userEmail} />
        <Routes>
          {/* Render the SignIn component at the /signin route */}
          <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/" element={<BookingForm />} />
        </Routes>
        <Footer />            
      </div>
    </Router>     
  );
}

export default App;
