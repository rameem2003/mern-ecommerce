import React, { useState } from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import account from "../assets/account.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AccountReducer } from "../redux/featurer/AccountSlice";
import { ThreeDots } from "react-loader-spinner";
import { Link, useNavigate } from "react-router-dom";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Login = () => {
  const navigation = useNavigate(); // navigation instance
  const dispatch = useDispatch(); // dispatch instance
  // states for get the login info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // function for handle login
  const handleLogin = async (e) => {
    setLoading(true);
    e.preventDefault();
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        {
          email,
          password,
        },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(false);

      dispatch(AccountReducer(res.data));
      navigation("/");
    } catch (error) {
      setLoading(false);
      console.log(error);
      Swal.fire({
        title: "Error!",
        text: error.response.data.msg,
        icon: "error",
        confirmButtonText: "Try Again",
        confirmButtonColor: "#DB4444",
      });
    }
  };

  return (
    <main className="h-screen">
      <Flex className="h-full w-full">
        <div className="hidden lg:block lg:w-7/12">
          <Image
            src={account}
            alt="account"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-full items-center justify-center px-2 lg:w-5/12">
          <div>
            <h2 className="text-[36px] font-medium text-black">
              Log in to Exclusive
            </h2>

            <p className="mt-6 text-[16px] font-normal text-black">
              Enter your details below
            </p>
            <p className="mt-6 text-[16px] font-normal text-primaryRed">
              Or <Link to="/signup">create an account</Link>
            </p>

            <form action="" className="mt-12" onSubmit={handleLogin}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email or Phone Number"
                className="mb-10 block w-full border-b-[1px] border-black/50 pb-2 lg:w-[370px]"
                name="email"
                id=""
              />
              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="mb-10 block w-full border-b-[1px] border-black/50 pb-2 lg:w-[370px]"
                  name="password"
                  id=""
                />

                {showPass ? (
                  <FaEyeSlash
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-0 top-0 text-xl"
                  />
                ) : (
                  <FaEye
                    onClick={() => setShowPass(!showPass)}
                    className="absolute right-0 top-0 text-xl"
                  />
                )}
              </div>

              <Flex className="items-center justify-between">
                {loading ? (
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
                ) : (
                  <button
                    type="submit"
                    className="w-auto rounded-[4px] bg-primaryRed px-12 py-4 text-white"
                  >
                    Log In
                  </button>
                )}

                <a href="" className="font-normal text-primaryRed">
                  Forget Password?
                </a>
              </Flex>
            </form>
          </div>
        </div>
      </Flex>
    </main>
  );
};

export default Login;
