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
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";
import { LuUser } from "react-icons/lu";

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
          <div className="w-3/12">
            <Link to="/">
              <Image src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="w-5/12">
            <List className="flex items-center justify-center gap-12">
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
          <div className="w-4/12">
            <Flex className="items-center gap-4">
              <div className="relative w-[300px]">
                <input
                  className="block w-full rounded-[4px] bg-whiteShadeOne px-5 py-[10px] placeholder:text-[12px]"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <IoSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-[24px]" />
              </div>

              <Link to="/wishlist">
                <FaRegHeart className="text-[24px]" />
              </Link>
              <Link to="/cart">
                <IoCartOutline className="text-[24px]" />
              </Link>
              <Link to="/account" className="group relative">
                <LuUser className="text-[24px]" />

                {user && (
                  <div className="absolute right-0 top-5 z-50 hidden w-[300px] rounded-md bg-white p-3 shadow-lg group-hover:block">
                    <Flex className="items-center gap-2">
                      <div>
                        <img
                          src={
                            user?.image ||
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
    </nav>
  );
};

export default Navigation;
