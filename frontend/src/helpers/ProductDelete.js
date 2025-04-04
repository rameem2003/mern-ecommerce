import axios from "axios";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";

const ProductDelete = async (id) => {
  const accessToken = Cookies.get("token");
  try {
    let res = await axios.delete(
      `http://localhost:5000/api/v1/cart/delete/${id}`,
      {
        withCredentials: true,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Cookie: `token=${accessToken}`,
        },
      },
    );

    if (res.status == 200) {
      toast.success(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });

      setTimeout(() => {
        location.reload();
      }, 2000);
    } else {
      toast.info(res.data.msg, {
        position: "top-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce,
      });
    }
  } catch (error) {
    console.log(error);
    // window.location.replace("/signin");
  }
};

export default ProductDelete;
