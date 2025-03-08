import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import Container from "../components/common/Container";
import Image from "../components/common/Image";
import { FaAngleDown, FaTimesCircle } from "react-icons/fa";
import { FaAngleUp } from "react-icons/fa6";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import ProductIncrement from "../helpers/ProductIncrement";
import ProductDecrement from "../helpers/ProductDecrement";
import ProductDelete from "../helpers/ProductDelete";
import ProductListSkeleton from "../components/common/ProductListSkeleton";
import Skeleton from "react-loading-skeleton";

const Cart = () => {
  const user = useSelector((state) => state.account.account); // get user info
  const [cart, setCart] = useState([]); // store all cart list
  const [loading, setLoading] = useState(false); // loading state

  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.discountPrice,
    0,
  );

  // fetch cart items
  const fetchCart = async () => {
    setLoading(true);
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/cart/single/${user.user.id}`,
      );

      setLoading(false);
      setCart(res.data.data);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  // console.log(loading);

  useEffect(() => {
    fetchCart();
  }, []);
  return (
    <main className="py-[80px]">
      <Container>
        {/* static table header */}
        <Flex className="hidden px-10 py-6 shadow-customOne md:flex">
          <div className="w-4/12">
            <p className="text-[16px] font-normal">Product</p>
          </div>
          <div className="w-3/12">
            <p className="text-[16px] font-normal">Price</p>
          </div>
          <div className="w-3/12">
            <p className="text-[16px] font-normal">Quantity</p>
          </div>
          <div className="w-2/12">
            <p className="text-right text-[16px] font-normal">Subtotal</p>
          </div>
        </Flex>

        {/* cart list dynamic */}
        {loading && (
          <>
            <Skeleton className="h-[100px]" />
          </>
        )}
        {cart.length == 0 && (
          <div className="bg-red-500 p-3">
            <h1 className="text-center text-xl text-white">
              Cart Item Not Found
            </h1>
          </div>
        )}

        <section className="block md:hidden">
          {cart.map((c, i) => (
            <div className="mt-10 rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
              <div className="flex flex-col items-center gap-4">
                <div className="relative">
                  <FaTimesCircle
                    onClick={() => ProductDelete(c._id)}
                    className="absolute -right-2 -top-2 cursor-pointer text-red-500 hover:text-red-700"
                  />
                  <Image
                    src={c.product.images[0]}
                    width={54}
                    height={54}
                    className="rounded"
                    alt={c.product.name}
                  />
                </div>
                <div className="flex-1">
                  <p className="text-lg font-semibold text-gray-800">
                    {c.product.name}
                  </p>
                  <p className="text-lg text-gray-600">
                    ৳ {c.product.discountPrice}
                  </p>
                </div>
              </div>
              <div className="mt-4 flex items-center justify-between">
                <div className="flex items-center gap-4 rounded border border-gray-300 px-4 py-2">
                  <FaAngleUp
                    onClick={() => ProductIncrement(c._id)}
                    className="cursor-pointer text-gray-600 hover:text-gray-900"
                  />
                  <span className="text-lg font-medium text-gray-800">
                    {c.quantity}
                  </span>
                  <FaAngleDown
                    onClick={() => ProductDecrement(c._id)}
                    className="cursor-pointer text-gray-600 hover:text-gray-900"
                  />
                </div>
                <p className="text-lg font-semibold text-gray-900">
                  ৳ {c.product.discountPrice * c.quantity}
                </p>
              </div>
            </div>
          ))}
        </section>

        <section className="hidden md:block">
          {cart.map((c, i) => (
            <Flex
              key={i}
              className="mt-10 items-center px-10 py-6 shadow-customOne"
            >
              <div className="w-4/12">
                <Flex className="group relative items-center gap-4">
                  <div className="group-hover: absolute left-0 top-1 rounded-full bg-white">
                    <FaTimesCircle
                      onClick={() => ProductDelete(c._id)}
                      className="cursor-pointer text-primaryRed"
                    />
                  </div>
                  <Image
                    src={c.product.images[0]}
                    className="h-[54px] w-[54px]"
                  />

                  <p className="text-[16px] font-normal text-black">
                    {c.product.name}
                  </p>
                </Flex>
              </div>
              <div className="w-3/12">
                <Flex className="items-center">
                  <p className="text-[16px] font-normal text-black">
                    ৳ {c.product.discountPrice}
                  </p>
                </Flex>
              </div>
              <div className="w-3/12">
                <Flex className="w-[100px] items-center justify-center gap-4 rounded-[4px] border-[1px] border-black px-3 py-[6px]">
                  <span className="text-[16px] font-normal text-black">
                    {c.quantity}
                  </span>

                  <div>
                    <FaAngleUp
                      onClick={() => ProductIncrement(c._id)}
                      className="cursor-pointer hover:text-red-600"
                    />
                    <FaAngleDown
                      onClick={() => ProductDecrement(c._id)}
                      className="cursor-pointer hover:text-red-600"
                    />
                  </div>
                </Flex>
              </div>
              <div className="w-2/12">
                <p className="text-right text-[16px] font-normal text-black">
                  ৳ {c.product.discountPrice * c.quantity}
                </p>
              </div>
            </Flex>
          ))}
        </section>

        {/* cart list dynamic end*/}

        <section className="mt-6">
          <Flex className="flex-col items-center justify-between md:flex-row">
            <button className="w-full rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium md:w-auto">
              Return To Shop
            </button>
            <button className="w-full rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium md:w-auto">
              Update Cart
            </button>
          </Flex>
        </section>

        {/* price discount coupon section */}
        <section className="mt-[80px]">
          <Flex className="flex-col justify-between md:flex-row">
            <div className="w-full md:w-6/12">
              <Flex className="flex-col gap-4 md:flex-row">
                <input
                  type="text"
                  className="w-[300px] rounded-[4px] border-[1px] border-black px-6 py-4"
                  placeholder="Coupon Code"
                />

                <button className="rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white">
                  Apply Coupon
                </button>
              </Flex>
            </div>
            <div className="w-full md:w-5/12">
              <div className="rounded-[4px] border-[1px] border-black px-6 py-8">
                <h2 className="text-[20px] font-bold text-black">Cart Total</h2>

                <div className="mt-6">
                  <Flex className="mb-4 items-center justify-between border-b-[1px] border-black/40 pb-4">
                    <span className="text-[16px] font-normal text-black">
                      Subtotal:
                    </span>
                    <span className="text-[16px] font-normal text-black">
                      ৳ {grandTotal}
                    </span>
                  </Flex>
                  <Flex className="mb-4 items-center justify-between border-b-[1px] border-black/40 pb-4">
                    <span className="text-[16px] font-normal text-black">
                      Shipping:
                    </span>
                    <span className="text-[16px] font-normal text-black">
                      ৳ 0
                    </span>
                  </Flex>
                  <Flex className="mb-4 items-center justify-between border-b-[1px] border-black/40 pb-4">
                    <span className="text-[16px] font-normal text-black">
                      Total:
                    </span>
                    <span className="text-[16px] font-normal text-black">
                      ৳ {grandTotal}
                    </span>
                  </Flex>
                </div>

                <div className="text-center">
                  <Link
                    to="/checkout"
                    className="inline-block rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white"
                  >
                    Procees to checkout
                  </Link>
                </div>
              </div>
            </div>
          </Flex>
        </section>
      </Container>
    </main>
  );
};

export default Cart;
