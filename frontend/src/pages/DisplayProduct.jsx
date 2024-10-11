import React from "react";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import StarRating from "../components/common/StarRating";
import ItemCardProtrait from "../components/common/ItemCardProtrait";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import ProductImagePreview from "../components/screens/product_display/ProductImagePreview";

const DisplayProduct = () => {
  // react slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
  };
  return (
    <main className="py-[80px]">
      <Container>
        <Flex className="gap-[70px]">
          {/* product image display */}

          <div className="w-7/12">
            <ProductImagePreview />
          </div>
          {/* descriptions */}
          <div className="w-5/12">
            <h1 className="mb-4 text-[24px] font-semibold text-black">
              Havic HV G-92 Gamepad
            </h1>
            <Flex className="items-center gap-2">
              <StarRating rating={5} />

              <span className="text-[14px] font-normal text-black/50">
                (150 Reviews)
              </span>
              <span className="text-[14px] font-normal text-[#00FF66]">
                In Stock
              </span>
            </Flex>

            <h3 className="mt-4 text-[24px] font-normal text-black">$192.00</h3>

            <p className="border-b-[1px] border-black py-6 font-normal text-black">
              PlayStation 5 Controller Skin High quality vinyl with air channel
              adhesive for easy bubble free install & mess free removal Pressure
              sensitive.
            </p>

            <Flex className="mb-6 mt-6 items-center gap-6">
              <p className="text-[20px] font-normal text-black">Colours:</p>

              <Flex className="gap-2">
                <div className="h-[20px] w-[20px] rounded-full bg-blue-700"></div>
                <div className="h-[20px] w-[20px] rounded-full bg-green-700"></div>
              </Flex>
            </Flex>

            <Flex className="mb-6 mt-6 items-center gap-6">
              <p className="text-[20px] font-normal text-black">Size:</p>

              <Flex className="gap-4">
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
                <button className="rounded-[4px] border-[1px] border-black p-[7px] text-[14px] font-medium text-black hover:border-transparent hover:bg-primaryRed hover:text-white">
                  XL
                </button>
              </Flex>
            </Flex>

            <Flex className="gap-5">
              <Flex className="rounded-[4px] border-[1px] border-black">
                <button className="px-4 py-[10px] text-[20px] font-medium text-black hover:bg-primaryRed hover:text-white">
                  -
                </button>
                <button className="border-l-[1px] border-r-[1px] border-black px-[34px] py-[10px] text-[20px] font-medium text-black">
                  2
                </button>
                <button className="px-4 py-[10px] text-[20px] font-medium text-black hover:bg-primaryRed hover:text-white">
                  +
                </button>
              </Flex>

              <button className="rounded-[4px] bg-primaryRed px-12 py-[10px] text-[16px] font-medium text-white">
                Buy Now
              </button>
              <button className="rounded-[4px] border-[1px] border-black p-1 text-[32px] font-medium text-black">
                <IoIosHeartEmpty />
              </button>
            </Flex>

            <div className="mt-10 rounded-[4px] border-[1px] border-black/50">
              <Flex className="gap-4 px-4 py-6">
                <FaTruckFast className="text-[40px]" />

                <div>
                  <h2 className="text-[16px] font-medium text-black">
                    Free Delivery
                  </h2>

                  <p className="text-[12px] font-medium text-black">
                    Enter your postal code for Delivery Availability
                  </p>
                </div>
              </Flex>

              <div className="mt-4 h-[1px] w-full bg-black/50"></div>

              <Flex className="gap-4 px-4 py-6">
                <TfiReload className="text-[40px]" />

                <div>
                  <h2 className="text-[16px] font-medium text-black">
                    Return Delivery
                  </h2>

                  <p className="text-[12px] font-medium text-black">
                    Free 30 Days Delivery Returns. Details
                  </p>
                </div>
              </Flex>
            </div>
          </div>
        </Flex>

        {/* related section */}
        <section className="mt-[140px]">
          <Flex className="items-center gap-4">
            <div className="h-[40px] w-[20px] rounded-[4px] bg-primaryRed"></div>
            <h1 className="text-[16px] font-semibold text-primaryRed">
              Related Item
            </h1>
          </Flex>

          <div className="mt-[31px]">
            <div className="slider-container">
              <Slider {...settings}>
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={false} />
              </Slider>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default DisplayProduct;
