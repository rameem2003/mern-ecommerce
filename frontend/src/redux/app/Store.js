import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../featurer/ProductsSlice";

export default configureStore({
  reducer: {
    allproducts: ProductsSlice,
  },
});
