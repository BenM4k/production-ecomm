import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        message: null
    },
    reducers: {
        setMessage: (state, action) => {
            state.message = action.payload;
        },
        setCredentials: (state, action) => {
            const { user, token } = action.payload;
            state.user = user;
            state.token = token;
        },
        logOut: (state) => {
            state.user = null;
            state.token = null;
            state.message = null;
            Cookies.remove('jwt');
        }
    }
});

export const { setCredentials, setMessage, logOut } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (store) => store.auth.user;
export const selectCurrentToken = (store) => store.auth.token;
export const selectCurrentMessage = (store) => store.auth.message;
