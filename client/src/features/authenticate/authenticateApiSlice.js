import apiSlice from "../../app/api/apiSlice";

const authenticateApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    authenticate: builder.query({
      query: () => {
        return "/api/auth/authenticate";
      },
    }),
  }),
});

export const { useAuthenticateQuery } = authenticateApiSlice;
