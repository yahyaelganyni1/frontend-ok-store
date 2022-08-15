import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productsSlice';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
  }, []);

  console.log(products);

  return (
    <div>
      <h1>Products</h1>
      {productsLoading ? (
        <p>Loading...</p>
      ) : (
        <ul>
          {products.map((product) => (
            <li key={product.id}>
              <h4> {product.name} </h4>
              <p> {product.price} </p>
              <p>{product.quantity}</p>
            </li>
          ))}
        </ul>
      )}
      {productsError && <p>{productsError}</p>}
    </div>
  );
};

export default Products;
