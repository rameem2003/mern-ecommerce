import React, { useState } from "react";
import Container from "../components/common/Container";
import Flex from "../components/common/Flex";
import { IoCallSharp } from "react-icons/io5";
import { FaRegEnvelope } from "react-icons/fa";

const Contact = () => {
  // states for getting shipping address data
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");

  // fucntion for send messages
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({ name, email, phone, message });
  };
  return (
    <main className="py-[80px]">
      <Container>
        <Flex className="items-center gap-[30px]">
          {/* address section */}
          <div className="w-4/12">
            <div className="px-[35px] py-10 shadow-customOne">
              <div>
                <Flex className="items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primaryRed">
                    <IoCallSharp className="text-[20px] text-white" />
                  </div>

                  <h2 className="text-[16px] font-medium text-black">
                    Call To Us
                  </h2>
                </Flex>

                <h2 className="mt-6 text-[14px] font-medium text-black">
                  We are available 24/7, 7 days a week.
                </h2>
                <h2 className="mt-4 text-[14px] font-medium text-black">
                  Phone: +8801611112222
                </h2>
              </div>

              <div className="my-8 h-[1px] w-full bg-black/30"></div>

              <div>
                <Flex className="items-center gap-4">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primaryRed">
                    <FaRegEnvelope className="text-[20px] text-white" />
                  </div>

                  <h2 className="text-[16px] font-medium text-black">
                    Write To US
                  </h2>
                </Flex>

                <h2 className="mt-6 text-[14px] font-medium text-black">
                  Fill out our form and we will contact you within 24 hours.
                </h2>
                <h2 className="mt-4 text-[14px] font-medium text-black">
                  Emails: customer@exclusive.com
                </h2>
                <h2 className="mt-4 text-[14px] font-medium text-black">
                  Emails: support@exclusive.com
                </h2>
              </div>
            </div>
          </div>

          {/* user contact form section */}
          <div className="w-8/12">
            <div className="px-8 py-10 shadow-customOne">
              <form action="" onSubmit={handleSubmit}>
                <Flex className="items-center gap-4">
                  <div className="mb-6 w-1/3">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      First Name
                    </label>

                    <input
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                  <div className="mb-6 w-1/3">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Email
                    </label>

                    <input
                      onChange={(e) => setEmail(e.target.value)}
                      value={email}
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                  <div className="mb-6 w-1/3">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Phone
                    </label>

                    <input
                      onChange={(e) => setPhone(e.target.value)}
                      value={phone}
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                </Flex>

                <div className="mb-6 w-full">
                  <label
                    htmlFor=""
                    className="text-[16px] font-normal text-black"
                  >
                    Message
                  </label>

                  <textarea
                    onChange={(e) => setMessage(e.target.value)}
                    value={message}
                    type="text"
                    name=""
                    className="mt-2 h-[143px] w-full rounded-[4px] bg-whiteShadeOne p-4"
                    id=""
                  ></textarea>
                </div>

                <div className="mt-4 text-right">
                  <button className="rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white">
                    Send Massage
                  </button>
                </div>
              </form>
            </div>
          </div>
        </Flex>
      </Container>
    </main>
  );
};

export default Contact;
