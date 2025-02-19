import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { cloudinaryConfig } from "../../config/cloudinary";
import apiSlice from "../../app/api/apiSlice";

const userApiSlice = apiSlice.injectEndpoints({
  endpoints: (builder) => ({
    updateUser: builder.mutation({
      query: ({ formData, id }) => ({
        url: `/api/auth/update/${id}`,
        method: "PATCH",
        body: formData,
      }),
    }),
    deleteUser: builder.mutation({
      query: (id) => ({
        url: `/api/auth/delete/${id}`,
        method: "DELETE",
      }),
    }),
  }),
});

export const { useUpdateUserMutation, useDeleteUserMutation } = userApiSlice;
