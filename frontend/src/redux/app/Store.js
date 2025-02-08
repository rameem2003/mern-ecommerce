import { configureStore } from "@reduxjs/toolkit";
import ProductsSlice from "../featurer/ProductsSlice";
import AccountSlice from "../featurer/AccountSlice";
import CategorySlice from "../featurer/CategorySlice";
import BannerSlice from "../featurer/BannerSlice";

export default configureStore({
  reducer: {
    banners: BannerSlice,
    category: CategorySlice,
    allproducts: ProductsSlice,
    account: AccountSlice,
  },
});
