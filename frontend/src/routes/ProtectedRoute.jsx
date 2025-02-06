import axios from "axios";
import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { Navigate, useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { AccountReducer } from "../redux/featurer/AccountSlice";

const ProtectedRoute = ({ children }) => {
  const accessToken = Cookies.get("token"); // access token
  const dispatch = useDispatch(); // dispatch instance

  const navigate = useNavigate(); // navigation instance
  const [loading, setLoading] = useState(true);
  const [valid, setValid] = useState(null);

  /**
   * check admin is valid or not
   */
  const userVerify = async () => {
    try {
      let res = await axios.get(
        "http://localhost:5000/api/v1/auth/verify-user",
        {
          withCredentials: true,
        },
        // {
        //   headers: {
        //     "Content-Type": "application/json",
        //     Cookie: `token=${accessToken}`,
        //   },
        // }
      );
      if (res.status == 200) {
        setValid(true);
      }
    } catch (error) {
      dispatch(AccountReducer(null));
      console.log(error);
      setValid(false);
      Cookies.remove("token");
    } finally {
      setLoading(false); // Stop loading after verification
    }
  };

  useEffect(() => {
    userVerify();
  }, []);

  if (loading) {
    return <h1>Loading......</h1>;
  }
  if (valid) {
    return children;
  } else {
    return <Navigate to="/signin" replace />;
  }
};

export default ProtectedRoute;
