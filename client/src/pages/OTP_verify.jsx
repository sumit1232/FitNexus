import React, {
  useRef,
  useState,
} from "react";

import axios from "axios";

import {
  useNavigate,
} from "react-router-dom";

const OTP_verify = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate =
    useNavigate();

  const [otp, setOtp] =
    useState([
      "",
      "",
      "",
      "",
    ]);

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  const inputRefs = [
    useRef(null),
    useRef(null),
    useRef(null),
    useRef(null),
  ];

  // ============================
  // Handle OTP Change
  // ============================

  const handleChange = (
    value,
    index
  ) => {

    // Only numbers
    if (!/^\d?$/.test(value))
      return;

    const newOtp = [...otp];

    newOtp[index] = value;

    setOtp(newOtp);

    // Move Next
    if (
      value &&
      index < 3
    ) {
      inputRefs[
        index + 1
      ].current.focus();
    }
  };

  // ============================
  // Handle Backspace
  // ============================

  const handleKeyDown = (
    e,
    index
  ) => {

    if (
      e.key ===
        "Backspace" &&
      !otp[index] &&
      index > 0
    ) {
      inputRefs[
        index - 1
      ].current.focus();
    }
  };

  // ============================
  // Submit OTP
  // ============================

  const handleSubmit = async (
    e
  ) => {

    e.preventDefault();

    const finalOtp =
      otp.join("");

    console.log(
      "FINAL OTP:",
      finalOtp
    );

    // Validate OTP
    if (
      finalOtp.length !== 4
    ) {
      return setMessage(
        "Please enter 4 digit OTP"
      );
    }

    try {

      setLoading(true);

      setMessage("");

      // ============================
      // API Request
      // ============================

      const res =
        await axios.post(
          `${API}/api/users/verifyotp`,
          {
            otp:
              finalOtp,
          }
        );

      console.log(
        "VERIFY RESPONSE:",
        res.data
      );

      setMessage(
        res.data.message
      );

      // Redirect
      setTimeout(() => {
        navigate("/login");
      }, 1000);

    } catch (err) {

      console.log(
        "VERIFY ERROR:",
        err
      );

      setMessage(
        err.response?.data
          ?.message ||
          "Invalid OTP"
      );

    } finally {

      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-100 via-white to-purple-100 px-4">

      <div className="bg-white p-8 rounded-3xl shadow-2xl w-full max-w-md">

        {/* Heading */}

        <h2 className="text-4xl font-bold text-center text-gray-800 mb-3">
          OTP Verification
        </h2>

        <p className="text-center text-gray-500 mb-8">
          Enter the 4 digit OTP sent to your email
        </p>

        {/* Message */}

        {message && (
          <p className="text-center mb-5 text-red-500 font-medium">
            {message}
          </p>
        )}

        {/* Form */}

        <form
          onSubmit={
            handleSubmit
          }
        >

          {/* OTP Inputs */}

          <div className="flex justify-center gap-4 mb-8">

            {otp.map(
              (
                digit,
                index
              ) => (
                <input
                  key={index}
                  type="text"
                  maxLength={1}
                  value={digit}
                  ref={
                    inputRefs[
                      index
                    ]
                  }
                  onChange={(e) =>
                    handleChange(
                      e.target
                        .value,
                      index
                    )
                  }
                  onKeyDown={(e) =>
                    handleKeyDown(
                      e,
                      index
                    )
                  }
                  className="w-16 h-16 border-2 border-gray-300 rounded-2xl text-center text-2xl font-bold outline-none focus:border-indigo-600 transition"
                />
              )
            )}

          </div>

          {/* Button */}

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold transition duration-300"
          >
            {loading
              ? "Verifying..."
              : "Verify OTP"}
          </button>

        </form>

      </div>

    </div>
  );
};

export default OTP_verify;