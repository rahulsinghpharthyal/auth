import { configureStore } from "@reduxjs/toolkit";

// apiSlice:-
import apiSlice from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), apiSlice.middleware],
})

export default store;