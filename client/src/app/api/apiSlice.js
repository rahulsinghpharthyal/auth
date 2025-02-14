import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:5000" }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
      url: "/api/auth/signup",
      method: 'POST',
      body: formData})
    }),
    signIn: builder.mutation({
      query: (formData) => ({
      url: "/api/auth/signin",
      method: 'POST',
      credentials: 'include',
      body: formData,
    })
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = api;
