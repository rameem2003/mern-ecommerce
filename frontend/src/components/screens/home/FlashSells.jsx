import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Title from "../../common/Title";
import Container from "../../common/Container";
import ItemCardProtrait from "../../common/ItemCardProtrait";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useSelector } from "react-redux";
import ProductListSkeleton from "../../common/ProductListSkeleton";
import axios from "axios";

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"before:contents-['']"}
      style={{
        ...style,
        position: "absolute",
        top: "-80px",
        right: "0",
        zIndex: "99999",
        height: "46px",
        width: "46px",
        background: "#F5F5F5",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        color: "white",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <IoIosArrowRoundForward className="text-black" size={25} />
    </div>
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <div
      className={"before:contents-['']"}
      style={{
        ...style,
        position: "absolute",
        top: "-80px",
        right: "50px",
        zIndex: "99999",
        height: "46px",
        width: "46px",
        background: "#F5F5F5",
        borderRadius: "50%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        fontSize: "16px",
        color: "white",
        cursor: "pointer",
      }}
      onClick={onClick}
    >
      <IoIosArrowRoundBack size={25} className="text-black" />
    </div>
  );
}

const FlashSells = () => {
  const [hotSells, setHotSells] = useState([]); // get all hot sell products

  // fetch hot sell products
  const fetchHotSellsProducts = async () => {
    try {
      let res = await axios.get("http://localhost:5000/api/v1/product/hotsell");
      setHotSells(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchHotSellsProducts();
  }, []);

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
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
  return (
    <section className="relative mt-[140px]">
      <Container>
        <div className="border-b-[1px] border-black/30 pb-[60px]">
          <Title title="Today’s" subTitle="Hot Sells" />

          <div className="mt-[31px]">
            {hotSells.length > 0 ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {hotSells.map((p, i) => (
                    <ItemCardProtrait
                      data={p}
                      key={p._id}
                      className="mx-auto w-[90%]"
                    />
                  ))}
                </Slider>
              </div>
            ) : (
              <ProductListSkeleton />
            )}
          </div>

          <div className="mt-[60px] text-center">
            <Link className="inline-block rounded-[4px] bg-primaryRed px-12 py-4 text-center text-[16px] font-medium text-white">
              View All Products
            </Link>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default FlashSells;
