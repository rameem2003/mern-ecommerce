import React, { useState } from "react";
import { productImages } from "../../../data";
import Flex from "../../common/Flex";
import Image from "../../common/Image";

const ProductImagePreview = () => {
  // states for display product image
  const [img, setImg] = useState(0);
  return (
    <Flex>
      <div className="w-4/12">
        <Flex className="flex-col gap-4">
          {productImages.map((data, i) => (
            <Image
              key={i}
              onClick={() => setImg(i)}
              src={data}
              className="mx-auto h-[138px] w-[170px] cursor-pointer"
            />
          ))}
        </Flex>
      </div>
      <div className="w-8/12 bg-blue-600">
        <Image
          src={productImages[img]}
          className="h-full w-full object-cover"
        />
      </div>
    </Flex>
  );
};

export default ProductImagePreview;
