import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchProducts } from './productsSlice';
import { getCategories } from '../category/categorySlice';
import { Link } from 'react-router-dom';
import './products.scss';

const Products = () => {
  const products = useSelector((state) => state.products.products);
  const productsLoading = useSelector((state) => state.products.loading);
  const productsError = useSelector((state) => state.products.error);
  const categories = useSelector((state) => state.categories.categories);

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCategories());
  }, [dispatch]);

  if (products.length === 0) {
    return <h3>theres no products</h3>;
  }

  return (
    <div className="products">
      <h3 className="products__title">Products</h3>
      <ul className="product__list">
        {products.map((product) => (
          <li key={product.id}>
            <Link to={`/products/${product.id}`}>
              <img src={product.image_path} alt={product.name} />
              <h4> {product.name} </h4>
              <p> price {product.price}$ </p>
              {categories.map((category) => {
                if (category.id === product.category_id) {
                  return <p> {category.name} </p>;
                }
              })}
            </Link>
          </li>
        ))}
      </ul>
      {productsError && <p>{productsError}</p>}
    </div>
  );
};

export default Products;
