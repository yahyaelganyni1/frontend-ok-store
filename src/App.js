import React from 'react';
import Signup from './features/authentication/Signup';
import './App.css';
import Login from './features/authentication/Login';
import Header from './components/header/Header';
import { Routes, Route } from 'react-router-dom';
import Products from './features/products/Products';
import AddProducts from './features/products/AddProducts';
import AllUsers from './features/authentication/AllUsers';
import SingleProduct from './features/products/SingleProduct';
function App() {

  return (
    <div className="App">
      <Header />
      <Routes>
        <Route path="/" element={<Products />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/add-products" element={<AddProducts />} />
        <Route path="/all-users" element={<AllUsers />} />
        <Route path="/products/:id" element={<SingleProduct />} />
      </Routes>
    </div>
  );
}

export default App;
