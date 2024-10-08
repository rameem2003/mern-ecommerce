import React from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import account from "../assets/account.png";
import { FcGoogle } from "react-icons/fc";
import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="pb-[140px] pt-[60px]">
      <Flex>
        <div className="w-7/12">
          <Image src={account} alt="account" className="w-full" />
        </div>
        <div className="flex w-5/12 items-center justify-center">
          <div>
            <h2 className="text-[36px] font-medium text-black">
              Create an account
            </h2>

            <p className="mt-6 text-[16px] font-normal text-black">
              Enter your details below
            </p>

            <form action="" className="mt-12">
              <input
                type="text"
                placeholder="Name"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />
              <input
                type="text"
                placeholder="Email or Phone Number"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />
              <input
                type="password"
                placeholder="Password"
                className="mb-10 block w-[370px] border-b-[1px] border-black/50 pb-2"
                name=""
                id=""
              />

              <button
                type="submit"
                className="w-full rounded-[4px] bg-primaryRed py-4 text-white"
              >
                Create Account
              </button>
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
