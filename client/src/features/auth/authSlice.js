import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  accessToken: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action) => {
      console.log("this is action", action);
      state.user = action.payload;
    },
  },
});

export const { login } = authSlice.actions;
export default authSlice.reducer;
