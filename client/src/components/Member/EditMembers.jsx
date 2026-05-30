import React, { useEffect, useState } from "react";
import axios from "axios";
import { Upload, ArrowLeft, Loader2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";

const EditMembers = () => {
  const API = import.meta.env.VITE_API_URL;

  const { id } = useParams();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetchLoading, setFetchLoading] = useState(true);

  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

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
    status: "Active",
    height: "",
    weight: "",
    bmi: "",
    trainer: "",
  });

  // =========================================
  // FETCH SINGLE MEMBER
  // =========================================
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setFetchLoading(true);

        const response = await axios.get(
          `${API}/api/members/singlemember/${id}`
        );

        const member = response.data.member;

        setFormData({
          name: member.name || "",
          email: member.email || "",
          phone: member.phone || "",
          age: member.age || "",
          gender: member.gender || "",
          address: member.address || "",
          membership: member.membership || "Basic",
          joiningDate: member.joiningDate
            ? new Date(member.joiningDate)
                .toISOString()
                .split("T")[0]
            : "",
          emergencyContact:
            member.emergencyContact || "",
          medicalIssues: member.medicalIssues || "",
          status: member.status || "Active",
          height: member.height || "",
          weight: member.weight || "",
          bmi: member.bmi || "",
          trainer: member.trainer || "",
        });

        // =========================================
        // IMAGE PREVIEW
        // =========================================
        if (member.image) {
          // If image already full URL
          if (member.image.startsWith("http")) {
            setPreview(member.image);
          } else {
            setPreview(
              `${API}/uploads/${member.image}`
            );
          }
        }
      } catch (error) {
        console.log(error);

        alert(
          error.response?.data?.message ||
            "Failed to fetch member"
        );
      } finally {
        setFetchLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  // =========================================
  // HANDLE INPUT
  // =========================================
  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  // =========================================
  // HANDLE IMAGE
  // =========================================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);

      setPreview(URL.createObjectURL(file));
    }
  };

  // =========================================
  // HANDLE SUBMIT
  // =========================================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.entries(formData).forEach(
        ([key, value]) => {
          data.append(key, value);
        }
      );

      // Append Image
      if (imageFile) {
        data.append("image", imageFile);
      }

      const response = await axios.put(
        `${API}/api/members/updatemember/${id}`,
        data,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      );

      alert(response.data.message);

      navigate("/members");
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
          "Something went wrong"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // LOADING
  // =========================================
  if (fetchLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-blue-600 text-xl font-semibold">
          <Loader2
            className="animate-spin"
            size={28}
          />
          Loading Member...
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/members"
              className="bg-white shadow p-3 rounded-xl hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} />
            </Link>

            <h1 className="text-3xl font-bold text-gray-800">
              Edit Member
            </h1>
          </div>

          <p className="text-gray-500">
            Update gym member information.
          </p>
        </div>

        <div className="bg-blue-100 text-blue-700 px-5 py-3 rounded-xl font-semibold">
          Member ID: #{id?.slice(-6)}
        </div>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-6 md:p-8"
      >
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* LEFT */}
          <div className="lg:col-span-2 space-y-8">
            {/* BASIC INFO */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Basic Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Name */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Full Name
                  </label>

                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    placeholder="Enter full name"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Email */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Email Address
                  </label>

                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="Enter email"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Phone */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Phone Number
                  </label>

                  <input
                    type="text"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    placeholder="Enter phone number"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Age */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Age
                  </label>

                  <input
                    type="number"
                    name="age"
                    value={formData.age}
                    onChange={handleChange}
                    placeholder="Enter age"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Gender */}
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
                    <option value="">
                      Select Gender
                    </option>

                    <option value="Male">
                      Male
                    </option>

                    <option value="Female">
                      Female
                    </option>

                    <option value="Other">
                      Other
                    </option>
                  </select>
                </div>

                {/* Membership */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Membership Plan
                  </label>

                  <select
                    name="membership"
                    value={formData.membership}
                    onChange={handleChange}
                    required
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="Basic">
                      Basic
                    </option>

                    <option value="Premium">
                      Premium
                    </option>

                    <option value="Gold">
                      Gold
                    </option>
                  </select>
                </div>

                {/* Height */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Height (cm)
                  </label>

                  <input
                    type="text"
                    name="height"
                    value={formData.height}
                    onChange={handleChange}
                    placeholder="Enter height"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Weight */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Weight (kg)
                  </label>

                  <input
                    type="text"
                    name="weight"
                    value={formData.weight}
                    onChange={handleChange}
                    placeholder="Enter weight"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* BMI */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    BMI
                  </label>

                  <input
                    type="text"
                    name="bmi"
                    value={formData.bmi}
                    onChange={handleChange}
                    placeholder="Enter BMI"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>

                {/* Trainer */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Trainer
                  </label>

                  <input
                    type="text"
                    name="trainer"
                    value={formData.trainer}
                    onChange={handleChange}
                    placeholder="Assigned trainer"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* ADDRESS */}
            <div>
              <label className="block mb-2 font-medium text-gray-700">
                Address
              </label>

              <textarea
                rows="4"
                name="address"
                value={formData.address}
                onChange={handleChange}
                placeholder="Enter address"
                className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* ADDITIONAL DETAILS */}
            <div>
              <h2 className="text-xl font-bold text-gray-800 mb-5">
                Additional Details
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                {/* Joining Date */}
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

                {/* Emergency Contact */}
                <div>
                  <label className="block mb-2 font-medium text-gray-700">
                    Emergency Contact
                  </label>

                  <input
                    type="text"
                    name="emergencyContact"
                    value={
                      formData.emergencyContact
                    }
                    onChange={handleChange}
                    placeholder="Emergency contact"
                    className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </div>
              </div>

              {/* Medical Issues */}
              <div className="mt-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Medical Issues
                </label>

                <textarea
                  rows="4"
                  name="medicalIssues"
                  value={formData.medicalIssues}
                  onChange={handleChange}
                  placeholder="Mention any medical issues"
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Status */}
              <div className="mt-5">
                <label className="block mb-2 font-medium text-gray-700">
                  Status
                </label>

                <select
                  name="status"
                  value={formData.status}
                  onChange={handleChange}
                  className="w-full border border-gray-300 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                >
                  <option value="Active">
                    Active
                  </option>

                  <option value="Inactive">
                    Inactive
                  </option>
                </select>
              </div>
            </div>
          </div>

          {/* RIGHT */}
          <div>
            <div className="bg-gray-50 border border-dashed border-gray-300 rounded-3xl p-6 flex flex-col items-center">
              <h2 className="text-xl font-bold text-gray-800 mb-6">
                Profile Upload
              </h2>

              {/* Preview */}
              <div className="w-40 h-40 rounded-full overflow-hidden border-4 border-blue-500 mb-5">
                <img
                  src={preview}
                  alt="preview"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Upload */}
              <label className="cursor-pointer bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl flex items-center gap-2 transition">
                <Upload size={20} />
                Change Photo

                <input
                  type="file"
                  hidden
                  accept="image/*"
                  onChange={handleImage}
                />
              </label>

              <p className="text-sm text-gray-500 mt-4 text-center">
                Update member profile image.
              </p>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full mt-6 bg-green-600 hover:bg-green-700 disabled:bg-green-400 text-white py-4 rounded-2xl text-lg font-semibold transition"
            >
              {loading
                ? "Updating Member..."
                : "Update Member"}
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EditMembers;