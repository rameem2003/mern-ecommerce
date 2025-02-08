import React, { useState } from "react";
import Container from "../../common/Container";
import Image from "../../common/Image";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Banner = () => {
  const banners = useSelector((state) => state.banners.banners); // get all banners
  const [slide, setSlide] = useState(0);
  // slider settings
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 1,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setSlide(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          transform: "translateY(-50px)",
        }}
      >
        <ul style={{ margin: "0px" }}> {dots} </ul>
      </div>
    ),
    customPaging: (i) => (
      <div
        style={
          i === slide
            ? {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "#DB4444",
                border: "2px solid white",
              }
            : {
                width: "12px",
                height: "12px",
                borderRadius: "100%",
                backgroundColor: "gray",
              }
        }
      >
        {/* {i + 1} */}
      </div>
    ),

    responsive: [
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          dots: false,
        },
      },
    ],
  };

  return (
    <section className="mt-10">
      <Container>
        {banners.length == 0 && (
          <div>
            <Skeleton count={1} className="h-[500px]" />
          </div>
        )}

        <div className="slider-container">
          <Slider {...settings}>
            {banners.map((b, i) => (
              <Image src={b.banner} className="w-full" alt={b.description} />
            ))}
          </Slider>
        </div>
      </Container>
    </section>
  );
};

export default Banner;
