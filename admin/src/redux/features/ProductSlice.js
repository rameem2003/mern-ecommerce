import { createSlice } from "@reduxjs/toolkit";

export const ProductSlice = createSlice({
  name: "Category",
  initialState: {
    products: [],
  },
  reducers: {
    productReducer: (state, action) => {
      state.products = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { productReducer } = ProductSlice.actions;

export default ProductSlice.reducer;
