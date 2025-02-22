import axios from "axios";
import Cookies from "js-cookie";
import { Bounce, toast } from "react-toastify";
import Swal from "sweetalert2";
const AddtoCart = async (user = "", product) => {
  const accessToken = Cookies.get("token");
  if (user != null) {
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/cart/add",
        {
          user,
          product,
        },
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

      console.log(res);

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
    } catch (error) {
      console.log(error);
      if (error.request.status == 500) {
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: error.response.data.msg,
          confirmButtonColor: "red",
        });
      } else {
        window.location.replace("/signin");
      }
    }
  } else {
    window.location.href("/signin");
  }
};

export default AddtoCart;
