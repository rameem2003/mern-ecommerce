import React from "react";
import Flex from "../components/common/Flex";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router";
import Header from "../components/common/Header";

const Rootlayout = () => {
  return (
    <Flex className="">
      <Sidebar />
      <div className="w-[80%]  max-h-screen overflow-y-scroll">
        <Header />
        <Outlet />
      </div>
    </Flex>
  );
};

export default Rootlayout;
