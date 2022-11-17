import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';
import { deleteReview } from '../review/reviewSlice';

const Reviews = ({ userId, setUpdateReview, reviews }) => {
  const dispatch = useDispatch();
  // const reviews = useSelector((state) => state.reviews.reviews?.reviews);
  const reviewsLoading = useSelector((state) => state.reviews.loading);
  const reviewsError = useSelector((state) => state.reviews.error);

  const handleDelete = (reviewId) => {
    dispatch(deleteReview(reviewId));
    setUpdateReview((state) => !state);
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
