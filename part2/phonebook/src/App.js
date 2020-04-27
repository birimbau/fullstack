import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import phoneNumberService from './services/phoneNumber';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [newName, setNewName] = useState('');
  const [newNumber, setNewNumber] = useState('');
  const [filter, setFilter] = useState('');

  useEffect(() => {
    phoneNumberService.getAll().then((data) => {
      setPersons(data);
    });
  }, []);

  const handleChangeName = (e) => {
    setNewName(e.target.value);
  };

  const handleChangeNumber = (e) => {
    setNewNumber(e.target.value);
  };

  const handleChangeFilter = (e) => {
    setFilter(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const index = persons.findIndex((x) => x.name === newName);

    if (index !== -1) {
      alert(`${newName} is already added to phonebook`);
    } else {
      phoneNumberService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          setPersons(persons.concat(data));
        });
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      <Filter filter={filter} handleChangeFilter={handleChangeFilter} />
      <h2>Add a new</h2>
      <PersonForm
        handleSubmit={handleSubmit}
        handleChangeName={handleChangeName}
        handleChangeNumber={handleChangeNumber}
        newName={newName}
        newNumber={newNumber}
      />
      <h2>Numbers</h2>
      <Person persons={persons} filter={filter} />
    </div>
  );
};

export default App;
