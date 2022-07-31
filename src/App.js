import React from 'react';

import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const count = useSelector((state) => state.authentication);
  console.log(count);
  return (
    <div className="App">
      <h1>Hello World</h1>
    </div>
  );
}

export default App;
