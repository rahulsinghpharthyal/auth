import { configureStore } from "@reduxjs/toolkit";

// apiSlice:-
import apiSlice from "./api/apiSlice";
import authReducer from '../features/auth/authSlice';
import userApiSlice from "../features/user/userApiSlice";


const store = configureStore({
    reducer: {
        auth: authReducer,
        [apiSlice.reducerPath]: apiSlice.reducer,
        [userApiSlice.reducerPath]: userApiSlice.reducer,
    },
    middleware: (getDefaultMiddleware)=>[...getDefaultMiddleware(), apiSlice.middleware, userApiSlice.middleware],
})

export default store;