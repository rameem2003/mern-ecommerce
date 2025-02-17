import React, { useEffect, useState } from "react";
import Container from "./../components/common/Container";
import Flex from "../components/common/Flex";
import AllproductsDisplay from "../components/screens/shop/AllproductsDisplay";
import { useSelector } from "react-redux";

const Shop = () => {
  const [range, setRange] = useState(500000);
  const categories = useSelector((state) => state.category.category); // get all categories
  const allProducts = useSelector((state) => state.allproducts.products); // get all products
  const [filter, setFilter] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);

  // function for filter products by price and category
  const filterProducts = (price, category) => {
    let filteredProduct = allProducts.filter(
      (item) => item.sellingPrice > 0 && item.sellingPrice <= price,
    );
    if (category) {
      filteredProduct = filteredProduct.filter(
        (item) => item.category.name == category,
      );
    }
    setFilter(filteredProduct);
  };

  // handleFilter Price
  const handleFilter = (e) => {
    setRange(e.target.value);
    filterProducts(range, selectedCategory);
  };

  // handleCategoryFilter
  const handleCategoryFilter = (cat) => {
    setSelectedCategory(cat);
    filterProducts(range, cat);
  };

  useEffect(() => {
    setFilter(allProducts);
  }, [allProducts]);

  return (
    <main className="pb-[140px] pt-[60px]">
      <Container>
        <Flex className="gap-10">
          <section className="w-4/12">
            <div className="rounded-md p-10 shadow-md">
              <h2 className="mb-5 text-xl font-bold">All Categories</h2>

              <div>
                <ul>
                  {categories.map((data, i) => (
                    <li
                      onClick={() => handleCategoryFilter(data.name)}
                      key={i}
                      className={`${data.name == selectedCategory ? "font-bold text-red-500" : ""} mb-1 cursor-pointer select-none text-[18px] hover:font-semibold hover:text-primaryRed`}
                    >
                      {data.name} ({data.products.length})
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-5 rounded-md p-10 shadow-md">
              <h2 className="mb-5 text-xl font-bold">Price</h2>

              <div className="mt-2">
                <input
                  onChange={handleFilter}
                  type="range"
                  className="custom-range w-full cursor-pointer appearance-none rounded-lg bg-gray-200"
                  min={0}
                  max={500000}
                  defaultValue={range}
                  name=""
                  id=""
                />
              </div>

              <Flex className="mt-1 items-center justify-between">
                <span className="font-semibold text-primaryRed">BDT 0</span>
                <span className="font-semibold text-primaryRed">
                  BDT {range}
                </span>
              </Flex>
            </div>
          </section>

          <section className="w-8/12">
            <AllproductsDisplay products={filter} />
          </section>
        </Flex>
      </Container>
    </main>
  );
};

export default Shop;
