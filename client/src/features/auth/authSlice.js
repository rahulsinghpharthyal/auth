import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setCredentials: (state, action) => {
      console.log('this is action', action)
      const {accessToken, ...userData} = action.payload;
      state.user = {...userData};
      state.accessToken = accessToken;
    },
    logOut: (state) => {
      state.user = null,
      state.accessToken = null
    }
  },
});

export const { setCredentials, logOut } = authSlice.actions;

export const selectCurrentUser = (state) =>  state.auth.user;
export const selectAccessToken =(state) => state.auth.accessToken;
export default authSlice.reducer;
