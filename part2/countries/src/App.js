import React, { useEffect, useState } from 'react';
import axios from 'axios';
import CountryDetail from './components/CountryDetails';

function App() {
  const [countries, setCountries] = useState([]);
  const [searchValue, setSearchValue] = useState('');
  const [selectedCountry, setselectedCountry] = useState(null);
  const filteresCountries = countries.filter((x) =>
    x.name.toLowerCase().includes(searchValue.toLowerCase())
  );

  useEffect(() => {
    axios.get('https://restcountries.eu/rest/v2/all').then((response) => {
      setCountries(response.data);
    });
  }, []);

  const handleSearch = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div className='App'>
      <div>
        find countries
        <input value={searchValue} onChange={handleSearch} />
      </div>
      {filteresCountries.length === 0 && <p>No Results</p>}
      {filteresCountries.length > 10 && (
        <p>Too many matches, specify another filter</p>
      )}
      {filteresCountries.length <= 10 && filteresCountries.length > 1 && (
        <>
          {filteresCountries.map((country) => (
            <div key={country.name}>
              <span key={country.name}>{country.name}</span>{' '}
              <button
                onClick={() => {
                  setselectedCountry(country);
                }}
              >
                show
              </button>
            </div>
          ))}
          {selectedCountry && <CountryDetail country={selectedCountry} />}
        </>
      )}
      {filteresCountries.length === 1 && (
        <CountryDetail country={filteresCountries[0]} />
      )}
    </div>
  );
}

export default App;
