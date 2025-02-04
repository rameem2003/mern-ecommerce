import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import ItemCardProtrait from "../../common/ItemCardProtrait";
import Slider from "react-slick";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import ProductListSkeleton from "../../common/ProductListSkeleton";

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

const Explorer = () => {
  const allProducts = useSelector((state) => state.allproducts.products);
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    rows: 2,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  return (
    <section className="mt-[70px]">
      <Container>
        <div>
          <Title title="Our Products" subTitle="Explore Our Products" />

          <div className="mt-[31px]">
            {allProducts.length > 0 ? (
              <div className="slider-container">
                <Slider {...settings}>
                  {allProducts.map((p, i) => (
                    <div className="mb-[60px]">
                      <ItemCardProtrait
                        data={p}
                        key={p._id}
                        className="mx-auto w-[90%]"
                      />
                    </div>
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

export default Explorer;
