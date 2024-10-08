import React from "react";
import { useLocation } from "react-router-dom";
import Image from "./Image";
import items from "../../assets/item.png";
import Flex from "./Flex";
import StarRating from "./StarRating";
import { FaRegHeart } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

const ItemCardProtrait = ({ className, data, isWish }) => {
  const location = useLocation();

  console.log(location.pathname);

  return (
    <div className={`${className} `}>
      <div className="group relative overflow-hidden rounded-[4px] bg-whiteShadeOne px-10 py-[50px]">
        <Image src={items} className="w-full" alt="iten" />

        <span className="absolute left-4 top-4 rounded-[4px] bg-primaryRed px-3 py-1 text-[12px] font-normal text-white">
          -40%
        </span>

        <div className="absolute right-3 top-3">
          {isWish ? (
            <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
              <IoTrash className="text-[16px] text-black" />
            </div>
          ) : (
            <>
              <div className="flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
                <FaRegHeart className="text-[16px] text-black" />
              </div>
              <div className="mt-2 flex h-[34px] w-[34px] items-center justify-center rounded-full bg-white">
                <IoMdEye className="text-[16px] text-black" />
              </div>
            </>
          )}
        </div>
        <button className="absolute bottom-[-120px] left-0 w-full bg-black py-4 text-[16px] font-medium text-white duration-200 ease-in-out group-hover:bottom-0">
          Add To Cart
        </button>
      </div>

      <div className="mt-4">
        <h2 className="text-[16px] font-medium text-black">
          HAVIT HV-G92 Gamepad
        </h2>

        <Flex className="mt-2 gap-3">
          <span className="text-[16px] font-medium text-primaryRed">$120</span>
          <del className="text-[16px] font-medium text-black/50">$160</del>
        </Flex>

        <Flex className="mt-2 gap-3">
          <StarRating rating={5} />
          <span className="text-[16px] font-medium text-black/50">(88)</span>
        </Flex>
      </div>
    </div>
  );
};

export default ItemCardProtrait;
