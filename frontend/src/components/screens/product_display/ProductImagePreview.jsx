import React, { useState } from "react";
import Flex from "../../common/Flex";
import Image from "../../common/Image";
import ReactImageZoom from "react-image-zoom";

const ProductImagePreview = ({ data }) => {
  // states for display product image
  const [img, setImg] = useState(0);

  return (
    <Flex className="flex-col lg:flex-row">
      <div className="w-full lg:w-4/12">
        <Flex className="flex-row gap-4 lg:flex-col">
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
      <div className="w-full lg:w-8/12">
        <ReactImageZoom
          {...{
            width: 400,
            height: 400,
            // scale: 0.2,
            // zoomWodth: 500,
            zoomLensStyle: "opacity: 0.2; background-color: red",
            zoomPosition: "bottom",
            img: data.images[img],
          }}
        />

        {/* <Image src={data.images[img]} className="h-full w-full object-cover" /> */}
      </div>
    </Flex>
  );
};

export default ProductImagePreview;
