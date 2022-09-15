import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from './productsSlice';
import { useParams } from 'react-router-dom';
import { deleteProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';

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

  const deleteTheProduct = () => {
    dispatch(deleteProduct(id));
    navigate('/');
  };

  return (
    <div className="single-product">
      <h3>Single Product</h3>
      {productLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          <img src={product?.image_path} width="300" />
          <h4> {product?.name} </h4>
          <p> {product?.price} </p>
          <p>{product?.quantity}</p>
          {product?.user_id === id || user?.role === 'admin' ? (
            <button onClick={deleteTheProduct}>Delete</button>
          ) : (
            <p>you can't delete this product</p>
          )}
        </div>
      )}
      {productError && <p>{productError}</p>}
    </div>
  );
};

export default SingleProduct;
