import React, { useState } from "react";
import axios from "axios";
import { Upload, ArrowLeft } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";

const AddMembers = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [preview, setPreview] = useState(null);

  const [loading, setLoading] = useState(false);

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    gender: "",
    address: "",
    membership: "Basic",
    joiningDate: "",
    emergencyContact: "",
    medicalIssues: "",
  });

  // Handle Input
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // Handle Image Upload
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // Handle Submit
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // Append all fields
      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      // Append image
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.post(
        `${API}/api/members/addmember`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      // Reset Form
      setFormData({
        name: "",
        email: "",
        phone: "",
        age: "",
        gender: "",
        address: "",
        membership: "",
        joiningDate: "",
        emergencyContact: "",
        medicalIssues: "",
      });

      setPreview(null);
      setImageFile(null);

      // Redirect
      navigate("/members");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message || "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/members"
              className="bg-white shadow p-3 rounded-xl hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} />
            </Link>

            <h1 className="text-3xl font-bold text-gray-800">
              Add New Member
            </h1>
          </div>

          <p className="text-gray-500">
            Register a new gym member with complete details.
          </p>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Side */}
          <div className="lg:col-span-2 space-y-6">
            {/* Basic Info */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    placeholder="Enter full name"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    placeholder="Enter email"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    placeholder="Enter phone number"
                    value={formData.phone}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    placeholder="Enter age"
                    value={formData.age}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Gender
                  </label>

                  <select
                    name="gender"
                    value={formData.gender}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Gender</option>

                    <option value="Male">Male</option>

                    <option value="Female">Female</option>

                    <option value="Other">Other</option>
                  </select>
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Membership Plan
                  </label>

                  <select
                    name="membership"
                    value={formData.membership}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="">Select Plan</option>

                    <option value="Basic">Basic</option>

                    <option value="Premium">Premium</option>

                    <option value="Gold">Gold</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Address */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                placeholder="Enter address"
                value={formData.address}
                onChange={handleChange}
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Extra Details */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Additional Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Joining Date
                  </label>

                  <input
                    type="date"
                    name="joiningDate"
                    value={formData.joiningDate}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Emergency Contact
                  </label>

                  <input
                    type="text"
                    name="emergencyContact"
                    placeholder="Emergency contact number"
                    value={formData.emergencyContact}
                    onChange={handleChange}
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              <div className="mt-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Medical Issues
                </label>

                <textarea
                  rows="4"
                  name="medicalIssues"
                  placeholder="Mention any medical issues"
                  value={formData.medicalIssues}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>
          </div>

          {/* Right Side */}
          <div>
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Profile Upload
              </h2>

              {/* Preview */}
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-5">
                <img
                  src={
                    preview ||
                    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload */}
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">
                <Upload size={20} />
                Upload Photo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Upload member profile image.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              {loading ? "Adding Member..." : "Add Member"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddMembers;