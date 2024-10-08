import React from "react";
import { Link } from "react-router-dom";
import Container from "../common/Container";
import Flex from "../common/Flex";
import Image from "../common/Image";
import List from "./../common/List";
import ListItem from "./../common/ListItem";
import qr from "../../assets/qr.png";
import google from "../../assets/google.png";
import apple from "../../assets/apple.png";
import { LuSendHorizonal } from "react-icons/lu";
import { FaFacebookF, FaInstagram, FaLinkedinIn } from "react-icons/fa";
import { FiTwitter } from "react-icons/fi";

const Footer = () => {
  return (
    <footer className="bg-black">
      <Container>
        <Flex className="pt-[80px]">
          <div className="w-[25%]">
            <Image src="/footer.png" />

            <h4 className="mt-6 text-[20px] font-medium text-white">
              Subscribe
            </h4>

            <div className="mt-6">
              <p className="mb-4 text-[16px] font-normal text-white">
                Get 10% off your first order
              </p>

              <div className="relative h-full w-[217px]">
                <input
                  type="text"
                  className="w-full rounded-[4px] border-[1.5px] border-white bg-transparent px-4 py-3 text-white"
                  placeholder="Enter your email"
                  name=""
                  id=""
                />

                <LuSendHorizonal className="absolute right-2 top-[50%] translate-y-[-50%] text-[24px] text-white" />
              </div>
            </div>
          </div>
          <div className="w-[55%]">
            <Flex className="gap-[88px]">
              <div className="w-[33%]">
                <h4 className="text-[20px] font-medium text-white">Supports</h4>

                <div className="mt-6">
                  <p className="text-[16px] font-normal text-white">
                    111 Bijoy sarani, Dhaka, DH 1515, Bangladesh.
                  </p>
                  <p className="mt-4 text-[16px] font-normal text-white">
                    exclusive@gmail.com
                  </p>
                  <p className="mt-4 text-[16px] font-normal text-white">
                    +88015-88888-9999
                  </p>
                </div>
              </div>
              <div className="w-[33%]">
                <h4 className="text-[20px] font-medium text-white">Account</h4>

                <div className="mt-6">
                  <List>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        My Account
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Login / Register
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Cart
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Wishlist
                      </Link>
                    </ListItem>

                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Shop
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </div>
              <div className="w-[33%]">
                <h4 className="text-[20px] font-medium text-white">
                  Quick Link
                </h4>

                <div className="mt-6">
                  <List>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Privacy Policy
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Terms Of Use
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        FAQ
                      </Link>
                    </ListItem>
                    <ListItem className="mb-4 block">
                      <Link className="text-[16px] font-normal text-white">
                        Contact
                      </Link>
                    </ListItem>
                  </List>
                </div>
              </div>
            </Flex>
          </div>
          <div className="w-[20%] pl-5">
            <h4 className="text-[20px] font-medium text-white">Download App</h4>

            <div className="mt-6">
              <p className="text-[12px] font-medium text-white/70">
                Save $3 with App New User Only
              </p>

              <Flex className="mt-[10px]">
                <div className="w-6/12">
                  <Image src={qr} alt="qr" />
                </div>
                <div className="w-6/12">
                  <Image src={google} alt="app" className="mb-3 block w-full" />
                  <Image src={apple} alt="app" className="block w-full" />
                </div>
              </Flex>

              <List className="mt-6 flex items-start gap-6">
                <ListItem>
                  <a href="">
                    <FaFacebookF className="text-[24px] text-white" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="">
                    <FiTwitter className="text-[24px] text-white" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="">
                    <FaInstagram className="text-[24px] text-white" />
                  </a>
                </ListItem>
                <ListItem>
                  <a href="">
                    <FaLinkedinIn className="text-[24px] text-white" />
                  </a>
                </ListItem>
              </List>
            </div>
          </div>
        </Flex>
      </Container>

      <div className="mt-[60px] border-t-[1px] border-white/30 p-4">
        <p className="text-center text-[16px] font-normal text-white/30">
          &copy; Copyright Mahmood Hassan Rameem. MERN 2024. All right reserved
        </p>
      </div>
    </footer>
  );
};

export default Footer;
