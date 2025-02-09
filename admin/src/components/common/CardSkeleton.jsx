import React from "react";
import Flex from "./Flex";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

const CardSkeleton = () => {
  return (
    <div>
      <SkeletonTheme>
        <Flex className="hidden w-full justify-between gap-5 lg:flex">
          <div className="w-[25%]">
            <Skeleton inline={true} className="h-[300px]" />
          </div>
          <div className="w-[25%]">
            <Skeleton inline={true} className="h-[300px]" />
          </div>
          <div className="w-[25%]">
            <Skeleton inline={true} className="h-[300px]" />
          </div>
          <div className="w-[25%]">
            <Skeleton inline={true} className="h-[300px]" />
          </div>
        </Flex>

        <Flex className="flex lg:hidden">
          <Skeleton className="h-[280px] w-full" />
        </Flex>
      </SkeletonTheme>
    </div>
  );
};

export default CardSkeleton;
