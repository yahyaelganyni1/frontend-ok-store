import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from './productsSlice';
import { useParams } from 'react-router-dom';
import { deleteProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../shoppingcart/shoppingcartSlice';
import { showCategory } from '../category/categorySlice';

import Reviews from '../review/Reviews';
import ReviewForm from '../review/ReviewForm';
import './SingleProduct.scss';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // product contains
  const product = useSelector((state) => state.products.product);
  const productLoading = useSelector((state) => state.products.loading);
  const productError = useSelector((state) => state.products.error);
  // reviews contains
  const averageRating = useSelector(
    (state) => state.reviews.reviews?.average_rating,
  );
  const reviews = useSelector((state) => state.reviews.reviews?.reviews);

  const category = useSelector((state) => state.categories?.category);
  const user = useSelector((state) => state.authentication.user);

  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(showCategory(id));
  }, []);

  const deleteTheProduct = async () => {
    dispatch(deleteProduct(id));
    navigate('/');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  // a user can only submit one review per product
  const userHasReviewed = reviews?.some(
    (review) => review.user_id === user?.id,
  );

  return (
    <div className="single-product">
      {productLoading ? (
        <p className="single-product__loading">Loading...</p>
      ) : (
        <div>
          <h2> {product?.name} </h2>
          <h5>{category.name}</h5>
          <img src={product?.image_path} width="300" />
          <p className="product-price">
            <span>price:</span> {product?.price}${' '}
          </p>
          <p className="product-quantity">
            | {product?.quantity} | item available
          </p>
          <h5 className="product-description-header">description</h5>
          <p className="product-description"> {product?.description} </p>

          <button onClick={handleAddToCart}>Add to cart</button>

          {user?.role === 'admin' || user?.id === product?.user_id ? (
            <button onClick={deleteTheProduct}>Delete</button>
          ) : null}
        </div>
      )}
      {productError && <p>{productError}</p>}
      <h3>rating: {averageRating ? averageRating : 'No reviews yet'}</h3>

      {userHasReviewed || !user ? null : (
        <ReviewForm productId={id} userId={user?.id} />
      )}
      <Reviews productId={id} userId={user?.id} />
    </div>
  );
};

export default SingleProduct;
