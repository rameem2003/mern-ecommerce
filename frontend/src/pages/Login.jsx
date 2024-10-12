import React, { useState } from "react";
import Flex from "../components/common/Flex";
import Image from "../components/common/Image";
import account from "../assets/account.png";

const Login = () => {
  // states for get the login info
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // funstion for handle login
  const handleLogin = async (e) => {
    e.preventDefault();
    console.log({ email, password });
  };
  return (
    <main className="pb-[140px] pt-[60px]">
      <Flex>
        <div className="w-7/12">
          <Image src={account} alt="account" className="w-full" />
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
