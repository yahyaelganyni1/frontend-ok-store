import React from 'react';
import Signup from './features/authentication/Signup';
import './App.css';
import { useSelector, useDispatch } from 'react-redux';

function App() {
  const count = useSelector((state) => state.authentication);
  console.log(count);
  return (
    <div className="App">
      <h1>Hello World</h1>
      <Signup />
    </div>
  );
}

export default App;
