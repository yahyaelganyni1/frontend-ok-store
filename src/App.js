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
import About from './components/about/About';
import ShoppingCart from './features/shoppingcart/ShoppingCart';
import PrivetRoute from './privetRoute/PrivetRoute';
import TestComp from './components/testCompnet/TestComp';


function App() {

  return (
    <div className="App">
      <Header />
      <TestComp />
      <Routes>
        {/* <Route path="/" element={<PrivetRoute />} /> */}

        <Route element={<PrivetRoute />} >
          <Route path="/add-products" element={<AddProducts />} />
          <Route path='/shopping-cart' element={<ShoppingCart />} />
          <Route path="/all-users" element={<AllUsers />} />
        </Route>
        <Route path="/" element={<Products />} />
        <Route path="/products/:id" element={<SingleProduct />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/about" element={<About />} />
      </Routes>
    </div>
  );
}

export default App;
