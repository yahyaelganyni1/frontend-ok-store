import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { postReview } from '../review/reviewSlice';
import ReactStars from 'react-rating-stars-component';

const ReviewForm = ({ productId }) => {
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState('');
  const [error, setError] = useState('');
  const userId = useSelector((state) => state.authentication.user?.id);
  const dispatch = useDispatch();
  // console.log(userId);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (rating === 0) {
      setError('Please select a rating');
      return;
    }
    dispatch(
      postReview({
        review: {
          rating,
          comment,
          user_id: userId,
          product_id: productId,
        },
      }),
    );
    setRating(0);
    setComment('');
  };

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="rating">Rating</label>
        <ReactStars
          count={5}
          value={rating}
          onChange={setRating}
          size={24}
          activeColor="#ffd700"
        />
        {error && <p className="error">{error}</p>}
      </div>
      <div>
        <label htmlFor="comment">Comment</label>
        <textarea
          id="comment"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
        />
      </div>
      <div>
        <button type="submit">Submit</button>
      </div>
      {error && <div>{error}</div>}
    </form>
  );
};

export default ReviewForm;
