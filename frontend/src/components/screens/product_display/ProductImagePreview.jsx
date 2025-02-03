import React, { useState } from "react";
import Flex from "../../common/Flex";
import Image from "../../common/Image";

const ProductImagePreview = ({ data }) => {
  // states for display product image
  const [img, setImg] = useState(0);

  return (
    <Flex>
      <div className="w-4/12">
        <Flex className="flex-col gap-4">
          {data?.images?.map((img, i) => (
            <Image
              key={i}
              onClick={() => setImg(i)}
              src={img}
              className="mx-auto h-[138px] w-[170px] cursor-pointer"
            />
          ))}
        </Flex>
      </div>
      {data.images && (
        <div className="w-8/12 bg-blue-600">
          <Image
            src={data.images[img]}
            className="h-full w-full object-cover"
          />
        </div>
      )}
    </Flex>
  );
};

export default ProductImagePreview;
