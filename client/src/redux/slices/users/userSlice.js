import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        token: null,
        message: null,
        cart: []
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
        },
        addToCart: (state, action) => {
            const isDuplicate = state.cart.some(element => element?.id === action.payload.id);
            if (isDuplicate) return;
            const item = {
                ...action.payload,
                itemCount: 1
            }
            state.cart.push(item);
        },
        removeToCart: (state, action) => {
            state.cart = state.cart.filter((item) => item.id !== action.payload.id)
        },
        itemCountPlus: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            item.itemCount += 1;
        },
        itemCountMinus: (state, action) => {
            const item = state.cart.find((item) => item.id === action.payload.id);
            if (item.itemCount === 1) return;
            item.itemCount -= 1;
        },
        clearCart: (state) => {
            state.cart = [];
        }
    }
});

export const {
    setCredentials,
    setMessage,
    logOut,
    addToCart,
    removeToCart,
    itemCountPlus,
    itemCountMinus,
    clearCart
} = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentUser = (store) => store.auth.user;
export const selectCurrentToken = (store) => store.auth.token;
export const selectCurrentMessage = (store) => store.auth.message;
export const selectCart = (store) => store.auth.cart;
