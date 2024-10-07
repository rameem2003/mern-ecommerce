import React from "react";
import Container from "./../common/Container";
import Flex from "./../common/Flex";

const Header = () => {
  return (
    <header className="bg-black p-3">
      <Container>
        <Flex className="items-center justify-center">
          <div className="w-2/12"></div>
          <div className="w-6/12">
            <p className="text-whiteShadeThree text-[14px] font-normal">
              Summer Sale For All Swim Suits And Free Express Delivery - OFF
              50%!{" "}
              <a href="http://" target="_blank" className="font-semibold">
                ShopNow
              </a>
            </p>
          </div>
          <div className="w-2/12">
            <select
              className="text-whiteShadeThree ml-auto block bg-transparent text-[14px]"
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
