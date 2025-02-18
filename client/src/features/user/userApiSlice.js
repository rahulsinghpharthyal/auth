  import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
  import { cloudinaryConfig } from "../../config/cloudinary";

  const userApiSlice = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
      baseUrl: "/cloudinary",
  }),
    endpoints: (builder) => ({
      uploadToCloudinary: builder.mutation({
        query: (data) => ({
          url: `/v1_1/${cloudinaryConfig.cloud_name}/image/upload`,
          method: "POST",
          body: data,
        }),
      }),
    }),
  });

  export const { useUploadToCloudinaryMutation } = userApiSlice;
  export default userApiSlice;