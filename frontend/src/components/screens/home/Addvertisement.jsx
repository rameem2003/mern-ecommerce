import React from "react";
import Image from "../../common/Image";
import add from "../../../assets/add.png";
import Container from "../../common/Container";

const Addvertisement = () => {
  return (
    <section className="mt-[140px]">
      <Container>
        <Image src={add} alt="add" className="w-full" />
      </Container>
    </section>
  );
};

export default Addvertisement;
