import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../featurer/ProductsSlice";
import AccountSlice from "../featurer/AccountSlice";

export default configureStore({
  reducer: {
    allproducts: ProductsSlice,
    account: AccountSlice,
  },
});
