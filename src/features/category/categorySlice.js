import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const baseUrl = 'http://localhost:3000';

const initialState = {
    categories: [],
    category: {},
    loading: false,
    error: null,
}

export const getCategories = createAsyncThunk(
    'categories/getCategories',
    async () => {
        const response = await axios.get(`${baseUrl}/categories`).catch((error) => {
            console.error(error);
        });
        return response.data;
    }
)

export const showCategory = createAsyncThunk(
    'categories/showCategory',
    async (id) => {
        const response = await axios.get(`${baseUrl}/categories/${id}`).catch((error) => {
            console.error(error);
        });
        return response.data;
    }
)

export const addCategory = createAsyncThunk(
    'categories/addCategory',
    async (category) => {
        const response = await axios.post(`${baseUrl}/categories`, category).catch((error) => {
            console.error(error);
        });
        return response.data;
    }
)


export const deleteCategory = createAsyncThunk(
    'categories/deleteCategory',
    async (id) => {
        const response = await axios.delete(`${baseUrl}/categories/${id}`).catch((error) => {
            console.error(error);
        });
        return response.data;
    }
)

export const categorySlice = createSlice({
    name: 'categories',
    initialState,
    reducers: {},
    extraReducers: {
        [getCategories.pending]: (state, action) => {
            state.loading = true;
        },
        [getCategories.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [getCategories.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [showCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [showCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.category = action.payload;
        },
        [showCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [addCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [addCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [addCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        },
        [deleteCategory.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteCategory.fulfilled]: (state, action) => {
            state.loading = false;
            state.categories = action.payload;
        },
        [deleteCategory.rejected]: (state, action) => {
            state.loading = false;
            state.error = action.payload;
        }
    }
})


export default categorySlice.reducer;