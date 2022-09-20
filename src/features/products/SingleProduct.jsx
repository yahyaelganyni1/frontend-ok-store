import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from './productsSlice';
import { useParams } from 'react-router-dom';
import { deleteProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';
import './SingleProduct.scss';

const SingleProduct = () => {
  const product = useSelector((state) => state.products.product);
  const user = useSelector((state) => state.authentication.user?.user);
  const productLoading = useSelector((state) => state.products.loading);
  const productError = useSelector((state) => state.products.error);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
  }, []);

  const deleteTheProduct = async () => {
    dispatch(deleteProduct(id));
    navigate('/');
  };

  return (
    <div className="single-product">
      {productLoading ? (
        <p className="single-product__loading">Loading...</p>
      ) : (
        <div>
          <h2> {product?.name} </h2>

          <img src={product?.image_path} width="300" />
          <p className="product-price">
            {' '}
            <span>price:</span> {product?.price}${' '}
          </p>
          <p className="product-quantity">
            {' '}
            | {product?.quantity} | item available
          </p>
          <h5 className="product-description-header">description</h5>
          <p className="product-description"> {product?.description} </p>
          {user?.role === 'admin' || user?.id === product?.user_id ? (
            <button onClick={deleteTheProduct}>Delete</button>
          ) : (
            ''
          )}
        </div>
      )}
      {productError && <p>{productError}</p>}
    </div>
  );
};

export default SingleProduct;
