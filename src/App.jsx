


import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/Header';
import SignIn from './components/signIn'; 
import SignUp from './components/signup';
import BookingForm from './components/Bookingform';
import Footer from './components/Footer';
import BookingPage from './components/BookingPage';
import FlightsDefault from "./components/DedaultFlights";
import AvailableFlights from "./components/AvailableFlights"; 
import ViewOrders from "./components/ViewOrders"; 
import { SearchProvider } from './components/SearchContext';
import SearchResults from './components/SearchResults';

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userEmail, setUserEmail] = useState('');
  const [showAvailableFlights, setShowAvailableFlights] = useState(true);
  const [startDate, setStartDate] = useState(""); // Define startDate state
  const [endDate, setEndDate] = useState(""); // Define endDate state

  const handleLogin = (email) => {
    setUserEmail(email);
    setLoggedIn(true);
  };

  const handleBookNow = () => {
    setShowAvailableFlights(false);
  };

  // Define availableFlights here
  const availableFlights = []; // Placeholder, replace it with your actual data

  return (
    <Router>
      <SearchProvider>
        <div>
          <Header loggedIn={loggedIn} setLoggedIn={setLoggedIn} userEmail={userEmail} />
          <Routes>
            {/* Render the SignIn component at the /signin route */}
            <Route path="/signin" element={<SignIn setLoggedIn={setLoggedIn} setUserEmail={setUserEmail} />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/" element={<BookingForm handleBookNow={handleBookNow} setStartDate={setStartDate} setEndDate={setEndDate} />} />
            <Route path="/booking" element={<BookingPage />} />
            <Route path="/searchflights" element={<AvailableFlights availableFlights={availableFlights} />} />
            {/* <Route path="/search-results" element={<SearchResults startDate={startDate} endDate={endDate} />} /> */}
            <Route path="/search-results" element={<SearchResults startDate={startDate} endDate={endDate} />} />

            <Route path="/orders" element={<ViewOrders userEmail={userEmail} />} />
          </Routes>
          {showAvailableFlights && <FlightsDefault />}
          <Footer />
        </div>
      </SearchProvider>
    </Router>
  );
}

export default App;

