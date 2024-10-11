import React from "react";
import Flex from "../../common/Flex";
import Image from "../../common/Image";
import { productImages } from "../../../data";

const ProductImagePreview = () => {
  return (
    <Flex>
      <div className="w-4/12">
        <Flex className="flex-col gap-4">
          {productImages.map((data, i) => (
            <Image src={data} className="mx-auto h-[138px] w-[170px]" />
          ))}
        </Flex>
      </div>
      <div className="w-8/12 bg-blue-600">
        <Image src={productImages[0]} className="h-full w-full object-cover" />
      </div>
    </Flex>
  );
};

export default ProductImagePreview;
