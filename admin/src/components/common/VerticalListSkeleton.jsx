import React from "react";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const VerticalListSkeleton = () => {
  return (
    <div className=" w-full mb-1">
      <Skeleton count={1} className="w-full h-[20px]" />
    </div>
  );
};

export default VerticalListSkeleton;
