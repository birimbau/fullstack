import React from 'react';

const Person = ({ persons, filter }) => {
  return (
    <>
      {persons
        .filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) => (
          <p key={person.name}>
            {person.name} {person.number}
          </p>
        ))}
    </>
  );
};

export default Person;
