import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const initialState = {
    reviews: [],
    rating: 1,
    loading: false,
    error: null,
    averageRating: 0,
}

export const getProductReviews = createAsyncThunk(
    'reviews/getProductReviews',
    async (id) => {
        const response = await axios.get(`${baseUrl}/product_reviews/${id}`);
        return response.data;
    }
)

export const postReview = createAsyncThunk(
    'reviews/postReview',
    async (review) => {
        const response = await axios.post(`${baseUrl}/reviews`, review, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        }).catch((error) => {
            console.error(error);
        });
        console.log(response.data);
        return response.data;

    }
)

export const deleteReview = createAsyncThunk(
    'reviews/deleteReview',
    async (id) => {
        const response = await axios.delete(`${baseUrl}/reviews/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        });
        console.log(response.data);
        return response.data;
    }
)

export const updateReview = createAsyncThunk(
    'reviews/updateReview',
    async (id, review) => {
        const response = await axios.put(`${baseUrl}/reviews/${id}`, review, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        });
        console.log(response.data);
        return response.data;
    }
)

export const reviewSlice = createSlice({
    name: 'reviews',
    initialState,
    reducers: {
        setRating: (state, action) => {
            state.rating = action.payload;
        }
    },
    extraReducers: {
        // get product reviews
        [getProductReviews.pending]: (state, action) => {
            state.loading = true;
        },
        [getProductReviews.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [getProductReviews.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // post review
        [postReview.pending]: (state, action) => {
            state.loading = true;
        },
        [postReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [postReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // delete review
        [deleteReview.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [deleteReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        // update review
        [updateReview.pending]: (state, action) => {
            state.loading = true;
        },
        [updateReview.fulfilled]: (state, action) => {
            state.loading = false;
            state.reviews = action.payload;
        },
        [updateReview.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }


    }
})

export default reviewSlice.reducer;