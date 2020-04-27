import React, { Fragment } from 'react';

const Person = ({ persons, filter, deletePerson }) => {
  return (
    <>
      {persons
        .filter((x) => x.name.toLowerCase().includes(filter.toLowerCase()))
        .map((person) => (
          <Fragment key={person.id}>
            <p>
              {person.name} {person.number}
            </p>
            <button onClick={() => deletePerson(person)}>Delete</button>
          </Fragment>
        ))}
    </>
  );
};

export default Person;
