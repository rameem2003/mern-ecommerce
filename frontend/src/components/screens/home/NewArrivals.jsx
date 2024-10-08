import React from "react";
import Container from "../../common/Container";
import Title from "../../common/Title";
import Flex from "../../common/Flex";
import arr1 from "../../../assets/arraival1.png";
import arr2 from "../../../assets/arraival2.png";
import arr3 from "../../../assets/arraival3.png";
import arr4 from "../../../assets/arraival4.png";
import Image from "../../common/Image";

const NewArrivals = () => {
  return (
    <section className="mt-[140px]">
      <Container>
        <Title title="Featured" subTitle="New Arrival" />

        <Flex className="mt-[60px] gap-[30px]">
          <div className="w-1/2">
            <Image src={arr1} alt="arr" />
          </div>
          <div className="w-1/2">
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
      </Container>
    </section>
  );
};

export default NewArrivals;
