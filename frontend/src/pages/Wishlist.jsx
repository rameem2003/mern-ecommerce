import React from "react";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import ItemCardProtrait from "../components/common/ItemCardProtrait";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Wishlist = () => {
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
        <section>
          <Flex className="items-center justify-between">
            <p className="text-[20px] font-normal text-black">Wishlist (4)</p>

            <button className="rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium">
              Move All To Bag
            </button>
          </Flex>

          <div className="mt-[31px]">
            <div className="slider-container">
              <Slider {...settings}>
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
                <ItemCardProtrait className="mx-auto w-[90%]" isWish={true} />
              </Slider>
            </div>
          </div>
        </section>

        <section className="mt-[80px]">
          <Flex className="items-center justify-between">
            <Flex className="items-center gap-4">
              <div className="h-[40px] w-[20px] rounded-[4px] bg-primaryRed"></div>
              <h1 className="text-[20px] font-normal text-black">
                Just For You
              </h1>
            </Flex>

            <button className="rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium">
              See All
            </button>
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

export default Wishlist;
