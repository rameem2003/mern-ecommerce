import { configureStore } from "@reduxjs/toolkit";
import CategorySlice from "../features/CategorySlice";
import ProductSlice from "../features/ProductSlice";
import AdminSlice from "../features/AdminSlice";

export default configureStore({
  reducer: {
    admin: AdminSlice,
    category: CategorySlice,
    products: ProductSlice,
  },
});
