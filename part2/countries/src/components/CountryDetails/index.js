import React, { useEffect, useState } from 'react';
import axios from 'axios';
const CountryDetails = ({ country }) => {
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    axios
      .get(
        `http://api.weatherstack.com/current?access_key=${process.env.REACT_APP_API_KEY}&query=${country.capital}`
      )
      .then((response) => {
        setWeather(response.data.current);
      });
  });

  return (
    <>
      <h2>{country.name}</h2>

      <p>Capital: {country.capital}</p>
      <p>Population: {country.population}</p>
      <h3>Languages</h3>
      <ul>
        {country.languages.map((language) => (
          <p key={language.name}>{language.name}</p>
        ))}
      </ul>
      <img alt='flag' width='200' height='150' src={country.flag} />
      {weather && (
        <>
          <h2>Weather in {country.name}</h2>
          <p>
            <b>Temperature:</b> {weather.temperature} celcius
          </p>
          <img
            alt='weather'
            width='200'
            height='150'
            src={weather.weather_icons[0]}
          />
          <p>
            <b>Wind :</b> {weather.wind_speed} mph direction{' '}
            {weather.wind_speed}
          </p>
        </>
      )}
    </>
  );
};

export default CountryDetails;
