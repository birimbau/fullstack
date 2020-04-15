import React from 'react';

const Header = (props) => {
  return <h1>{props.course}</h1>;
};

const Part = (props) => {
  return (
    <p>
      {props.part} {props.exercise}
    </p>
  );
};

const Content = (props) => {
  return (
    <div>
      {props.parts.map((part, index) => (
        <Part key={part.id} part={part.name} exercise={part.exercises} />
      ))}
    </div>
  );
};

const Total = (props) => {
  const total = props.parts.reduce((total, current, index) => {
    return (total += current.exercises);
  }, 0);
  return <p>Number of exercises {total}</p>;
};

const Course = (props) => {
  return (
    <>
      <Header course={props.course.name} />
      <Content parts={props.course.parts} />
      <Total parts={props.course.parts} />
    </>
  );
};

export default Course;
