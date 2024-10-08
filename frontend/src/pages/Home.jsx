import React from "react";
import Banner from "../components/screens/home/Banner";
import FlashSells from "../components/screens/home/FlashSells";
import BrowseCategory from "../components/screens/home/BrowseCategory";
import BestSelling from "../components/screens/home/BestSelling";
import Addvertisement from "../components/screens/home/Addvertisement";
import Explorer from "../components/screens/home/Explorer";
import NewArrivals from "../components/screens/home/NewArrivals";

const Home = () => {
  return (
    <main>
      <Banner />
      <FlashSells />
      <BrowseCategory />
      <BestSelling />
      <Addvertisement />
      <Explorer />
      <NewArrivals />
    </main>
  );
};

export default Home;
