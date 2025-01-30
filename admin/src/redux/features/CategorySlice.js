import { createSlice } from "@reduxjs/toolkit";

export const CategorySlice = createSlice({
  name: "Category",
  initialState: {
    categories: [],
  },
  reducers: {
    categoryReducer: (state, action) => {
      state.categories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { categoryReducer } = CategorySlice.actions;

export default CategorySlice.reducer;
