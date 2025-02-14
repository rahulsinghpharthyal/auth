import { configureStore } from "@reduxjs/toolkit";
import apiSlice from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';

const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), apiSlice.middleware],
})

console.log('Initial state:', store.getState());
export default store;