import { configureStore } from "@reduxjs/toolkit";

// apiSlice:-
import apiSlice from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import uploadImageApiSlice from "../features/user/uploadImageApiSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [uploadImageApiSlice.reducerPath]: uploadImageApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), apiSlice.middleware, uploadImageApiSlice.middleware],
})

export default store;