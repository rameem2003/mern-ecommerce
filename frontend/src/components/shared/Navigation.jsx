import React from "react";
import { Link, NavLink } from "react-router-dom";
import Container from "../common/Container";
import Flex from "../common/Flex";
import Image from "./../common/Image";
import List from "./../common/List";
import ListItem from "./../common/ListItem";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { FaRegHeart } from "react-icons/fa";

const Navigation = () => {
  return (
    <nav className="mt-10">
      <Container>
        <Flex className="items-center">
          <div className="w-3/12">
            <Link to="/">
              <Image src="/logo.png" alt="logo" />
            </Link>
          </div>
          <div className="w-6/12">
            <List className="flex items-center justify-start gap-12">
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
          <div className="w-3/12">
            <Flex className="items-center gap-4">
              <div className="relative w-[300px]">
                <input
                  className="bg-whiteShadeOne block w-full rounded-[4px] px-5 py-[10px] placeholder:text-[12px]"
                  type="text"
                  placeholder="What are you looking for?"
                />
                <IoSearch className="absolute right-2 top-[50%] translate-y-[-50%] text-[24px]" />
              </div>

              <Link>
                <FaRegHeart className="text-[24px]" />
              </Link>
              <Link>
                <IoCartOutline className="text-[24px]" />
              </Link>
            </Flex>
          </div>
        </Flex>
      </Container>
    </nav>
  );
};

export default Navigation;
