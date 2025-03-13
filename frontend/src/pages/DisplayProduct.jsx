import React, { useEffect, useState } from "react";
import axios from "axios";
import { productSize } from "../data";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import StarRating from "../components/common/StarRating";
import ItemCardProtrait from "../components/common/ItemCardProtrait";
import ProductImagePreview from "../components/screens/product_display/ProductImagePreview";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosHeartEmpty } from "react-icons/io";
import { FaTruckFast } from "react-icons/fa6";
import { TfiReload } from "react-icons/tfi";
import { useParams } from "react-router-dom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const DisplayProduct = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null); // set the product
  const [relatedProduct, setRelatedProduct] = useState([]); // set the related product
  const [selected, setSelected] = useState(null); // state for select button indicator
  const [size, setSize] = useState(""); // state for store the product size
  console.log(relatedProduct);

  // react slick settings
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    arrows: false,

    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 4,
          slidesToScroll: 4,
          infinite: true,
          dots: true,
        },
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };

  /**
   * fetch related product
   */
  const fetchRelatedProduct = async (id) => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/category/single/${id}`,
      );
      setRelatedProduct(res.data.data.products);
    } catch (error) {
      console.log(error);
    }
  };

  /**
   * fetch single product
   */
  const fetchSingleProduct = async () => {
    let res = await axios.get(
      `http://localhost:5000/api/v1/product/single/${id}`,
    );

    setProduct(res.data.data);

    fetchRelatedProduct(res.data.data.category);
  };

  useEffect(() => {
    fetchSingleProduct();
    // fetchRelatedProduct();
  }, [id]);

  return (
    <main className="py-[80px]">
      <Container>
        <Flex className="flex-col gap-[40px] lg:flex-row">
          {/* product image display */}

          <div className="w-full lg:w-7/12">
            {product ? (
              <ProductImagePreview data={product} />
            ) : (
              <Flex className="justify-between gap-5">
                <div className="w-3/12">
                  <Skeleton count={3} className="h-[150px]" />
                </div>

                <div className="w-9/12">
                  <Skeleton count={1} className="h-full" />
                </div>
              </Flex>
            )}
          </div>
          {/* descriptions */}
          {product ? (
            <div className="w-full lg:w-5/12">
              <h1 className="mb-4 text-[24px] font-semibold text-black">
                {product.name}
              </h1>
              <Flex className="items-center gap-2">
                <StarRating rating={5} />

                <span className="text-[14px] font-normal text-black/50">
                  (150 Reviews)
                </span>
                <span className="text-[14px] font-normal text-[#00FF66]">
                  {product.stock} In Stock
                </span>
              </Flex>

              <span className="mt-4 inline-block text-[24px] font-normal text-black">
                ৳ {product.discountPrice}
              </span>
              <del className="ml-4 mt-4 inline-block text-[18px] font-normal text-gray-500">
                ৳ {product.sellingPrice}
              </del>

              <p className="border-b-[1px] border-black py-6 font-normal text-black">
                {product.description}
              </p>

              <Flex className="mb-6 mt-6 hidden items-center gap-6">
                <p className="text-[20px] font-normal text-black">Colours:</p>

                <Flex className="gap-2">
                  <div className="h-[20px] w-[20px] rounded-full bg-blue-700"></div>
                  <div className="h-[20px] w-[20px] rounded-full bg-green-700"></div>
                </Flex>
              </Flex>

              <Flex className="mb-6 mt-6 hidden items-center gap-6">
                <p className="text-[20px] font-normal text-black">Size:</p>

                <Flex className="gap-4">
                  {productSize.map((data, i) => (
                    <button
                      key={i}
                      onClick={() => {
                        setSelected(i);
                        setSize(data);
                      }}
                      className={`rounded-[4px] ${selected == i ? "border-transparent bg-primaryRed text-white" : "border-[1px] border-black"} px-3 py-[6px] text-[14px] font-medium uppercase text-black`}
                    >
                      {data}
                    </button>
                  ))}
                </Flex>
              </Flex>

              <Flex className="mt-2 items-center gap-5">
                <Flex className="hidden justify-between rounded-[4px] border-[1px] border-black">
                  <button className="px-4 py-[10px] text-center text-[20px] font-medium text-black hover:bg-primaryRed hover:text-white">
                    -
                  </button>
                  <button className="border-l-[1px] border-r-[1px] border-black px-[34px] py-[10px] text-center text-[20px] font-medium text-black">
                    2
                  </button>
                  <button className="px-4 py-[10px] text-center text-[20px] font-medium text-black hover:bg-primaryRed hover:text-white">
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
          ) : (
            <div className="w-5/12">
              <Skeleton count={1} className="h-[40px]" />
              <Skeleton count={1} className="h-[150px]" />
              <Skeleton count={1} className="h-[500px]" />
            </div>
          )}
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
                {relatedProduct.map((data, i) => (
                  <ItemCardProtrait
                    key={i}
                    data={data}
                    className="mx-auto w-[90%]"
                    isWish={false}
                  />
                ))}
              </Slider>
            </div>
          </div>
        </section>
      </Container>
    </main>
  );
};

export default DisplayProduct;
