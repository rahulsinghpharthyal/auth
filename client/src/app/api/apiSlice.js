import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// states from redux:-
import { logOut, setCredentials } from "../../features/auth/authSlice";


const baseQuery = fetchBaseQuery({
  baseUrl: "http://localhost:5000",
  credentials: "include",
  prepareHeaders: (headers, {getState}) => {
    // console.log('this is get State',getState())
    const token = getState()?.auth?.accessToken
    if(token){
      headers.set("Authorization", `Bearer ${token}`)
      return 
    }
    return headers;
  }
});



const baseQueryWithReauth = async(args, api, extraOptions) =>{
  let result = await baseQuery(args, api, extraOptions);
  // console.log('this is result', result)
  if (result?.error?.status === 403) {
    const refreshResult = await baseQuery(
      { url: "/api/auth/refresh-token" },
      api,
      extraOptions
    );
    // console.log('this is refreshResult', refreshResult)
    if(refreshResult?.data){
      const {accessToken, userData} = refreshResult.data;
      api.dispatch(
        setCredentials({ accessToken: accessToken, user: userData })
      );
      //retry the original query with new access Token
      result = await baseQuery(args, api, extraOptions);
    } else {
      console.log('this is logout')
      api.dispatch(logOut());
    }
  }
  return result;
  }


// apiSlice for all of the api's using baseQueryWithReauth:-
const apiSlice = createApi({
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}), // Initial empty endpoints
});

export default apiSlice;
