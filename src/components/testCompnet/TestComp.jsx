import React from 'react';
import { useEffect } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';

const TestComp = () => {
  //   const products = useSelector((state) => state.products.products);
  //   console.log('products', products);
  console.log('hello');
  useEffect(() => {
    // fetch users data from jsonplaceholder
  }, []);

  return <div>TestComp</div>;
};

export default TestComp;
