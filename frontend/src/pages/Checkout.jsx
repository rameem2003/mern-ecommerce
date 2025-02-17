import React, { useEffect, useState } from "react";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import b from "../assets/bkash.png";
import n from "../assets/nagad.png";
import v from "../assets/visa.png";
import m from "../assets/mastercard.png";
import { useSelector } from "react-redux";
import axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from "react-router";

const Checkout = () => {
  const navigate = useNavigate(); // navigation instance
  const user = useSelector((state) => state.account.account); // get user info
  const [cart, setCart] = useState([]); // store all cart list
  // states for getting shipping address data
  const [name, setName] = useState(user?.user?.name);
  const [company, setCompany] = useState("");
  const [address, setAddress] = useState("");
  const [apartment, setApartment] = useState("");
  const [city, setCity] = useState("");
  const [phone, setPhone] = useState(user?.user?.phone);
  const [email, setEmail] = useState(user?.user?.email);
  const [method, setMethod] = useState(null);

  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.sellingPrice,
    0,
  );

  // handle place order
  const handlePlaceOrder = async () => {
    let data = {
      user: user.user.id,
      address: address,
      city: city,
      phone: phone,
      cartItems: cart.map((item, i) => item._id),
      grandTotal: grandTotal,
      paymentMethod: method,
      paymentStatus: "unpaid",
    };

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/order/place",
        data,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(res);

      Swal.fire({
        icon: "success",
        title: "Order Placed",
        text: res.data.msg,
        confirmButtonColor: "red",
      })
        .then((result) => {
          if (result.isConfirmed) {
            navigate("/");
          }
        })
        .finally(() => {
          navigate("/");
        });
    } catch (error) {
      console.log(error);
      if (error.request.status == 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
          confirmButtonColor: "red",
        });
      } else {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
          confirmButtonColor: "red",
        });
      }
    }
  };

  // fetch cart items
  const fetchCart = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/cart/single/${user.user.id}`,
      );

      setCart(res.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  // useEffect(() => {
  //   if (cart.length == 0) navigate("/");
  // }, [cart]);

  return (
    <main className="py-[80px]">
      <Container>
        <Flex className="justify-between">
          {/* shipping details section */}
          <div className="w-5/12">
            <h1 className="text-[36px] font-medium text-black">
              Billing Details
            </h1>

            <div className="mt-12">
              <div className="mb-8">
                <label
                  htmlFor=""
                  className="text-[16px] font-normal text-black/40"
                >
                  Name*
                </label>

                <input
                  // onChange={(e) => setName(e.target.value)}
                  value={name}
                  type="text"
                  name=""
                  className="mt-2 w-[470px] rounded-[4px] bg-whiteShadeOne p-4"
                  id=""
                  disabled
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor=""
                  className="text-[16px] font-normal text-black/40"
                >
                  Street Address*
                </label>

                <input
                  onChange={(e) => setAddress(e.target.value)}
                  value={address}
                  type="text"
                  name=""
                  className="mt-2 w-[470px] rounded-[4px] bg-whiteShadeOne p-4"
                  id=""
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor=""
                  className="text-[16px] font-normal text-black/40"
                >
                  Town/City*
                </label>

                <input
                  onChange={(e) => setCity(e.target.value)}
                  value={city}
                  type="text"
                  name=""
                  className="mt-2 w-[470px] rounded-[4px] bg-whiteShadeOne p-4"
                  id=""
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor=""
                  className="text-[16px] font-normal text-black/40"
                >
                  Phone Number*
                </label>

                <input
                  onChange={(e) => setPhone(e.target.value)}
                  value={phone}
                  type="text"
                  name=""
                  className="mt-2 w-[470px] rounded-[4px] bg-whiteShadeOne p-4"
                  id=""
                />
              </div>
              <div className="mb-8">
                <label
                  htmlFor=""
                  className="text-[16px] font-normal text-black/40"
                >
                  Email Address*
                </label>

                <input
                  // onChange={(e) => setEmail(e.target.value)}
                  value={email}
                  type="text"
                  name=""
                  className="mt-2 w-[470px] rounded-[4px] bg-whiteShadeOne p-4"
                  id=""
                  disabled
                />
              </div>
            </div>
          </div>

          {/* buy summary */}
          <div className="w-6/12">
            <div>
              {/* cart item list dynamic */}
              {cart.length == 0 ? (
                <h1>Loading.....</h1>
              ) : (
                cart.map((item, i) => (
                  <Flex className="mb-8 items-center justify-between" key={i}>
                    <Flex className="group relative items-center gap-4">
                      <Image
                        src={item.product.images[0]}
                        className="h-[54px] w-[54px]"
                      />

                      <p className="text-[16px] font-normal text-black">
                        {item.product.name.slice(0, 30)} &nbsp; x{item.quantity}
                      </p>
                    </Flex>

                    <p className="text-[16px] font-normal text-black">
                      ৳ {item.quantity * item.product.sellingPrice}
                    </p>
                  </Flex>
                ))
              )}

              {/* cart item list dynamic end*/}
            </div>

            {/* price section */}
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
                <span className="text-[16px] font-normal text-black">0 </span>
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

            <div>
              <Flex className="mb-8 items-center justify-between">
                <Flex className="items-center gap-4">
                  <input
                    onChange={(e) => setMethod(e.target.id)}
                    type="radio"
                    name="method"
                    id="online"
                  />
                  <label
                    htmlFor="online"
                    className="text-[16px] font-normal text-black"
                  >
                    Bank
                  </label>
                </Flex>

                <Flex className="items-center gap-2">
                  <Image src={b} />
                  <Image src={n} />
                  <Image src={v} />
                  <Image src={m} />
                </Flex>
              </Flex>

              <Flex className="mb-8 items-center justify-between">
                <Flex className="items-center gap-4">
                  <input
                    onChange={(e) => setMethod(e.target.id)}
                    type="radio"
                    name="method"
                    id="COD"
                  />
                  <label
                    htmlFor="COD"
                    className="text-[16px] font-normal text-black"
                  >
                    Cash on delivery
                  </label>
                </Flex>
              </Flex>
            </div>

            <Flex className="gap-4">
              <input
                type="text"
                className="w-[60%] rounded-[4px] border-[1px] border-black px-6 py-4"
                placeholder="Coupon Code"
              />

              <button className="w-[40%] rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white">
                Apply Coupon
              </button>
            </Flex>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white"
            >
              Place Order
            </button>
          </div>
        </Flex>
      </Container>
    </main>
  );
};

export default Checkout;
