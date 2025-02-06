import React, { useState, useRef, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";

const OTPPage = () => {
  const data = useLocation();
  const [otp, setOtp] = useState(Array(6).fill(""));
  const [timer, setTimer] = useState(60);
  const inputRefs = useRef([]);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const handleChange = (index, value) => {
    if (isNaN(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    if (value && index < 5) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (index, e) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      inputRefs.current[index - 1].focus();
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const handleSubmit = async () => {
    const enteredOtp = otp.join("");
    let body = {
      email: data.state.key.email,
      otp: enteredOtp,
    };

    try {
      let res = await axios.post(
        "http://localhost:5000/api/v1/auth/otp-verify",
        body,
        { withCredentials: true },
      );

      toast.success(res.data.msg);
      setTimeout(() => navigate("/signin"), 1000);
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.msg || "OTP verification failed");
    }
  };

  const otpResend = async () => {
    try {
      await axios.post(
        "http://localhost:5000/api/v1/auth/otp-resend",
        { email: data.state.key.email },
        { withCredentials: true },
      );
      location.reload();
    } catch (error) {
      setLoading(false);
      toast.error(error.response?.data?.msg || "Failed to resend OTP");
    }
  };

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-100">
      <div className="rounded-lg bg-white p-8 text-center shadow-lg">
        <h2 className="mb-4 text-2xl font-semibold">Enter OTP</h2>
        <p className="mb-6 text-gray-600">
          We sent an OTP to your email {data?.state?.key?.email}
        </p>

        <div className="mb-6 flex justify-center space-x-4">
          {otp.map((digit, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={digit}
              onChange={(e) => handleChange(index, e.target.value)}
              onKeyDown={(e) => handleKeyDown(index, e)}
              ref={(el) => (inputRefs.current[index] = el)}
              className="h-12 w-12 rounded-lg border border-gray-300 text-center text-2xl focus:border-blue-500 focus:outline-none"
            />
          ))}
        </div>

        <p className="mb-4 text-gray-500">
          Time remaining: {formatTime(timer)}
        </p>

        <button
          className="w-full rounded-lg bg-blue-500 py-2 text-white transition hover:bg-blue-600"
          onClick={handleSubmit}
          disabled={timer === 0 || otp.some((digit) => digit === "")}
        >
          Submit OTP
        </button>

        <button
          className="mt-4 w-full rounded-lg bg-red-500 py-2 text-white transition hover:bg-red-600"
          onClick={otpResend}
        >
          OTP expired? Request a new one
        </button>
      </div>
    </div>
  );
};

export default OTPPage;
