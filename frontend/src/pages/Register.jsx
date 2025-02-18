import React, { useState } from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import account from "../assets/account.png";
import { FcGoogle } from "react-icons/fc";
import { Link, useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import axios from "axios";
import { ThreeDots } from "react-loader-spinner";
import { FaEye, FaEyeSlash } from "react-icons/fa";

const Register = () => {
  const navigate = useNavigate(); // navigation instance
  // states for get the register info
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [showPass, setShowPass] = useState(false);

  // function for handle register
  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/register",
        {
          name,
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      setLoading(false);
      console.log(res);

      navigate("/verify-otp", { state: { key: res.data.user } });

      // navigation("/");
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
              Create an account
            </h2>

            <p className="mt-6 text-[16px] font-normal text-black">
              Enter your details below
            </p>

            <form action="" className="mt-12" onSubmit={handleRegister}>
              <input
                onChange={(e) => setName(e.target.value)}
                value={name}
                type="text"
                placeholder="Name"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />
              <input
                onChange={(e) => setEmail(e.target.value)}
                value={email}
                type="text"
                placeholder="Email or Phone Number"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />

              <div className="relative">
                <input
                  onChange={(e) => setPassword(e.target.value)}
                  value={password}
                  type={showPass ? "text" : "password"}
                  placeholder="Password"
                  className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                  name=""
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

              {loading ? (
                <div className="flex justify-center">
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
              ) : (
                <button
                  type="submit"
                  className="w-full rounded-[4px] bg-primaryRed py-4 text-white"
                >
                  Create Account
                </button>
              )}

              <button
                type="submit"
                className="mt-4 flex w-full items-center justify-center gap-1 rounded-[4px] border-[1px] border-black/40 bg-transparent py-4 text-black"
              >
                <FcGoogle className="text-[24px]" /> Sign up with Google
              </button>
            </form>

            <p className="mt-[34px] text-center text-[16px] font-normal text-black">
              Already have account?{" "}
              <Link to="/signin" className="font-medium underline">
                Log in
              </Link>
            </p>
          </div>
        </div>
      </Flex>
    </main>
  );
};

export default Register;
