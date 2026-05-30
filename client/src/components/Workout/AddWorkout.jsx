import React, { useState } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import { Save, ArrowLeft, Plus, X, Menu } from "lucide-react";
import Sidebar from "../Sidebar";

const AddWorkouts = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [form, setForm] = useState({
    title: "",
    category: "",
    duration: "",
    description: "",
  });

  const [image, setImage] = useState(null);
  const [loading, setLoading] = useState(false);

  const [exercises, setExercises] = useState([
    { name: "", sets: "", reps: "", weight: "" },
  ]);

  // ================= INPUT =================
  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  // ================= EXERCISES =================
  const addExercise = () => {
    setExercises([
      ...exercises,
      { name: "", sets: "", reps: "", weight: "" },
    ]);
  };

  const updateExercise = (index, field, value) => {
    const updated = [...exercises];
    updated[index][field] = value;
    setExercises(updated);
  };

  const removeExercise = (index) => {
    setExercises(exercises.filter((_, i) => i !== index));
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      const formData = new FormData();
      formData.append("title", form.title);
      formData.append("category", form.category);
      formData.append("duration", form.duration);
      formData.append("description", form.description);
      formData.append("exercises", JSON.stringify(exercises));

      if (image) formData.append("image", image);

      await axios.post(
        `${API}/api/workouts/add`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      alert("Workout created successfully");
      navigate("/workouts");
    } catch (err) {
      console.log(err);
      alert("Failed to create workout");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

      <div className="flex-1 p-6">

        {/* HEADER */}
        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">
            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-white p-2 rounded-xl shadow"
            >
              <Menu />
            </button>

            <h1 className="text-3xl font-bold">
              Add Workout
            </h1>
          </div>

          <Link
            to="/workouts"
            className="bg-white px-4 py-2 rounded-xl shadow flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Link>
        </div>

        {/* FORM */}
        <form
          onSubmit={handleSubmit}
          className="bg-white p-6 rounded-2xl shadow max-w-3xl space-y-4"
        >

          {/* TITLE */}
          <input
            type="text"
            name="title"
            placeholder="Workout Title"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
            required
          />

          {/* CATEGORY */}
          <input
            type="text"
            name="category"
            placeholder="Category (Chest, Back, Legs...)"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          {/* DURATION */}
          <input
            type="number"
            name="duration"
            placeholder="Duration (Minutes)"
            className="w-full border p-3 rounded-xl"
            onChange={handleChange}
          />

          {/* DESCRIPTION */}
          <textarea
            name="description"
            placeholder="Description"
            className="w-full border p-3 rounded-xl"
            rows="3"
            onChange={handleChange}
          />

          {/* IMAGE */}
          <input
            type="file"
            onChange={(e) => setImage(e.target.files[0])}
          />

          {/* EXERCISES */}
          <div>
            <div className="flex justify-between mb-2">
              <h2 className="font-semibold">Exercises</h2>

              <button
                type="button"
                onClick={addExercise}
                className="text-blue-600 flex items-center gap-1"
              >
                <Plus size={16} /> Add
              </button>
            </div>

            {exercises.map((ex, i) => (
              <div key={i} className="grid grid-cols-4 gap-2 mb-2">

                <input
                  placeholder="Name"
                  value={ex.name}
                  onChange={(e) =>
                    updateExercise(i, "name", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                />

                <input
                  placeholder="Sets"
                  value={ex.sets}
                  onChange={(e) =>
                    updateExercise(i, "sets", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                />

                <input
                  placeholder="Reps"
                  value={ex.reps}
                  onChange={(e) =>
                    updateExercise(i, "reps", e.target.value)
                  }
                  className="border p-2 rounded-xl"
                />

                <button
                  type="button"
                  onClick={() => removeExercise(i)}
                  className="bg-red-100 text-red-600 rounded-xl"
                >
                  <X size={16} />
                </button>

              </div>
            ))}
          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-blue-600 text-white p-3 rounded-xl"
          >
            <Save size={18} />
            {loading ? "Saving..." : "Save Workout"}
          </button>

        </form>
      </div>
    </div>
  );
};

export default AddWorkouts;