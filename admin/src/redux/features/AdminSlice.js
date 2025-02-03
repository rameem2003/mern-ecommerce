import { createSlice } from "@reduxjs/toolkit";

export const AdminSlice = createSlice({
  name: "Admin",
  initialState: {
    admin: localStorage.getItem("mern2308_user")
      ? JSON.parse(localStorage.getItem("mern2308_user"))
      : null,
  },
  reducers: {
    adminLoginReducer: (state, action) => {
      state.admin = action.payload;
      localStorage.setItem("mern2308_user", JSON.stringify(action.payload));
    },

    adminLogoutReducer: (state, action) => {
      localStorage.removeItem("mern2308_user");
    },
  },
});

// Action creators are generated for each case reducer function
export const { adminLoginReducer, adminLogoutReducer } = AdminSlice.actions;

export default AdminSlice.reducer;
