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
        body: formData,
      }),
    }),
    oAuth: builder.mutation({
      query: (data) => ({
        url: "/api/auth/google",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useOAuthMutation} = api;
