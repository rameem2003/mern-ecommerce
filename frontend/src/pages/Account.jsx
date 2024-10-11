import React from "react";
import Container from "./../components/common/Container";
import Flex from "../components/common/Flex";
import List from "../components/common/List";
import ListItem from "../components/common/ListItem";
import { Link } from "react-router-dom";

const Account = () => {
  return (
    <main className="py-[80px]">
      <Container>
        <Flex>
          {/* account left part */}
          <div className="w-3/12">
            <div>
              <h2 className="text-[16px] font-medium text-black">
                Manage My Account
              </h2>

              <List className="mt-4 pl-[35px]">
                <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    My Profile
                  </Link>
                </ListItem>
                <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    Address Book
                  </Link>
                </ListItem>
                <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    My Payment Options
                  </Link>
                </ListItem>
              </List>
            </div>

            <div className="mt-6">
              <h2 className="text-[16px] font-medium text-black">My Orders</h2>

              <List className="mt-4 pl-[35px]">
                <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    My Returns
                  </Link>
                </ListItem>
                <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    My Cancellations
                  </Link>
                </ListItem>
              </List>
            </div>

            <div className="mt-6">
              <h2 className="text-[16px] font-medium text-black">
                My WishList
              </h2>
            </div>
          </div>

          {/* account info part */}
          <div className="w-9/12">
            <div className="w-full px-[80px] py-10 shadow-customOne">
              <h2 className="text-[20px] font-medium text-primaryRed">
                Edit Your Profile
              </h2>

              <div className="mt-4">
                <Flex className="w-full items-center justify-between gap-[50px]">
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      First Name
                    </label>

                    <input
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Last Name
                    </label>

                    <input
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                </Flex>

                <Flex className="w-full items-center justify-between gap-[50px]">
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Email
                    </label>

                    <input
                      type="text"
                      name=""
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Address
                    </label>

                    <input
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
                    Password Changes
                  </label>

                  <input
                    type="text"
                    name=""
                    className="mb-4 mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                    placeholder="Current Password"
                    id=""
                  />
                  <input
                    type="text"
                    name=""
                    className="mb-4 mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                    placeholder="New Password"
                    id=""
                  />
                  <input
                    type="text"
                    name=""
                    className="mb-4 mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                    placeholder="Confirm Password"
                    id=""
                  />
                </div>

                <div className="mt-4 text-right">
                  <button className="rounded-[4px] px-12 py-4 text-[16px] text-black">
                    Cancel
                  </button>
                  <button className="rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white">
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </Flex>
      </Container>
    </main>
  );
};

export default Account;
