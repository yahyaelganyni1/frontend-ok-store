import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,

}

const api_url = 'http://localhost:3000/users';

export const signup = createAsyncThunk(
    'authentication/signup',
    async (user) => {
        const response = await axios.post(api_url, user);
        const auth_token = response.headers.authorization;
        if (auth_token) {
            localStorage.setItem('auth_token', auth_token);
        }
        // localStorage.setItem('auth_token', auth_token);
        console.log(auth_token);

        return response.data;
    }
)


export const login = createAsyncThunk(
    'authentication/login',
    async (user) => {
        const response = await axios.post(`${api_url}/sign_in`, user);
        const auth_token = response.headers.authorization;
        localStorage.setItem('auth_token', auth_token);
        return response.data;
    }
)


export const logout = createAsyncThunk(
    'authentication/logout',
    async () => {
        const token = localStorage.getItem('auth_token');
        const response = await axios.delete(`${api_url}/sign_out`, {
            headers: {
                Authorization: token,
            },
        });
        localStorage.removeItem('auth_token');
        return response.data;
    }
)

const singleUserApi = 'http://localhost:3000/member-data';

export const fetchUser = createAsyncThunk(
    'authentication/fetchUser',
    async () => {
        const auth_token = localStorage.getItem('auth_token');
        const response = await axios.get(singleUserApi, {
            headers: {
                'Authorization': auth_token
            }
        });
        console.log(response.data);
        return response.data;
    }
)

export const isLoggedIn = createAsyncThunk(
    'authentication/isLoggedIn',
    async () => {
        const response = await axios.get(singleUserApi);
        const isLoggedIn = response.data.logged_in;
        console.log(isLoggedIn);
        return response.data.logged_in
    }
)

const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
        }
    },
    extraReducers: {
        [signup.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signup.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        },
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        },
        [logout.pending]: (state, action) => {
            state.status = 'loading';
        },
        [logout.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = null;
        },
        [fetchUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
        }
    }
},
    // authenticationSlice.reducer
)

export default authenticationSlice.reducer;