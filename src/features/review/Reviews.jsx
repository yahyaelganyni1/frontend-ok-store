import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import {
  getProductReviews,
  deleteReview,
  updateReview,
} from '../review/reviewSlice';
import ReviewForm from './ReviewForm';

const Reviews = ({ productId, userId }) => {
  const dispatch = useDispatch();
  const reviews = useSelector((state) => state.reviews.reviews?.reviews);
  const reviewsLoading = useSelector((state) => state.reviews.loading);
  const reviewsError = useSelector((state) => state.reviews.error);
  const [editReview, setEditReview] = useState(false);
  useEffect(() => {
    dispatch(getProductReviews(productId));
  }, [editReview]);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setEditReview((state) => !state);
  };

  const handleUpdate = () => {
    return <ReviewForm productId={productId} />;
  };

  return (
    <div>
      {reviewsLoading ? (
        <p>Loading...</p>
      ) : (
        <div>
          {reviews?.map((review) => (
            <div key={review.id}>
              <p>{review.comment}</p>
              <ReactStars
                count={5}
                value={review.rating}
                edit={false}
                size={24}
                activeColor="#ffd700"
                half={true}
              />
              {review.user_id === userId && (
                <div>
                  <button
                    onClick={() => {
                      handleDelete(review.id);
                    }}
                  >
                    remove your review
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      )}
      {reviewsError && <p>{reviewsError}</p>}
    </div>
  );
};

export default Reviews;
