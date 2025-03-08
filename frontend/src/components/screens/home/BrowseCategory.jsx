import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Slider from "react-slick";
import Image from "../../common/Image";
import Flex from "../../common/Flex";
import CategorySkeleton from "../../common/CategorySkeleton";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Link } from "react-router-dom";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { useSelector } from "react-redux";

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

const BrowseCategory = () => {
  const categories = useSelector((state) => state.category.category);
  const settings = {
    dots: false,
    // arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
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
          slidesToShow: 2,
          slidesToScroll: 2,
        },
      },
    ],
  };
  return (
    <section className="mt-[70px]">
      <Container>
        <Title title="Categories" subTitle="Browse By Category" />

        <div className="mt-[60px] border-b-[1px] border-black/30 pb-[70px]">
          <div className="slider-container">
            {categories.length == 0 ? (
              <Flex className="items-center justify-between">
                {Array.from({ length: 6 }).map((item, i) => (
                  <CategorySkeleton className="w-[15%]" />
                ))}
              </Flex>
            ) : (
              <Slider {...settings}>
                {categories.map((cat, i) => (
                  <div>
                    <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                      {/* <CiMobile4 className="text-[56px] text-black group-hover:text-white" /> */}
                      <Image
                        src={cat.thumb}
                        className="h-[50px] w-[50px]"
                        alt={cat.name}
                      />
                      <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                        <Link to={`/category/${cat._id}`}>{cat.name}</Link>
                      </h2>
                    </div>
                  </div>
                ))}
              </Slider>
            )}
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseCategory;
