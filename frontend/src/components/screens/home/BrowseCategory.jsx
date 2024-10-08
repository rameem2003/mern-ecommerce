import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";
import { CiMobile4, CiCamera } from "react-icons/ci";
import { LuMonitor } from "react-icons/lu";
import { CgAppleWatch } from "react-icons/cg";
import { FiHeadphones } from "react-icons/fi";

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
  const settings = {
    dots: false,
    // arrows: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 6,
    prevArrow: <SamplePrevArrow />,
    nextArrow: <SampleNextArrow />,
  };
  return (
    <section className="mt-[70px]">
      <Container>
        <Title title="Categories" subTitle="Browse By Category" />

        <div className="mt-[60px] border-b-[1px] border-black/30 pb-[70px]">
          <div className="slider-container">
            <Slider {...settings}>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CiMobile4 className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Phone
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <LuMonitor className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Computer
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CgAppleWatch className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Smart Phone
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CiCamera className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Camera
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <FiHeadphones className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Headphones
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CiMobile4 className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Phone
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CiMobile4 className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Phone
                  </h2>
                </div>
              </div>
              <div>
                <div className="group mx-auto flex h-[145px] w-[80%] cursor-pointer flex-col items-center justify-center gap-4 rounded-[4px] border-[1px] border-black/30 hover:bg-primaryRed">
                  <CiMobile4 className="text-[56px] text-black group-hover:text-white" />
                  <h2 className="text-[16px] font-normal text-black group-hover:text-white">
                    Phone
                  </h2>
                </div>
              </div>
            </Slider>
          </div>
        </div>
      </Container>
    </section>
  );
};

export default BrowseCategory;
