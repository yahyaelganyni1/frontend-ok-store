import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    user: null,
    status: '',
    allUsers: [],
    error: null,
    searchResults: [],
    loading: false,
};



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
        return response.data;
    }
)


const allUsersApi = 'http://localhost:3000/all-users';
export const getAllUsers = createAsyncThunk(
    'authentication/getAllUsers',
    async () => {
        const auth_token = localStorage.getItem('auth_token');
        const response = await axios.get(allUsersApi, {
            headers: {
                'Authorization': auth_token
            }
        });
        return response.data;
    }
)

const updateUserApi = 'http://localhost:3000/update-user-to-seller'

export const upgradeUserToSeller = createAsyncThunk(
    'authentication/upgradeUserToSeller',
    async (user) => {
        const auth_token = localStorage.getItem('auth_token');
        const response = await axios.get(`${updateUserApi}/${user.id}`, {
            headers: {
                'Authorization': auth_token
            }
        });
        return response.data;
    }
)

const updateSellerApi = 'http://localhost:3000/update-seller-to-user'

export const downgradeSellerToUser = createAsyncThunk(
    'authentication/downgradeSellerToUser',
    async (user) => {
        const auth_token = localStorage.getItem('auth_token');
        const response = await axios.get(`${updateSellerApi}/${user.id}`, {
            headers: {
                'Authorization': auth_token
            }
        });
        return response.data;
    }
)

const searchUserApi = 'http://localhost:3000/search'

export const searchUser = createAsyncThunk(
    'authentication/searchUser',
    async (search) => {
        const auth_token = localStorage.getItem('auth_token');
        const response = await axios.get(`${searchUserApi}/${search}`)
        console.log(response.data);
        return response.data;
    }
)




const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
        setUser: (state, action) => {
            state.user = action.payload;
            // state.isLoggedIn = true;
        }
    },
    extraReducers: {
        [signup.pending]: (state, action) => {
            state.status = 'loading';
        },
        [signup.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
            // state.isLoggedIn = action.payload.logged_in;
        },
        [login.pending]: (state, action) => {
            state.status = 'loading';
        },
        [login.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = action.payload;
            // state.isLoggedIn = action.payload.logged_in;
        },
        [logout.pending]: (state, action) => {
            state.status = 'loading';
        },
        [logout.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.user = null;
            // state.isLoggedIn = action.payload;
        },
        [fetchUser.pending]: (state, action) => {
            state.loading = true;
        },
        [fetchUser.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.loading = false;
            state.user = action.payload;
        },
        [getAllUsers.pending]: (state, action) => {
            state.status = 'loading';
        },
        [getAllUsers.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.allUsers = action.payload;
        },
        [upgradeUserToSeller.pending]: (state, action) => {
            state.status = 'loading';
        },
        [upgradeUserToSeller.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.allUsers.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload;
                }
            })
        },
        [downgradeSellerToUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [downgradeSellerToUser.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.allUsers.map(user => {
                if (user.id === action.payload.id) {
                    user = action.payload;
                }
            })
        },
        [searchUser.pending]: (state, action) => {
            state.status = 'loading';
        },
        [searchUser.fulfilled]: (state, action) => {
            state.status = 'idle';
            state.searchResults = action.payload;
        },

    }
},
    // authenticationSlice.reducer
)

export default authenticationSlice.reducer;