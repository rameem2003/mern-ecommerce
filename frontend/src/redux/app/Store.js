import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../featurer/ProductsSlice";
import AccountSlice from "../featurer/AccountSlice";
import CategorySlice from "../featurer/CategorySlice";

export default configureStore({
  reducer: {
    category: CategorySlice,
    allproducts: ProductsSlice,
    account: AccountSlice,
  },
});
