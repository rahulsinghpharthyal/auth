import apiSlice from "../../app/api/apiSlice";

export const authSlice = apiSlice.injectEndpoints({
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
    signOut: builder.mutation({
      query: () => ({
        url: "/api/auth/signout",
        method: "POST",
      })
    })
  }),
});

export const { useSignUpMutation, useSignInMutation, useOAuthMutation, useSignOutMutation} = authSlice;
