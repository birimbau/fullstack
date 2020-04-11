import React, { useState } from 'react';
import ReactDOM from 'react-dom';

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
      <button type='button' onClick={handleClick('good')}>
        good
      </button>
      <button type='button' onClick={handleClick('neutral')}>
        neutral
      </button>
      <button type='button' onClick={handleClick('bad')}>
        bad
      </button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
    </div>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
