import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';


const initialState = {
    products: [],
    product: null,
    loading: false,
    error: null,
}

const url = 'http://localhost:3000/products';

export const fetchProducts = createAsyncThunk(
    'products/fetchProducts',
    async () => {
        const response = await axios.get(url);
        console.log(response.data);
        return response.data;
    }
)


export const postProduct = createAsyncThunk(
    'products/postProduct',
    async (product) => {
        const response = await axios.post(url, product, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        });
        return response.data;
    }
)


export const deleteProduct = createAsyncThunk(
    'products/deleteProduct',
    async (id) => {
        const response = await axios.delete(`${url}/${id}`, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        });
        return response.data;
    }
)

export const updateProduct = createAsyncThunk(
    'products/updateProduct',
    async (product) => {
        const response = await axios.put(`${url}/${product.id}`, product, {
            headers: {
                'Authorization': localStorage.getItem('auth_token')
            }
        });
        return response.data;
    }
)

export const fetchProduct = createAsyncThunk(
    'products/fetchProduct',
    async (id) => {
        const response = await axios.get(`${url}/${id}`)
        return response.data;
    }
)

const productsSlice = createSlice({
    name: 'products',
    initialState,
    reducers: {
        setProducts: (state, action) => {
            state.products = action.payload;
        }
    },
    extraReducers: {
        [fetchProducts.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchProducts.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = action.payload;
        },
        [postProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [postProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products.push(action.payload);
        },
        [deleteProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [deleteProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = state.products.filter(product => product.id !== action.payload.id);
        },
        [updateProduct.pending]: (state, action) => {
            state.loading = true;
        },
        [updateProduct.fulfilled]: (state, action) => {
            state.loading = false;
            state.products = state.products.map(product => product.id === action.payload.id ? action.payload : product);
        }
    }
})

export const { setProducts } = productsSlice.actions;

export default productsSlice.reducer;


