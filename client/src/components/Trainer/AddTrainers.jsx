import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Upload, Loader } from "lucide-react";

const AddTrainers = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

  const [imageFile, setImageFile] = useState(null);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    specialization: "",
    experience: "",
    rating: "",
    joiningDate: "",
    status: "Active",
  });

  // ================= INPUT =================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ================= IMAGE =================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      // append all fields
      Object.entries(formData).forEach(([key, value]) => {
        data.append(key, value);
      });

      // append image
      if (imageFile) {
        data.append("image", imageFile);
      }

      const res = await axios.post(
        `${API}/api/trainers/addtrainer`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert(res.data.message || "Trainer created successfully");

      navigate("/trainers");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Error creating trainer");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-8">
        <Link
          to="/trainers"
          className="bg-white shadow p-3 rounded-xl hover:bg-gray-100"
        >
          <ArrowLeft size={22} />
        </Link>

        <div>
          <h1 className="text-3xl font-bold text-gray-800">
            Add Trainer
          </h1>
          <p className="text-gray-500">
            Create and manage trainer profile
          </p>
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

          {/* LEFT */}
          <div className="lg:col-span-2 space-y-6">

            <h2 className="text-xl font-bold">
              Trainer Details
            </h2>

            <div className="grid md:grid-cols-2 gap-5">

              <input
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Full Name"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Email"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Phone"
                className="border p-3 rounded-xl"
                required
              />

              <input
                name="specialization"
                value={formData.specialization}
                onChange={handleChange}
                placeholder="Specialization"
                className="border p-3 rounded-xl"
              />

              <input
                name="experience"
                value={formData.experience}
                onChange={handleChange}
                placeholder="Experience (e.g. 5 Years)"
                className="border p-3 rounded-xl"
              />

              <input
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                placeholder="Rating (0 - 5)"
                className="border p-3 rounded-xl"
              />
            </div>

            {/* DATE + STATUS */}
            <div className="grid md:grid-cols-2 gap-5">

              <input
                type="date"
                name="joiningDate"
                value={formData.joiningDate}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              />

              <select
                name="status"
                value={formData.status}
                onChange={handleChange}
                className="border p-3 rounded-xl"
              >
                <option value="Active">Active</option>
                <option value="Inactive">Inactive</option>
              </select>
            </div>
          </div>

          {/* RIGHT */}
          <div className="bg-gray-50 border border-dashed p-6 rounded-3xl flex flex-col items-center">

            <h2 className="text-xl font-bold mb-5">
              Profile Image
            </h2>

            <img
              src={preview}
              className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover"
              alt="preview"
            />

            <label className="mt-5 cursor-pointer bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2">
              <Upload size={18} />
              Upload Image
              <input
                type="file"
                hidden
                accept="image/*"
                onChange={handleImage}
              />
            </label>

            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              {loading && (
                <Loader className="animate-spin" size={18} />
              )}
              {loading ? "Saving..." : "Create Trainer"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default AddTrainers;