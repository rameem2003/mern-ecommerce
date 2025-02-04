import React from "react";
import Container from "./../components/common/Container";
import Flex from "../components/common/Flex";
import AllproductsDisplay from "../components/screens/shop/AllproductsDisplay";

const Shop = () => {
  return (
    <main className="pb-[140px] pt-[60px]">
      <Container>
        <Flex className="gap-10">
          <section className="w-4/12">
            <div className="rounded-md p-10 shadow-md">
              <h2 className="mb-5 text-xl font-bold">All Categories</h2>

              <div>
                <ul>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                  <li className="mb-1 cursor-pointer select-none text-[18px] font-normal hover:text-primaryRed">
                    Laptop (50)
                  </li>
                </ul>
              </div>
            </div>
          </section>

          <section className="w-8/12">
            <AllproductsDisplay />
          </section>
        </Flex>
      </Container>
    </main>
  );
};

export default Shop;
