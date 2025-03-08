import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Flex from "../../common/Flex";
import Image from "../../common/Image";
import arr1 from "../../../assets/arraival1.png";
import arr2 from "../../../assets/arraival2.png";
import arr3 from "../../../assets/arraival3.png";
import arr4 from "../../../assets/arraival4.png";
import service1 from "../../../assets/services1.png";
import service2 from "../../../assets/services2.png";
import service3 from "../../../assets/services3.png";

const NewArrivals = () => {
  return (
    <section className="mt-[140px]">
      <Container>
        <Title title="Featured" subTitle="New Arrival" />

        <Flex className="mt-[60px] flex-col gap-[30px] md:flex-row">
          <div className="w-full md:w-1/2">
            <Image src={arr1} alt="arr" />
          </div>
          <div className="w-full md:w-1/2">
            <div>
              <Image src={arr2} alt="arr" />
              <Flex className="mt-4 items-center justify-between gap-2">
                <div className="w-1/2">
                  <Image src={arr3} alt="arr" className="w-full" />
                </div>
                <div className="w-1/2">
                  <Image src={arr4} alt="arr" className="w-full" />
                </div>
              </Flex>
            </div>
          </div>
        </Flex>

        <Flex className="my-[140px] flex-col items-center justify-center gap-[88px] md:flex-row md:flex-wrap">
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
    </section>
  );
};

export default NewArrivals;
