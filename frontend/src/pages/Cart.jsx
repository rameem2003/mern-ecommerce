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
        <Flex className="px-10 py-6 shadow-customOne">
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

        {/* cart list dynamic end*/}

        <section className="mt-6">
          <Flex className="items-center justify-between">
            <button className="rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium">
              Return To Shop
            </button>
            <button className="rounded-[4px] border-[1px] border-black/50 px-12 py-4 text-[16px] font-medium">
              Update Cart
            </button>
          </Flex>
        </section>

        {/* price discount coupon section */}
        <section className="mt-[80px]">
          <Flex className="justify-between">
            <div className="w-6/12">
              <Flex className="gap-4">
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
            <div className="w-5/12">
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
