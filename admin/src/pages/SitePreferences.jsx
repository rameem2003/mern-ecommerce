import React, { useEffect, useState } from "react";
import Flex from "../components/common/Flex";
import axios from "axios";
import Image from "./../components/common/Image";
import Swal from "sweetalert2";
import Cookies from "js-cookie";
import AnimatedProgressbar from "../components/common/AnimatedProgressbar";
import CardSkeleton from "../components/common/CardSkeleton";
import { TrashIcon } from "@heroicons/react/24/solid";

const SitePreferences = () => {
  const accessToken = Cookies.get("token"); // access token
  const [banners, setBanners] = useState([]); // get all banners
  const [loading, setLoading] = useState(false); // loading state

  /**
   * Function for upload banner image
   */
  const handleUploadBanner = async (file) => {
    setLoading(true);
    const formData = new FormData();
    formData.append("banner", file);
    formData.append("description", file.name);

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/banner/create",
        formData,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "multipart/formdata",
            Cookie: `token=${accessToken}`,
          },
        }
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

  /**
   * Function for delete banner
   */
  const handleBannerDelete = async (id) => {
    try {
      let res = await axios.delete(
        `http://localhost:5000/api/v1/banner/delete/${id}`,
        {
          withCredentials: true,
        },
        {
          headers: {
            Cookie: `token=${accessToken}`,
          },
        }
      );

      Swal.fire({
        title: res.data.msg,
        confirmButtonText: "Ok",
        confirmButtonColor: "green",
        icon: "success",
      });

      console.log(res.data);
    } catch (error) {
      s;
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

  /**
   * Fetch Banners
   */
  const fetchBanners = async () => {
    let res = await axios.get("http://localhost:5000/api/v1/banner/all");
    setBanners(res.data.data);
  };

  useEffect(() => {
    fetchBanners();
  }, []);

  return (
    <section className="px-3 mt-2">
      <h1 className=" font-semibold text-xl">Customize E-commerce Banner</h1>

      <label
        htmlFor="uploadFile1"
        className="bg-white text-gray-500 font-semibold text-base rounded w-full my-5 h-52 flex flex-col items-center justify-center cursor-pointer border-2 border-gray-300 border-dashed mx-auto font-[sans-serif]"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="w-11 mb-2 fill-gray-500"
          viewBox="0 0 32 32"
        >
          <path
            d="M23.75 11.044a7.99 7.99 0 0 0-15.5-.009A8 8 0 0 0 9 27h3a1 1 0 0 0 0-2H9a6 6 0 0 1-.035-12 1.038 1.038 0 0 0 1.1-.854 5.991 5.991 0 0 1 11.862 0A1.08 1.08 0 0 0 23 13a6 6 0 0 1 0 12h-3a1 1 0 0 0 0 2h3a8 8 0 0 0 .75-15.956z"
            data-original="#000000"
          />
          <path
            d="M20.293 19.707a1 1 0 0 0 1.414-1.414l-5-5a1 1 0 0 0-1.414 0l-5 5a1 1 0 0 0 1.414 1.414L15 16.414V29a1 1 0 0 0 2 0V16.414z"
            data-original="#000000"
          />
        </svg>
        Upload file
        <input
          onChange={(e) => handleUploadBanner(e.target.files[0])}
          type="file"
          id="uploadFile1"
          className="hidden"
        />
        <p className="text-xs font-medium text-gray-400 mt-2">
          PNG, JPG SVG, WEBP, and GIF are Allowed.
        </p>
      </label>
      {loading && <AnimatedProgressbar progress={100} />}

      {banners.length == 0 && <CardSkeleton />}
      <Flex className=" flex-wrap mt-5 gap-5">
        {banners.map((b, i) => (
          <div className="w-[24%] relative" key={i}>
            <button
              onClick={() => handleBannerDelete(b._id)}
              className="bg-red-500 p-3 rounded-md hover:bg-red-400 absolute top-2 right-2"
            >
              <TrashIcon className="h-5 w-5 text-white" />
            </button>
            <Image src={b.banner} alt={b.description} />
          </div>
        ))}
      </Flex>
    </section>
  );
};

export default SitePreferences;
