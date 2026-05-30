import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Save, ArrowLeft, Menu } from "lucide-react";

import Sidebar from "../Sidebar";

const AddPlans = () => {
  const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    name: "",
    price: "",
    duration: "",
    description: "",
    type: "",
    accessLevel: "",
    isFreezeAllowed: false,
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  // TEXT CHANGE
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    setForm({
      ...form,
      [name]: type === "checkbox" ? checked : value,
    });
  };

  // IMAGE CHANGE
  const handleImage = (e) => {
    setImage(e.target.files[0]);
  };

  // SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();

      formData.append("name", form.name);
      formData.append("price", form.price);
      formData.append("duration", form.duration);
      formData.append("description", form.description);
      formData.append("type", form.type);
      formData.append("accessLevel", form.accessLevel);
      formData.append("isFreezeAllowed", form.isFreezeAllowed);

      if (image) {
        formData.append("image", image);
      }

      await axios.post(
        `${API}/api/plans/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Plan added successfully");
      navigate("/plans");
    } catch (err) {
      console.log(err);
      alert("Failed to add plan");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-4">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-white p-3 rounded-xl shadow"
            >
              <Menu />
            </button>

            <h1 className="text-3xl font-bold text-gray-800">
              Add Membership Plan
            </h1>

          </div>

          <Link
            to="/plans"
            className="flex items-center gap-2 text-gray-600 bg-white px-4 py-2 rounded-xl shadow hover:bg-gray-50"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

        </div>

        {/* FORM */}
        <div className="max-w-2xl mx-auto bg-white p-6 rounded-2xl shadow">

          <form onSubmit={handleSubmit} className="space-y-4">

            {/* IMAGE */}
            <input
              type="file"
              accept="image/*"
              onChange={handleImage}
              className="w-full border p-3 rounded-xl"
            />

            {/* NAME */}
            <input
              type="text"
              name="name"
              placeholder="Plan Name"
              value={form.name}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            {/* PRICE */}
            <input
              type="number"
              name="price"
              placeholder="Price"
              value={form.price}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            {/* DURATION */}
            <input
              type="number"
              name="duration"
              placeholder="Duration (Days)"
              value={form.duration}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
              required
            />

            {/* TYPE */}
            <select
              name="type"
              value={form.type}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            >
              <option value="">Select Plan Type</option>
              <option value="Basic">Basic</option>
              <option value="Premium">Premium</option>
              <option value="Gold">Gold</option>
            </select>

            {/* ACCESS LEVEL */}
            <input
              type="text"
              name="accessLevel"
              placeholder="Access Level (Gym / All / Premium Zones)"
              value={form.accessLevel}
              onChange={handleChange}
              className="w-full border p-3 rounded-xl"
            />

            {/* DESCRIPTION */}
            <textarea
              name="description"
              placeholder="Description"
              value={form.description}
              onChange={handleChange}
              rows="4"
              className="w-full border p-3 rounded-xl"
            />

            {/* FREEZE OPTION */}
            <label className="flex items-center gap-2">
              <input
                type="checkbox"
                name="isFreezeAllowed"
                checked={form.isFreezeAllowed}
                onChange={handleChange}
              />
              Freeze Allowed
            </label>

            {/* SUBMIT */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-blue-600 text-white py-3 rounded-xl flex items-center justify-center gap-2"
            >
              <Save size={18} />
              {loading ? "Saving..." : "Save Plan"}
            </button>

          </form>

        </div>

      </div>
    </div>
  );
};

export default AddPlans;