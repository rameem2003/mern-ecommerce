import React, { useEffect, useState } from "react";
import Container from "./../components/common/Container";
import Flex from "../components/common/Flex";
import List from "../components/common/List";
import ListItem from "../components/common/ListItem";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { FaPenAlt } from "react-icons/fa";
import Swal from "sweetalert2";
import axios from "axios";
import Cookies from "js-cookie";

const Account = () => {
  const accessToken = Cookies.get("token");
  const user = useSelector((state) => state.account.account); // get user info
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({
    name: user?.user?.name || "",
    phone: user?.user?.phone || "",
    address: user?.user?.address || "",
    photo: null,
  });

  // input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  // image change
  const handleImageChange = (e) => {
    setProfile({ ...profile, photo: e.target.files[0] });
  };
  // function for profile update
  const handleProfileUpdate = async (e) => {
    e.preventDefault();

    setLoading(true);
    let data = new FormData();
    data.append("name", profile.name);
    data.append("phone", profile.phone);
    data.append("address", profile.address);
    if (profile.photo) {
      data.append("photo", profile.photo);
    }

    try {
      let res = await axios.patch(
        `http://localhost:5000/api/v1/auth/update/${user.user.id}`,
        data,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Cookie: `token=${accessToken}`,
          },
        },
      );
      setLoading(false);

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });

      console.log(res.data);
    } catch (error) {
      setLoading(false);
      console.log(error);

      Swal.fire({
        title: error.response.data.msg,
        showConfirmButton: false,
        showCancelButton: true,
        cancelButtonText: "Ok",
        cancelButtonColor: "red",
        icon: "error",
      }).then((result) => {
        if (result.isDismissed) {
          location.reload();
        }
      });
    }
  };

  // Fetch User Update Info
  const fetchUserUpdate = async () => {
    try {
      let res = await axios.get(
        `http://localhost:5000/api/v1/auth/user/${user.user.id}`,
      );
      console.log(res);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  useEffect(() => {
    fetchUserUpdate();
  }, []);

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
                  <Link
                    to="/account"
                    className="text-[16px] font-normal text-primaryRed"
                  >
                    My Profile
                  </Link>
                </ListItem>
                {/* <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    Email and Password Manage
                  </Link>
                </ListItem> */}
              </List>
            </div>

            <div className="mt-6">
              <h2 className="text-[16px] font-medium text-black">My Orders</h2>

              <List className="mt-4 pl-[35px]">
                <ListItem className="mb-2">
                  <Link
                    to="/account/orders"
                    className="text-[16px] font-normal text-primaryRed"
                  >
                    All Order's
                  </Link>
                </ListItem>
                {/* <ListItem className="mb-2">
                  <Link className="text-[16px] font-normal text-primaryRed">
                    My Cancellations
                  </Link>
                </ListItem> */}
              </List>
            </div>

            <div className="mt-6 hidden">
              <h2 className="text-[16px] font-medium text-black">
                My WishList
              </h2>
            </div>
          </div>

          {/* account info part */}
          <div className="w-9/12">
            <form
              onSubmit={handleProfileUpdate}
              className="w-full px-[80px] py-10 shadow-customOne"
            >
              <h2 className="text-[20px] font-medium text-primaryRed">
                Edit Your Profile
              </h2>

              <div className="group relative h-40 w-40 rounded-full">
                <div className="absolute flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-black/20 opacity-0 duration-200 ease-in-out group-hover:opacity-100">
                  <label htmlFor="upload">
                    <FaPenAlt className="cursor-pointer text-3xl text-white" />
                  </label>
                  <input
                    onChange={handleImageChange}
                    type="file"
                    name=""
                    id="upload"
                    hidden
                  />
                </div>
                <img
                  src={user?.user?.photo}
                  alt={user?.user?.name}
                  className="h-full w-full rounded-full object-cover"
                />
              </div>

              <div className="mt-4">
                <Flex className="w-full flex-col items-center justify-between">
                  <div className="mb-6 w-full">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Name
                    </label>

                    <input
                      type="text"
                      name="name"
                      value={profile.name}
                      onChange={handleInputChange}
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>

                  <div className="mb-6 w-full">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Email
                    </label>

                    <input
                      type="text"
                      name="email"
                      value={user?.user?.email}
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                      disabled
                    />
                  </div>
                </Flex>

                <Flex className="w-full items-center justify-between gap-[50px]">
                  <div className="mb-6 w-1/2">
                    <label
                      htmlFor=""
                      className="text-[16px] font-normal text-black"
                    >
                      Phone
                    </label>

                    <input
                      type="text"
                      onChange={handleInputChange}
                      defaultValue={profile.phone}
                      name="phone"
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
                      onChange={handleInputChange}
                      defaultValue={profile.address}
                      name="address"
                      className="mt-2 w-full rounded-[4px] bg-whiteShadeOne p-4"
                      id=""
                    />
                  </div>
                </Flex>

                <div className="mb-6 hidden w-full">
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
                  <button
                    type="submit"
                    className="rounded-[4px] bg-primaryRed px-12 py-4 text-[16px] text-white"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </form>
          </div>
        </Flex>
      </Container>
    </main>
  );
};

export default Account;
