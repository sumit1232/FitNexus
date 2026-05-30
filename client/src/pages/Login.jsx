import React, { useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  Mail,
  Lock,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";

const Login = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] =
    useState(false);

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] =
    useState("");

  const [loading, setLoading] =
    useState(false);

  // ============================
  // Handle Input
  // ============================

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]:
        e.target.value,
    });
  };

  // ============================
  // Handle Login
  // ============================

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const res = await axios.post(
        `${API}/api/users/loginuser`,
        formData,
        {
          withCredentials: true,
        }
      );

      console.log(res.data);

      setMessage(res.data.message);

      // Store Token
      localStorage.setItem(
        "token",
        res.data.token
      );

      // Store User
      localStorage.setItem(
        "user",
        JSON.stringify(res.data.user)
      );

      // Redirect Dashboard
      navigate("/dashboard");

    } catch (err) {
      console.log(err);

      setMessage(
        err.response?.data?.message ||
          "Login Failed"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      
      <div className="w-full max-w-5xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl">

        {/* Left Section */}

        <div className="hidden lg:flex flex-col justify-center bg-gradient-to-br from-indigo-600 to-purple-700 text-white p-14 relative overflow-hidden">

          <div className="absolute top-0 left-0 w-72 h-72 bg-white/10 rounded-full -translate-x-20 -translate-y-20"></div>

          <div className="absolute bottom-0 right-0 w-80 h-80 bg-white/10 rounded-full translate-x-24 translate-y-24"></div>

          <div className="relative z-10">

            <div className="flex items-center gap-4 mb-8">
              <div className="bg-white/20 p-4 rounded-2xl">
                <Dumbbell size={40} />
              </div>

              <h1 className="text-4xl font-extrabold">
                FitNexus
              </h1>
            </div>

            <h2 className="text-5xl font-bold leading-tight mb-6">
              Welcome Back To Your Gym Dashboard
            </h2>

            <p className="text-lg text-indigo-100 leading-relaxed mb-10">
              Manage members, trainers,
              attendance, subscriptions,
              and workouts with one
              modern gym management
              platform.
            </p>

            <div className="space-y-5">

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Lock />
                </div>

                <p className="text-lg">
                  Secure Authentication
                </p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Mail />
                </div>

                <p className="text-lg">
                  Fast Login Access
                </p>
              </div>

            </div>

          </div>

        </div>

        {/* Right Section */}

        <div className="p-8 md:p-14 flex flex-col justify-center">

          <div className="mb-10">

            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Login Account
            </h2>

            <p className="text-gray-500">
              Enter your credentials to continue
            </p>

          </div>

          {message && (
            <div className="mb-5 bg-red-100 text-red-600 px-4 py-3 rounded-2xl text-sm font-medium">
              {message}
            </div>
          )}

          <form
            onSubmit={handleSubmit}
            className="space-y-6"
          >

            {/* Email */}

            <div>

              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">

                <Mail
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type="email"
                  name="email"
                  placeholder="Enter your email"
                  className="w-full outline-none bg-transparent"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />

              </div>

            </div>

            {/* Password */}

            <div>

              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Password
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">

                <Lock
                  className="text-gray-400 mr-3"
                  size={20}
                />

                <input
                  type={
                    showPassword
                      ? "text"
                      : "password"
                  }
                  name="password"
                  placeholder="Enter your password"
                  className="w-full outline-none bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() =>
                    setShowPassword(
                      !showPassword
                    )
                  }
                >
                  {showPassword ? (
                    <EyeOff
                      className="text-gray-400"
                      size={20}
                    />
                  ) : (
                    <Eye
                      className="text-gray-400"
                      size={20}
                    />
                  )}
                </button>

              </div>

            </div>

            {/* Button */}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
            >

              {loading
                ? "Logging In..."
                : "Login Now"}

              {!loading && (
                <ArrowRight size={20} />
              )}

            </button>

            {/* Register */}

            <p className="text-center text-gray-600">
              Don't have an account?{" "}

              <Link
                to="/register"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Register
              </Link>

            </p>

          </form>

        </div>

      </div>

    </div>
  );
};

export default Login;