import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate, useParams, Link } from "react-router-dom";
import { ArrowLeft, Upload, Loader } from "lucide-react";

const EditTrainers = () => {
  const API = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);
  const [fetching, setFetching] = useState(true);

  const [imageFile, setImageFile] = useState(null);

  const [preview, setPreview] = useState(
    "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
  );

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

  // ======================
  // FETCH TRAINER
  // ======================
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axios.get(
          `${API}/api/trainers/singletrainer/${id}`
        );

        const t = res.data?.trainer;

        setFormData({
          name: t.name || "",
          email: t.email || "",
          phone: t.phone || "",
          specialization: t.specialization || "",
          experience: t.experience || "",
          rating: t.rating || "",
          joiningDate: t.joiningDate
            ? t.joiningDate.split("T")[0]
            : "",
          status: t.status || "Active",
        });

        if (t.image) {
          setPreview(`${API}/uploads/${t.image}`);
        }
      } catch (error) {
        console.log(error);
        alert("Failed to fetch trainer");
      } finally {
        setFetching(false);
      }
    };

    fetchTrainer();
  }, [id]);

  // ======================
  // HANDLE INPUT
  // ======================
  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  // ======================
  // IMAGE HANDLER
  // ======================
  const handleImage = (e) => {
    const file = e.target.files[0];

    if (file) {
      setImageFile(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  // ======================
  // UPDATE TRAINER
  // ======================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const data = new FormData();

      Object.keys(formData).forEach((key) => {
        data.append(key, formData[key]);
      });

      if (imageFile) {
        data.append("image", imageFile);
      }

      await axios.put(
        `${API}/api/trainers/updatetrainer/${id}`,
        data,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      alert("Trainer updated successfully");
      navigate("/trainers");
    } catch (error) {
      console.log(error);
      alert(error.response?.data?.message || "Update failed");
    } finally {
      setLoading(false);
    }
  };

  // ======================
  // LOADING UI
  // ======================
  if (fetching) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600">Loading trainer...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">

      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <Link
          to="/trainers"
          className="bg-white shadow p-3 rounded-xl hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </Link>

        <h1 className="text-2xl font-bold text-gray-800">
          Edit Trainer
        </h1>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="bg-white rounded-3xl shadow-md p-8 grid grid-cols-1 md:grid-cols-3 gap-8"
      >

        {/* LEFT SIDE */}
        <div className="md:col-span-2 space-y-5">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <input
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Name"
              className="border p-3 rounded-xl"
            />

            <input
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="Email"
              className="border p-3 rounded-xl"
            />

            <input
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone"
              className="border p-3 rounded-xl"
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
              placeholder="Experience"
              className="border p-3 rounded-xl"
            />

            <input
              name="rating"
              value={formData.rating}
              onChange={handleChange}
              placeholder="Rating"
              className="border p-3 rounded-xl"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

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

        {/* RIGHT SIDE */}
        <div className="bg-gray-50 border border-dashed rounded-3xl p-6 flex flex-col items-center">

          <img
            src={preview}
            alt="trainer"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover mb-5"
          />

          <label className="bg-blue-600 text-white px-5 py-3 rounded-xl cursor-pointer flex items-center gap-2">
            <Upload size={18} />
            Change Image
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
            {loading ? "Updating..." : "Update Trainer"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default EditTrainers;