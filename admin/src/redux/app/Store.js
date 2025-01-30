import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../features/CategorySlice";
import ProductSlice from "../features/ProductSlice";

export default configureStore({
  reducer: {
    category: CategorySlice,
    products: ProductSlice,
  },
});
