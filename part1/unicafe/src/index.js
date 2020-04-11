import React, { useState } from 'react';
import ReactDOM from 'react-dom';

const Statistic = ({ name, value }) => {
  return (
    <p>
      {name} {value}
    </p>
  );
};

const Statistics = ({ good, neutral, bad }) => {
  const average =
    good + neutral + bad > 0
      ? (good * 1 + neutral * 0 + bad * -1) / (good + neutral + bad)
      : '---';
  const positive =
    good + neutral + bad > 0 ? (good / (good + neutral + bad)) * 100 : 0;

  if (good + neutral + bad === 0) {
    return <p>No feedback given</p>;
  }

  return (
    <>
      <Statistic name='good' value={good} />
      <Statistic name='neutral' value={neutral} />
      <Statistic name='bad' value={bad} />
      <Statistic name='average' value={average} />
      <Statistic name='positive' value={`${positive} %`} />
    </>
  );
};

const Button = ({ feedback, onClick }) => {
  return (
    <button type='button' onClick={onClick}>
      {feedback}
    </button>
  );
};

const App = () => {
  // save clicks of each button to own state
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);

  const handleClick = (type) => () => {
    switch (type) {
      case 'good':
        return setGood(good + 1);
      case 'neutral':
        return setNeutral(neutral + 1);
      case 'bad':
        return setBad(bad + 1);
      default:
        return () => console.log('Not possible to provde feedback');
    }
  };

  return (
    <div>
      <h1>give feedback</h1>
      <Button feedback='good' onClick={handleClick('good')} />
      <Button feedback='neutral' onClick={handleClick('neutral')} />
      <Button feedback='bad' onClick={handleClick('bad')} />
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad} />
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
