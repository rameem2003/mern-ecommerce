import React, { useEffect } from "react";
import Container from "./../common/Container";
import Flex from "./../common/Flex";
import { useDispatch } from "react-redux";
import axios from "axios";
import { allProducts } from "../../redux/featurer/ProductsSlice";
import { CategoryReducer } from "../../redux/featurer/CategorySlice";
import { BannerReducer } from "../../redux/featurer/BannerSlice";

const Header = () => {
  const dispatch = useDispatch();

  /**
   * Fetch Banners
   */
  const fetchBanners = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/banner/all");
    dispatch(BannerReducer(res.data.data));
  };

  /**
   * Fetch all products
   */
  const fetchProducts = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/product/all");
    dispatch(allProducts(res.data.data));
  };

  /**
   * Fetch all categories
   */
  const fetchCategories = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/category/all");
    dispatch(CategoryReducer(res.data.data));
  };

  useEffect(() => {
    fetchBanners();
    fetchProducts();
    fetchCategories();
  }, []);

  return (
    <header className="bg-black p-3">
      <Container>
        <Flex className="items-center justify-between md:justify-center">
          <div className="hidden md:block md:w-2/12"></div>
          <div className="w-1/2 md:w-6/12">
            <p className="text-xs font-normal text-whiteShadeThree md:text-[14px]">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!{" "}
              <a href="http://" target="_blank" className="font-semibold">
                ShopNow
              </a>
            </p>
          </div>
          <div className="w-1/2 md:w-2/12">
            <select
              className="ml-auto block bg-transparent text-[14px] text-whiteShadeThree"
              name=""
              id=""
            >
              <option value="">English</option>
            </select>
          </div>
        </Flex>
      </Container>
    </header>
  );
};

export default Header;
