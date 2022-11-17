import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { fetchSingleProduct } from './productsSlice';
import { useParams } from 'react-router-dom';
import { deleteProduct } from './productsSlice';
import { useNavigate } from 'react-router-dom';
import { addToCart } from '../shoppingcart/shoppingcartSlice';
import { showCategory } from '../category/categorySlice';
import { getProductReviews } from '../review/reviewSlice';
import ReactStars from 'react-rating-stars-component';

import { Link } from 'react-router-dom';

import Reviews from '../review/Reviews';
import ReviewForm from '../review/ReviewForm';
import './SingleProduct.scss';

const SingleProduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  // product contains
  const product = useSelector((state) => state.products.product);
  const categoryId = product?.category_id;
  const productLoading = useSelector((state) => state.products.loading);
  const productError = useSelector((state) => state.products.error);
  //* reviews contains
  const averageRating = useSelector(
    (state) => state.reviews.reviews?.average_rating,
  );
  const reviews = useSelector((state) => state.reviews.reviews?.reviews);
  const [updateReview, setUpdateReview] = useState(false);

  const category = useSelector((state) => state.categories?.category);
  const user = useSelector((state) => state.authentication.user);

  //* the useEffect is used to fetch the product
  useEffect(() => {
    dispatch(fetchSingleProduct(id));
    dispatch(showCategory(categoryId));
    dispatch(getProductReviews(id));
    // return () => {
    //   dispatch(fetchSingleProduct(id));
    //   dispatch(showCategory(categoryId));
    //   dispatch(getProductReviews(id));
    // };
  }, [updateReview]);

  console.log('id');
  const deleteTheProduct = async () => {
    dispatch(deleteProduct(id));
    navigate('/');
  };

  const handleAddToCart = () => {
    dispatch(addToCart(id));
  };

  document.title = product?.name; //* set the title of the page

  //* a user can only submit one review per product
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
          {user ? (
            <button onClick={handleAddToCart}>Add to cart</button>
          ) : (
            <Link to="/login">
              <button>add to cart</button>
            </Link>
          )}
          {user?.role === 'admin' || user?.id === product?.user_id ? (
            <button onClick={deleteTheProduct}>Delete</button>
          ) : null}
        </div>
      )}
      {productError && <p>{productError}</p>}
      rating:{' '}
      {averageRating ? (
        <ReactStars
          count={5}
          value={parseInt(averageRating)}
          size={30}
          edit={false}
          activeColor="#ffd700"
        />
      ) : (
        'no rating yet'
      )}
      {/* : 'No reviews yet'}</h3> */}
      {userHasReviewed || !user ? null : (
        <ReviewForm
          productId={id}
          userId={user?.id}
          updateReview={updateReview}
          setUpdateReview={setUpdateReview}
          half={true}
        />
      )}
      <Reviews
        productId={id}
        userId={user?.id}
        setUpdateReview={setUpdateReview}
        reviews={reviews}
      />
    </div>
  );
};

export default SingleProduct;
