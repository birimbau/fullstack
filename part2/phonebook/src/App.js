import React, { useState, useEffect } from 'react';
import Filter from './components/Filter';
import PersonForm from './components/PersonForm';
import Person from './components/Person';
import phoneNumberService from './services/phoneNumber';

const App = () => {
  const [persons, setPersons] = useState([]);
  const [info, setInfo] = useState(null);
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
      const update = window.confirm(
        `${newName} is already added to phonebook, update?`
      );
      if (update) {
        phoneNumberService
          .update(persons[index], { name: newName, number: newNumber })
          .then((data) => {
            setPersons(
              persons.map((pers) => {
                if (pers.id !== data.id) {
                  return pers;
                }
                return data;
              })
            );
            setInfo({ type: 'info', text: `Updated ${data.name}` });
            setTimeout(() => {
              setInfo(null);
            }, 3000);
          })
          .catch(() => {
            setInfo({
              type: 'error',
              text: `${newName} was already deleted`,
            });
          });
      }
    } else {
      phoneNumberService
        .create({ name: newName, number: newNumber })
        .then((data) => {
          setPersons(persons.concat(data));
          setInfo({ type: 'info', text: `Added ${data.name}` });
          setTimeout(() => {
            setInfo(null);
          }, 3000);
        });
      setNewName('');
      setNewNumber('');
    }
  };

  return (
    <div>
      <h2>Phonebook</h2>
      {info && <div className={info.type}>{info.text}</div>}

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
      <Person
        persons={persons}
        filter={filter}
        deletePerson={(person) => {
          const deletePerson = window.confirm(`Delete ${person.name} ?`);
          if (deletePerson) {
            phoneNumberService.deletePerson(person).then(() => {
              const index = persons.findIndex((x) => x.id === person.id);
              setPersons([
                ...persons.slice(0, index),
                ...persons.slice(index + 1),
              ]);
            });
          }
        }}
      />
    </div>
  );
};

export default App;
