


import React from 'react';
import { useSearchContext } from './SearchContext';
import AvailableFlights from './AvailableFlights';

function SearchResults({ startDate, endDate }) {


  
  console.log('Start Date in SearchResults Component:', startDate);
  console.log('End Date in SearchResults Component:', endDate);

  const { searchResults } = useSearchContext();


  return (
    <div>
      <h1>Search Results</h1>
      <AvailableFlights availableFlights={searchResults} startDate={startDate} endDate={endDate} />
    </div>
  );
}

export default SearchResults;
