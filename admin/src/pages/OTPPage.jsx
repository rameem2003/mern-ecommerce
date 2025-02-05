import React, { useState, useRef, useEffect } from "react";
import { Button, Typography } from "@material-tailwind/react";
import { useLocation, useNavigate } from "react-router";
import { Bounce, toast } from "react-toastify";
import axios from "axios";

const OTPPage = () => {
  const data = useLocation();

  const [otp, setOtp] = useState(Array(6).fill("")); // OTP with 6 digits
  const [timer, setTimer] = useState(60); // 1-minute timer
  const inputRefs = useRef([]); // Refs for OTP input fields
  const [loading, setLoading] = useState(false); // loading state
  const navigate = useNavigate(); // navigation instance

  // Handle OTP input change
  const handleChange = (index, value) => {
    if (isNaN(value)) return; // Allow only numbers
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus to the next input
    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  // Handle backspace key
  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  // Start the countdown timer
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  // Format timer into minutes and seconds
  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  // Handle OTP submission
  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    // alert(`OTP Submitted: ${enteredOtp}`);

    let body = {
      email: data.state.key.email,
      otp: enteredOtp,
    };

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/otp-verify",
        body,
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
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

      setTimeout(() => {
        navigate("/login");
      }, 1000);
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.msg, {
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
  };

  // function for otp resend
  const otpResend = async () => {
    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/otp-resend",
        { email: data.state.key.email },
        {
          withCredentials: true,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log(res);
      location.reload();
    } catch (error) {
      setLoading(false);
      console.log(error);
      toast.error(error.response.data.msg, {
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
  };
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg">
        <Typography variant="h4" className="mb-6 text-center">
          Enter OTP
        </Typography>
        <Typography variant="h5" className="mb-6 text-center">
          We sent an OTP into your email {data.state.key.email}
        </Typography>

        <div className="flex space-x-4 mb-6 justify-center">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="w-12 h-12 text-center text-2xl border border-gray-300 rounded-lg focus:outline-none focus:border-blue-500"
            />
          ))}
        </div>

        <Typography variant="paragraph" className="text-center mb-6">
          Time remaining: {formatTime(timer)}
        </Typography>

        <Button
          fullWidth
          color="blue"
          onClick={handleSubmit}
          disabled={timer === 0 || otp.some((digit) => digit === "")}
        >
          Submit OTP
        </Button>

        {/* {timer === 0 && (
        <Button
          onClick={otpResend}
          variant="small"
          className="text-white w-full text-center mt-4 bg-red-400"
        >
          OTP expired. Please request a new one.
        </Button>
        )} */}
        <Button
          onClick={otpResend}
          variant="small"
          className="text-white w-full text-center mt-4 bg-red-400"
        >
          OTP expired? Please request a new one.
        </Button>
      </div>
    </div>
  );
};

export default OTPPage;
