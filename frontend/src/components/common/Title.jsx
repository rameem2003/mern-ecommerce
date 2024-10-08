import React from "react";
import Flex from "./Flex";

const Title = ({ title, subTitle }) => {
  return (
    <div>
      <div>
        <Flex className="items-center gap-4">
          <div className="h-[40px] w-[20px] rounded-[4px] bg-primaryRed"></div>
          <h1 className="text-[16px] font-semibold text-primaryRed">{title}</h1>
        </Flex>

        <h2 className="mt-6 text-[36px] font-semibold text-black">
          {subTitle}
        </h2>
      </div>
    </div>
  );
};

export default Title;
