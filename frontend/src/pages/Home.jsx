import React from "react";
import Banner from "../components/screens/home/Banner";
import ItemCardProtrait from "../components/common/ItemCardProtrait";
import Container from "../components/common/Container";
import FlashSells from "../components/screens/home/FlashSells";

const Home = () => {
  return (
    <main>
      <Banner />
      <FlashSells />
    </main>
  );
};

export default Home;
