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

  const [category, setCategory] = useState('all');

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchProducts());
    dispatch(getCategories());
  }, []);

  const handleCategoryChange = (e) => {
    setCategory(e.target.value);
  };

  document.title = 'Products';

  if (products.length === 0) {
    return <h3>theres no products</h3>;
  }

  return (
    <div className="products">
      <h3 className="products__title">Products</h3>
      <div className="products__filter">
        <select
          name="category"
          id="category"
          value={category}
          onChange={handleCategoryChange}
          className="products_category_select"
        >
          <option
            value="all"
            className="products__filter__select__options__option"
          >
            all categories
          </option>
          {categories.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <ul className="products__item">
        {productsLoading ? (
          <p>Loading...</p>
        ) : (
          products
            .filter((product) => {
              if (category === 'all') {
                return true;
              } else {
                return product.category_id === parseInt(category);
              }
            })
            .map((product) => (
              <li key={product.id}>
                <Link to={`/products/${product.id}`}>
                  <img
                    src={product.image_path}
                    alt={product.name}
                    width="300"
                  />
                  <h4>{product.name}</h4>
                </Link>
              </li>
            ))
        )}
      </ul>
    </div>
  );
};

export default Products;
