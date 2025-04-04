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
import { Bounce, toast } from "react-toastify";
import { ThreeDots } from "react-loader-spinner";

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
  const [loading, setLoading] = useState(false);

  const grandTotal = cart.reduce(
    (total, item) => total + item.quantity * item.product.discountPrice,
    0,
  );

  // handle place order
  const handlePlaceOrder = async () => {
    let data = {
      user: user.user.id,
      address: address,
      city: city,
      phone: phone,
      // cartItems: cart.map((item, i) => item._id),
      cartItems: cart.map((item, i) => ({
        cartId: item._id,
        product: item.product._id,
        quantity: item.quantity,
      })),
      grandTotal: grandTotal,
      paymentMethod: method,
      paymentStatus: "unpaid",
    };

    if (address && city && method) {
      setLoading(true);
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

        setLoading(false);
        Swal.fire({
          icon: "success",
          title: "Order Placed",
          text: res.data.msg,
          confirmButtonColor: "red",
        })
          .then((result) => {
            if (result.isConfirmed) {
              // navigate("/");
              window.location.replace(res.data.url);
            }
          })
          .finally(() => {
            // navigate("/");
            window.location.replace(res.data.url);
          });
      } catch (error) {
        setLoading(false);
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
    } else {
      toast.info("Fill up required fields", {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
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

  // Loading Component
  const LoadingAnimation = () => {
    return (
      <div className="fixed left-0 top-0 z-50 flex h-screen w-full items-center justify-center bg-white/20 backdrop-blur-sm">
        <ThreeDots
          visible={true}
          height="80"
          width="80"
          color="#DB4444"
          radius="9"
          ariaLabel="three-dots-loading"
          wrapperStyle={{}}
          wrapperClass=""
        />
      </div>
    );
  };

  useEffect(() => {
    fetchCart();
  }, []);

  return (
    <main className="py-[80px]">
      {loading && <LoadingAnimation />}
      <Container>
        <Flex className="flex-col justify-between md:flex-row">
          {/* shipping details section */}
          <div className="w-full md:w-5/12">
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
                  className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4 md:w-[470px]"
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
                  className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4 md:w-[470px]"
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
                  className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4 md:w-[470px]"
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
                  className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4 md:w-[470px]"
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
                  className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4 md:w-[470px]"
                  id=""
                  disabled
                />
              </div>
            </div>
          </div>

          {/* buy summary */}
          <div className="w-full md:w-6/12">
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
                      ৳ {item.quantity * item.product.discountPrice}
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

            <Flex className="flex-col gap-4 md:flex-row">
              <input
                type="text"
                className="w-full rounded-[4px] border-[1px] border-black px-6 py-4 md:w-[60%]"
                placeholder="Coupon Code"
              />

              <button className="w-full rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white md:w-[40%]">
                Apply Coupon
              </button>
            </Flex>

            <button
              onClick={handlePlaceOrder}
              className="mt-8 w-full rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white md:w-auto"
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
