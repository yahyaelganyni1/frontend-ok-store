import React from 'react';
import Signup from './features/authentication/Signup';
import './App.css';
import Login from './features/authentication/Login';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Products from './features/products/Products';


function App() {

  return (
    <div className="App">
      <Header />
      <h1>Hello World</h1>
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </div>
  );
}

export default App;
