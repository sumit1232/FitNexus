import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  Dumbbell,
  User,
  Mail,
  Lock,
  Phone,
  ImagePlus,
  Eye,
  EyeOff,
  ArrowRight,
} from "lucide-react";
import axios from "axios";

const Register = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);

  const [formData, setFormData] = useState({
    fullname: "",
    email: "",
    phone: "",
    password: "",
    profile: null,
  });

  const [preview, setPreview] = useState(null);
  const [loading, setLoading] = useState(false);

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image
  const handleImage = (e) => {
    const file = e.target.files[0];

    setFormData({
      ...formData,
      profile: file,
    });

    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  // Submit
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setLoading(true);

    const data = new FormData();

    data.append("fullname", formData.fullname);
    data.append("email", formData.email);
    data.append("phone", formData.phone);
    data.append("password", formData.password);

    if (formData.profile) {
      data.append("profile", formData.profile);
    }

    const res = await axios.post(
      `${API}/api/users/registeruser`,
      data,
      {
        withCredentials: true,
      }
    );

    if (res.data.success) {

      alert(res.data.message);

      // Save Email For OTP Page
      localStorage.setItem(
        "verifyEmail",
        formData.email
      );

      // Redirect
    navigate("/otp-verify", {
  state: {
    email: formData.email,
  },
});

    }

  } catch (error) {

    console.log(error);

    alert(
      error.response?.data?.message ||
      "Registration Failed"
    );

  } finally {

    setLoading(false);

  }
};

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-white to-purple-100 flex items-center justify-center px-4 py-10">
      <div className="w-full max-w-6xl grid lg:grid-cols-2 bg-white rounded-[40px] overflow-hidden shadow-2xl">

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
              Join The Future Of Fitness Management
            </h2>

            <p className="text-lg text-indigo-100 leading-relaxed mb-10">
              Create your account and manage members, trainers, attendance,
              payments, and fitness activities with one modern platform.
            </p>

            <div className="space-y-5">
              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <User />
                </div>

                <p className="text-lg">Smart Member Management</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <Lock />
                </div>

                <p className="text-lg">Secure JWT Authentication</p>
              </div>

              <div className="flex items-center gap-4">
                <div className="bg-white/20 p-3 rounded-xl">
                  <ImagePlus />
                </div>

                <p className="text-lg">Profile Upload Support</p>
              </div>
            </div>
          </div>
        </div>

        {/* Right Section */}
        <div className="p-8 md:p-14">
          <div className="mb-10">
            <h2 className="text-4xl font-bold text-gray-800 mb-3">
              Create Account
            </h2>

            <p className="text-gray-500">
              Register your gym management account
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">

            {/* Full Name */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Full Name
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">
                <User className="text-gray-400 mr-3" size={20} />

                <input
                  type="text"
                  name="fullname"
                  placeholder="Enter your full name"
                  className="w-full outline-none bg-transparent"
                  value={formData.fullname}
                  onChange={handleChange}
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Email Address
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">
                <Mail className="text-gray-400 mr-3" size={20} />

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

            {/* Phone */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Phone Number
              </label>

              <div className="flex items-center border rounded-2xl px-4 py-3 focus-within:border-indigo-600 transition-all">
                <Phone className="text-gray-400 mr-3" size={20} />

                <input
                  type="text"
                  name="phone"
                  placeholder="Enter phone number"
                  className="w-full outline-none bg-transparent"
                  value={formData.phone}
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
                <Lock className="text-gray-400 mr-3" size={20} />

                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  placeholder="Create password"
                  className="w-full outline-none bg-transparent"
                  value={formData.password}
                  onChange={handleChange}
                  required
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="text-gray-400" size={20} />
                  ) : (
                    <Eye className="text-gray-400" size={20} />
                  )}
                </button>
              </div>
            </div>

            {/* Profile Upload */}
            <div>
              <label className="block text-sm font-semibold mb-2 text-gray-700">
                Upload Profile
              </label>

              <label className="border-2 border-dashed rounded-3xl p-6 flex flex-col items-center justify-center cursor-pointer hover:border-indigo-600 transition-all">
                <ImagePlus className="text-indigo-600 mb-3" size={40} />

                <p className="text-gray-600 font-medium">
                  Click to upload profile image
                </p>

                <input
                  type="file"
                  className="hidden"
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>

              {preview && (
                <div className="mt-4 flex justify-center">
                  <img
                    src={preview}
                    alt="Preview"
                    className="w-24 h-24 rounded-full object-cover border-4 border-indigo-100 shadow-md"
                  />
                </div>
              )}
            </div>

            {/* Button */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-4 rounded-2xl font-bold flex items-center justify-center gap-2 transition-all duration-300 shadow-xl"
            >
              {loading ? "Creating Account..." : "Register Now"}

              {!loading && <ArrowRight size={20} />}
            </button>

            {/* Login */}
            <p className="text-center text-gray-600">
              Already have an account?{" "}
              <Link
                to="/login"
                className="text-indigo-600 font-semibold hover:underline"
              >
                Login
              </Link>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;