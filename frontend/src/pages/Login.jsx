import React, { useState } from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import account from "../assets/account.png";
import Swal from "sweetalert2";
import axios from "axios";
import { useDispatch } from "react-redux";
import { AccountReducer } from "../redux/featurer/AccountSlice";
import { useNavigate } from "react-router";

const Login = () => {
  const dispatch = useDispatch(); // dispatch instance
  const navigation = useNavigate(); // navigation instance
  // states for get the login info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // function for handle login
  const handleLogin = async (e) => {
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

      dispatch(AccountReducer(res.data));
      navigation("/");
    } catch (error) {
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
      <Flex className="h-full">
        <div className="w-7/12">
          <Image
            src={account}
            alt="account"
            className="h-full w-full object-cover"
          />
        </div>
        <div className="flex w-5/12 items-center justify-center">
          <div>
            <h2 className="text-[36px] font-medium text-black">
              Log in to Exclusive
            </h2>

            <p className="mt-6 text-[16px] font-normal text-black">
              Enter your details below
            </p>

            <form action="" className="mt-12" onSubmit={handleLogin}>
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email or Phone Number"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />
              <input
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                type="password"
                placeholder="Password"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />

              <Flex className="items-center justify-between">
                <button
                  type="submit"
                  className="w-auto rounded-[4px] bg-primaryRed px-12 py-4 text-white"
                >
                  Log In
                </button>
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
