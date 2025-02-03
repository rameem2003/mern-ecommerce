import React from "react";
import { Link, useLocation } from "react-router-dom";
import Image from "./Image";
import items from "../../assets/item.png";
import Flex from "./Flex";
import StarRating from "./StarRating";
import { FaRegHeart } from "react-icons/fa";
import { IoMdEye } from "react-icons/io";
import { IoTrash } from "react-icons/io5";

const ItemCardProtrait = ({ className, data, isWish }) => {
  return (
    <div className={`${className} `}>
      <div className="group relative overflow-hidden rounded-[4px] bg-whiteShadeOne px-10 py-[50px]">
        <Image src={data?.images[0]} className="w-full" alt="item" />

        <span className="absolute left-4 top-4 rounded-[4px] bg-primaryRed px-3 py-1 text-[12px] font-normal text-white">
          -
          {Math.floor(
            ((data?.sellingPrice - data?.discountPrice) * 100) /
              data?.sellingPrice,
          )}
          %
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
        <Link
          to={`/product/${data?._id}`}
          className="text-[16px] font-medium text-black"
        >
          {data?.name}
        </Link>

        <Flex className="mt-2 gap-3">
          <span className="text-[16px] font-medium text-primaryRed">
            ৳{data?.discountPrice}
          </span>
          <del className="text-[16px] font-medium text-black/50">
            ৳{data?.sellingPrice}
          </del>
        </Flex>

        <Flex className="mt-2 gap-3">
          <StarRating rating={5} />
          <span className="text-[16px] font-medium text-black/50">
            ({data?.stock})
          </span>
        </Flex>
      </div>
    </div>
  );
};

export default ItemCardProtrait;
