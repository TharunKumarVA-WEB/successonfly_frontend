

// BookingForm.js
import React, { useState } from "react";
import { Button } from "react-bootstrap";
import AvailableFlights from "./AvailableFlights";

function BookingForm() {
  const [startLocation, setStartLocation] = useState("");
  const [endLocation, setEndLocation] = useState("");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [flightType, setFlightType] = useState("oneway");
  const [adults, setAdults] = useState(1);
  const [children, setChildren] = useState(0);
  const [infants, setInfants] = useState(0);
  const [selectedClass, setSelectedClass] = useState("Economy");

  const [searched, setSearched] = useState(false);
  const [availableFlights, setAvailableFlights] = useState([]);

  const handleStartLocationChange = (event) => {
    setStartLocation(event.target.value);
  };

  const handleEndLocationChange = (event) => {
    setEndLocation(event.target.value);
  };

  const handleToggleFlyDirection = () => {
    const temp = startLocation;
    setStartLocation(endLocation);
    setEndLocation(temp);
  };

  const handleStartDateChange = (e) => {
    const formattedDate = e.target.value;
    setStartDate(formattedDate);
  };

  const handleEndDateChange = (e) => {
    const formattedDate = e.target.value;
    setEndDate(formattedDate);
  };

  const handleAdultsChange = (value) => {
    const newAdults = adults + value;
    if (newAdults >= 1 && newAdults <= 15) {
      setAdults(newAdults);
    }
  };

  const handleChildrenChange = (value) => {
    const newChildren = children + value;
    if (newChildren >= 0 && newChildren <= 15) {
      setChildren(newChildren);
    }
  };

  const handleInfantsChange = (value) => {
    const newInfants = infants + value;
    if (newInfants >= 0 && newInfants <= 15) {
      setInfants(newInfants);
    }
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    const travelDetails = {
      startLocation,
      endLocation,
      startDate,
      endDate,
      flightType,
      adults,
      children,
      infants,
      selectedClass,
    };

    try {
      const response = await fetch("https://successonfly-backend-1.onrender.com/api/check-flights", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(travelDetails),
      });

      if (response.ok) {
        const result = await response.json();
        setAvailableFlights(result.availableFlights);
        setSearched(true);
      } else {
        console.error("Error submitting travel details");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className="container mt-4">
      <form onSubmit={handleFormSubmit}>
        <div className="row">
          <div className="col">
            <div className="d-flex align-items-center">
              <input
                type="radio"
                className="btn-check"
                name="options-base"
                id="option5"
                autoComplete="off"
                checked={flightType === "oneway"}
                onChange={() => setFlightType("oneway")}
              />
              <label className="btn" htmlFor="option5">
                SingleTrip
              </label>
            </div>
          </div>
          <div className="col ">
            <div className="d-flex align-items-center">
              <input
                type="radio"
                className="btn-check"
                name="options-base"
                id="option6"
                autoComplete="off"
                checked={flightType === "return"}
                onChange={() => setFlightType("return")}
              />
              <label className="btn" htmlFor="option6">
                RoundTrip
              </label>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col">
            <label className="col mb-3">
              Start Location:
              <input
                type="text"
                value={startLocation}
                onChange={handleStartLocationChange}
                required
                className="form-control"
              />
            </label>
          </div>

          <div className="col d-flex align-items-center justify-content-center">
            <Button
              variant="link"
              onClick={handleToggleFlyDirection}
              className="fs-2"
            >
              ⇋
            </Button>
          </div>

          <div className="col">
            <label className="col mb-3 ">
              End Location:
              <input
                type="text"
                value={endLocation}
                onChange={handleEndLocationChange}
                required
                className="form-control"
              />
            </label>
          </div>

          <div className="col">
            <label className=" col mb-3 ">
              Start Date:
              <input
                type="date"
                value={startDate}
                onChange={handleStartDateChange}
                required
                className="form-control"
              />
            </label>
          </div>

          <div className="col">
            <label className=" mb-4">
              End Date:
              <input
                type="date"
                value={endDate}
                onChange={handleEndDateChange}
                required
                className="form-control"
                disabled={flightType === "oneway"}
              />
            </label>
          </div>
        </div>

        <div className="row mt-4 ">
          <div className="col">
            <div className="dropdown">
              <button
                className="btn btn-secondary dropdown-toggle"
                type="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Class
              </button>
              <ul className="dropdown-menu">
                <li>
                  <div className="col">
                    <label>
                      <select
                        value={selectedClass}
                        onChange={handleClassChange}
                      >
                        <option value="Economy">Economy</option>
                        <option value="PremiumEconomy">Premium Economy</option>
                        <option value="Business">Business</option>
                        <option value="FirstClass">First Class</option>
                      </select>
                    </label>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          <div className="col">
            <div className="dropdown">
              <a
                className="btn btn-secondary dropdown-toggle"
                href="#"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Select Guests
              </a>

              <ul className="dropdown-menu">
                <li className="mx-auto p-3">
                  <label className="dropdown-item">
                    Adults (12 years+):
                    <button onClick={() => handleAdultsChange(-1)}>-</button>
                    <span>{adults}</span>
                    <button onClick={() => handleAdultsChange(1)}>+</button>
                  </label>
                </li>
                <li className="mx-auto p-3">
                  <label className="dropdown-item">
                    Children (2-12 years):
                    <button onClick={() => handleChildrenChange(-1)}>-</button>
                    <span>{children}</span>
                    <button onClick={() => handleChildrenChange(1)}>+</button>
                  </label>
                </li>
                <li className="mx-auto p-3">
                  <label className="dropdown-item">
                    Infants (0-2 years):
                    <button onClick={() => handleInfantsChange(-1)}>-</button>
                    <span>{infants}</span>
                    <button onClick={() => handleInfantsChange(1)}>+</button>
                  </label>
                </li>
              </ul>
            </div>
          </div>
        </div>

        <div className="row mt-4">
          <div className="col d-flex justify-content-center">
            <Button variant="primary" type="submit" className="bg-info fs-5">
              Search
            </Button>
          </div>
        </div>
      </form>

      {/* Display available flights */}
      {searched && availableFlights.length > 0 && (
        <AvailableFlights availableFlights={availableFlights} />
      )}

      {/* Display message if no flights available */}
      {searched && availableFlights.length === 0 && (
        <p>No Flights available for the selected criteria.</p>
      )}
    </div>
  );
}

export default BookingForm;

