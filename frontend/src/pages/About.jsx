import React, { useState } from "react";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import about from "../assets/about.png";
import abou1 from "../assets/about1.png";
import abou2 from "../assets/about2.png";
import abou3 from "../assets/about3.png";
import abou4 from "../assets/about4.png";
import service1 from "../assets/services1.png";
import service2 from "../assets/services2.png";
import service3 from "../assets/services3.png";
import Image from "./../components/common/Image";
import Member from "../components/common/Member";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const About = () => {
  const [slide, setSlide] = useState(0);
  // slider settings
  const settings = {
    arrows: false,
    dots: true,
    infinite: true,
    speed: 500,
    autoplay: true,
    autoplaySpeed: 3000,
    slidesToShow: 3,
    slidesToScroll: 1,
    beforeChange: (prev, next) => {
      setSlide(next);
    },
    appendDots: (dots) => (
      <div
        style={{
          transform: "translateY(50px)",
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
                border: "2px solid grey",
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
    <main className="py-[80px]">
      <Container>
        <Flex className="mb-[140px] items-center">
          <div className="w-1/2">
            <h1 className="mb-10 text-[54px] font-semibold text-black">
              Our Story
            </h1>

            <p className="w-[525px] text-[16px] font-normal text-black">
              Launced in 2015, Exclusive is South Asia’s premier online shopping
              makterplace with an active presense in Bangladesh. Supported by
              wide range of tailored marketing, data and service solutions,
              Exclusive has 10,500 sallers and 300 brands and serves 3 millioons
              customers across the region
            </p>

            <p className="mt-6 w-[505px] text-[16px] font-normal text-black">
              Exclusive has more than 1 Million products to offer, growing at a
              very fast. Exclusive offers a diverse assotment in categories
              ranging from consumer.
            </p>
          </div>
          <div className="relative w-1/2">
            <Image src={about} alt="about" className="w-full" />
          </div>
        </Flex>

        <Flex className="gap-[30px]">
          <div className="group mx-auto flex w-3/12 cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 p-[30px] hover:bg-primaryRed">
            <Image src={abou1} />
            <h2 className="text-[32px] font-bold text-black group-hover:text-white">
              10.5k
            </h2>

            <p className="mt-3 text-center text-[16px] font-normal text-black group-hover:text-white">
              Sallers active our site
            </p>
          </div>
          <div className="group mx-auto flex w-3/12 cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 p-[30px] hover:bg-primaryRed">
            <Image src={abou2} />
            <h2 className="text-[32px] font-bold text-black group-hover:text-white">
              10.5k
            </h2>

            <p className="mt-3 text-center text-[16px] font-normal text-black group-hover:text-white">
              Sallers active our site
            </p>
          </div>
          <div className="group mx-auto flex w-3/12 cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 p-[30px] hover:bg-primaryRed">
            <Image src={abou3} />
            <h2 className="text-[32px] font-bold text-black group-hover:text-white">
              10.5k
            </h2>

            <p className="mt-3 text-center text-[16px] font-normal text-black group-hover:text-white">
              Sallers active our site
            </p>
          </div>
          <div className="group mx-auto flex w-3/12 cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 p-[30px] hover:bg-primaryRed">
            <Image src={abou4} />
            <h2 className="text-[32px] font-bold text-black group-hover:text-white">
              10.5k
            </h2>

            <p className="mt-3 text-center text-[16px] font-normal text-black group-hover:text-white">
              Sallers active our site
            </p>
          </div>
        </Flex>

        <div className="mt-[31px]">
          <div className="slider-container">
            <Slider {...settings}>
              <Member className="w-[90%]" />
              <Member className="w-[90%]" />
              <Member className="w-[90%]" />
              <Member className="w-[90%]" />
              <Member className="w-[90%]" />
              <Member className="w-[90%]" />
            </Slider>
          </div>
        </div>

        <Flex className="my-[140px] items-center justify-center gap-[88px]">
          <div className="text-center">
            <Image src={service1} className="mx-auto mb-6" alt="service" />
            <h3 className="text-[20px] font-semibold text-black">
              FREE AND FAST DELIVERY
            </h3>
            <p className="mt-2 text-[14px] font-normal text-black">
              Free delivery for all orders over $140
            </p>
          </div>
          <div className="text-center">
            <Image src={service2} className="mx-auto mb-6" alt="service" />
            <h3 className="text-[20px] font-semibold text-black">
              24/7 CUSTOMER SERVICE
            </h3>
            <p className="mt-2 text-[14px] font-normal text-black">
              Friendly 24/7 customer support
            </p>
          </div>
          <div className="text-center">
            <Image src={service3} className="mx-auto mb-6" alt="service" />
            <h3 className="text-[20px] font-semibold text-black">
              MONEY BACK GUARANTEE
            </h3>
            <p className="mt-2 text-[14px] font-normal text-black">
              We reurn money within 30 days
            </p>
          </div>
        </Flex>
      </Container>
    </main>
  );
};

export default About;
