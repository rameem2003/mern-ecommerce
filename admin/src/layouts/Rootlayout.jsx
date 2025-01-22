import React from "react";
import Flex from "../components/common/Flex";
import Sidebar from "../components/common/Sidebar";
import { Outlet } from "react-router";

const Rootlayout = () => {
  return (
    <Flex className="gap-5">
      <Sidebar />
      <Outlet />
    </Flex>
  );
};

export default Rootlayout;
