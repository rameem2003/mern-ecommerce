import React from "react";
import member from "../../assets/member.png";
import Image from "./Image";
import Flex from "./Flex";
import List from "./List";
import ListItem from "./ListItem";
import { FiTwitter } from "react-icons/fi";
import { FaInstagram, FaLinkedinIn } from "react-icons/fa";

const Member = ({ className, data }) => {
  return (
    <div className={`${className}`}>
      <div>
        <Image src={member} alt="member" />
      </div>

      <div className="mt-8">
        <h3 className="text-[32px] font-medium text-black">Tom Cruise</h3>
        <p className="mt-2 text-[16px] font-normal text-black">
          Founder & Chairman
        </p>

        <List className="mt-6 flex items-start gap-6">
          <ListItem>
            <a href="">
              <FiTwitter className="text-[24px] text-black" />
            </a>
          </ListItem>
          <ListItem>
            <a href="">
              <FaInstagram className="text-[24px] text-black" />
            </a>
          </ListItem>
          <ListItem>
            <a href="">
              <FaLinkedinIn className="text-[24px] text-black" />
            </a>
          </ListItem>
        </List>
      </div>
    </div>
  );
};

export default Member;
