import React from 'react';

const CountryDetails = ({ country }) => {
  return (
    <>
      <h2>{country.name}</h2>

      <p>Capital: capital</p>
      <p>Population: population</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <p key={language.name}>{language.name}</p>
        ))}
      </ul>
      <img alt='flag' width='200' height='150' src={country.flag} />
    </>
  );
};

export default CountryDetails;
