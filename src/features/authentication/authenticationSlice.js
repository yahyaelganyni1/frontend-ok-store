import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: JSON.parse(localStorage.getItem('user')),
}

const api_url = 'http://localhost:3000/users';

export const signup = createAsyncThunk(
    'authentication/signup',
    async (user) => {
        const response = await axios.post(api_url, user);

        console.log(response);

        return response.data;
    }
)


export const login = createAsyncThunk(
    'authentication/login',
    async (user) => {
        const response = await axios.post(`${api_url}/sign_in`, user);

        console.log(response);

        return response.data;
    }
)


export const logout = createAsyncThunk(
    'authentication/logout',
    async () => {
        const response = await axios.delete(`${api_url}/sign_out`);

        console.log(response);

        return response.data;
    }
)

const singleUserApi = 'http://localhost:3000/member-data';

export const fetchUser = createAsyncThunk(
    'authentication/fetchUser',
    async () => {
        const response = await axios.get(singleUserApi);

        console.log(response);

        return response.data;
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