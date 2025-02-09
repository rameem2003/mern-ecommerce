import { createSlice } from "@reduxjs/toolkit";

export const AccountSlice = createSlice({
  name: "Account",
  initialState: {
    account: localStorage.getItem("mern-frontend")
      ? JSON.parse(localStorage.getItem("mern-frontend"))
      : "",
  },
  reducers: {
    AccountReducer: (state, action) => {
      state.account = action.payload;
      localStorage.setItem("mern-frontend", JSON.stringify(action.payload));
    },
  },
});

// Action creators are generated for each case reducer function
export const { AccountReducer } = AccountSlice.actions;

export default AccountSlice.reducer;
