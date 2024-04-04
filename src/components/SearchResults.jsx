// SearchResults.jsx
import React from 'react';
import { useSearchContext } from './SearchContext';
import AvailableFlights from './AvailableFlights';

function SearchResults() {
  const { searchResults } = useSearchContext();

  return (
    <div>
      <h1>Search Results</h1>
      <AvailableFlights availableFlights={searchResults} />
    </div>
  );
}

export default SearchResults;
