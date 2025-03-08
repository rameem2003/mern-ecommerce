import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AccountReducer } from "../../redux/featurer/AccountSlice";
import Cookies from "js-cookie";
import Container from "../common/Container";
import Flex from "../common/Flex";
import Image from "./../common/Image";
import List from "./../common/List";
import ListItem from "./../common/ListItem";
import { IoCart, IoCartOutline, IoSearch } from "react-icons/io5";
import { FaHome, FaPlus, FaRegHeart, FaUser } from "react-icons/fa";
import { LuUser } from "react-icons/lu";
import { MdSell } from "react-icons/md";

const Navigation = () => {
  const user = useSelector((state) => state.account.account); // get user info
  const dispatch = useDispatch(); // dispatch instance

  // function for logout
  const handleLogout = () => {
    dispatch(AccountReducer(""));
    Cookies.remove("token");
    location.reload();
  };
  return (
    <nav className="border-black/3 mt-10 border-b-[1px] pb-4">
      <Container>
        <Flex className="items-center">
          <div className="w-1/2 lg:w-3/12">
            <Link to="/">
              <Image src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="hidden lg:block lg:w-5/12">
            <List className="flex items-center justify-center gap-5 xl:gap-12">
              <ListItem>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `" text-black" ${isActive ? "after:bg-secondaryGrey" : "after:bg-transparent"} relative pb-1 text-[16px] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full`
                  }
                >
                  Home
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/shop"
                  className={({ isActive }) =>
                    `" text-black" ${isActive ? "after:bg-secondaryGrey" : "after:bg-transparent"} relative pb-1 text-[16px] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full`
                  }
                >
                  Shop
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/contact"
                  className={({ isActive }) =>
                    `" text-black" ${isActive ? "after:bg-secondaryGrey" : "after:bg-transparent"} relative pb-1 text-[16px] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full`
                  }
                >
                  Contact
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/about"
                  className={({ isActive }) =>
                    `" text-black" ${isActive ? "after:bg-secondaryGrey" : "after:bg-transparent"} relative pb-1 text-[16px] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full`
                  }
                >
                  About
                </NavLink>
              </ListItem>
              <ListItem>
                <NavLink
                  to="/signup"
                  className={({ isActive }) =>
                    `" text-black" ${isActive ? "after:bg-secondaryGrey" : "after:bg-transparent"} relative pb-1 text-[16px] after:absolute after:bottom-[-5px] after:left-0 after:h-[2px] after:w-full`
                  }
                >
                  Sign Up
                </NavLink>
              </ListItem>
            </List>
          </div>
          <div className="w-1/2 lg:w-4/12">
            <Flex className="items-center justify-end gap-4">
              <div className="relative hidden lg:block lg:w-[300px]">
                <input
                  className="block w-full rounded-[4px] bg-whiteShadeOne px-5 py-[10px] placeholder:text-[12px]"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <IoSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-[24px]" />
              </div>

              <IoSearch className="text-[24px]" />
              {/* <Link to="/wishlist">
                <FaRegHeart className="text-[24px]" />
              </Link> */}
              <Link to="/cart">
                <IoCartOutline className="text-[24px]" />
              </Link>
              <Link to="/account" className="group relative">
                {user ? (
                  <img
                    src={
                      user?.user?.photo ||
                      "https://docs.material-tailwind.com/img/face-2.jpg"
                    }
                    className="h-[24px] w-[24px] rounded-full"
                    alt="user"
                  />
                ) : (
                  <LuUser className="text-[24px]" />
                )}

                {user && (
                  <div className="absolute right-0 top-5 z-50 hidden w-[300px] rounded-md bg-white p-3 shadow-lg group-hover:block">
                    <Flex className="items-center gap-2">
                      <div>
                        <img
                          src={
                            user?.user?.photo ||
                            "https://docs.material-tailwind.com/img/face-2.jpg"
                          }
                          className="h-[50px] w-[50px] rounded-full"
                          alt="user"
                        />
                      </div>
                      <div>
                        <h4>{user?.user?.name.slice(0, 15)}</h4>
                        <p className="text-sm font-normal text-gray-500">
                          {user?.user?.email}
                        </p>
                      </div>
                    </Flex>

                    <button
                      onClick={handleLogout}
                      className="mt-2 w-full border-[2px] border-black p-2 font-bold"
                    >
                      Logout
                    </button>
                  </div>
                )}
              </Link>
            </Flex>
          </div>
        </Flex>
      </Container>
      <Flex className="fixed bottom-0 left-0 z-[100000000] flex w-full items-center justify-center bg-primaryRed p-3 lg:hidden">
        <List className="flex items-center justify-center gap-5">
          <ListItem>
            <Link to="/" className="flex flex-col items-center justify-center">
              <FaHome className="text-2xl text-white" />
              <span className="text-xs font-medium text-white">Home</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link className="flex flex-col items-center justify-center">
              <MdSell className="text-2xl text-white" />
              <span className="text-xs font-medium text-white">Best Sell</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/shop"
              className="flex flex-col items-center justify-center"
            >
              <FaPlus className="rounded-full bg-white text-4xl text-primaryRed" />
              <span className="text-xs font-medium text-white">Shop</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/cart"
              className="flex flex-col items-center justify-center"
            >
              <IoCart className="rounded-full text-2xl text-white" />
              <span className="text-xs font-medium text-white">Cart</span>
            </Link>
          </ListItem>
          <ListItem>
            <Link
              to="/account"
              className="flex flex-col items-center justify-center"
            >
              <FaUser className="rounded-full text-2xl text-white" />
              <span className="text-xs font-medium text-white">Account</span>
            </Link>
          </ListItem>
        </List>
      </Flex>
    </nav>
  );
};

export default Navigation;
