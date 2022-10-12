import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    cart: [],
    loading: false,
    error: null,

}

const cartItemsUrl = 'http://localhost:3000/cart_products_index';

export const fetchCart = createAsyncThunk(
    'shoppingcart/fetchCart',
    async () => {
        const token = localStorage.getItem('auth_token');
        const response = await axios.get(cartItemsUrl, {
            headers: {
                "Authorization": localStorage.getItem('auth_token')
            },
        });
        return response.data;
    }
)




export const addToCart = createAsyncThunk(
    'shoppingcart/addToCart',
    async (id) => {
        const token = localStorage.getItem('auth_token');
        fetch(`http://localhost:3000/add_to_cart_by_number/${id}`, {
            method: 'POST',
            headers: {
                "Authorization": localStorage.getItem('auth_token')
            },
        })
            .then(response => response.json())
            .catch(error => console.log(error))
    }
)


export const removeFromCart = createAsyncThunk(
    'shoppingcart/removeFromCart',
    async (id) => {
        const token = localStorage.getItem('auth_token');
        fetch(`http://localhost:3000/destroy_cart_item/${id}`, {
            method: 'DELETE',
            headers: {
                "Authorization": localStorage.getItem('auth_token')
            },
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }
)

export const decrementItem = createAsyncThunk(
    'shoppingcart/decrementItem',
    async (id) => {
        const token = localStorage.getItem('auth_token');
        fetch(`http://localhost:3000/decrease_quantity/${id}`, {
            method: 'put',
            headers: {
                "Authorization": localStorage.getItem('auth_token')
            },
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }
)

export const incrementItem = createAsyncThunk(
    'shoppingcart/incrementItem',
    async (id) => {
        const token = localStorage.getItem('auth_token');
        fetch(`http://localhost:3000/increase_quantity/${id}`, {
            method: 'put',
            headers: {
                "Authorization": localStorage.getItem('auth_token')
            },
        })
            .then(response => response.json())
            .catch(error => console.error(error))
    }
)


export const shoppingcartSlice = createSlice({
    name: 'shoppingcart',
    initialState,
    reducers: {
        setItem: (state, action) => {
            state.cart.items.push(action.payload);
        },
    },
    extraReducers: {
        [fetchCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
        },
        [addToCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
        },
        [removeFromCart.fulfilled]: (state, action) => {
            state.cart = action.payload;
        }

    }
})



export default shoppingcartSlice.reducer;




