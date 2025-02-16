import apiSlice from "../../app/api/apiSlice";

export const api = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (formData) => ({
        url: "/api/auth/signup",
        method: "POST",
        body: formData,
      }),
    }),
    signIn: builder.mutation({
      query: (formData) => ({
        url: "/api/auth/signin",
        method: "POST",
        credentials: "include",
        body: formData,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation } = api;
