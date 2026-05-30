import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Plus,
  Trash2,
  Dumbbell,
  Search,
  Menu,
  Clock3,
  Flame,
  Layers3,
  Activity,
} from "lucide-react";

import Sidebar from "../Sidebar";

const Workouts = () => {
  const API = import.meta.env.VITE_API_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= FETCH WORKOUTS =================
  const fetchWorkouts = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/workouts/all`
      );

      setWorkouts(res.data.workouts || []);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchWorkouts();
  }, []);

  // ================= DELETE =================
  const deleteWorkout = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this workout?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/api/workouts/delete/${id}`
      );

      setWorkouts((prev) =>
        prev.filter((w) => w._id !== id)
      );
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  // ================= FILTER =================
  const filteredWorkouts = workouts.filter((w) =>
    w.title
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gray-100 flex">

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">

        {/* ================= HEADER ================= */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-white p-3 rounded-xl shadow"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Workout Plans
              </h1>

              <p className="text-gray-500 mt-1">
                Manage gym workout routines
              </p>
            </div>

          </div>

          <Link
            to="/addworkouts"
            className="bg-blue-600 hover:bg-blue-700 transition text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow"
          >
            <Plus size={18} />
            Add Workout
          </Link>

        </div>

        {/* ================= SEARCH ================= */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8 flex items-center gap-3">

          <Search size={18} className="text-gray-400" />

          <input
            type="text"
            placeholder="Search workouts..."
            className="w-full outline-none text-gray-700"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

        </div>

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="text-center py-20 text-gray-500 text-lg">
            Loading workouts...
          </div>
        ) : filteredWorkouts.length === 0 ? (
          <div className="bg-white rounded-2xl shadow p-10 text-center">

            <Dumbbell
              size={50}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Workouts Found
            </h2>

            <p className="text-gray-500 mt-2">
              Create your first workout plan.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredWorkouts.map((workout) => (
              <div
                key={workout._id}
                className="bg-white rounded-3xl overflow-hidden shadow hover:shadow-2xl transition duration-300"
              >

                {/* IMAGE */}
                <div className="h-56 bg-gray-200 overflow-hidden">

                  {workout.image ? (
                    <img
                      src={`${API}/uploads/${workout.image}`}
                      alt={workout.title}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <Dumbbell
                        size={50}
                        className="text-gray-400"
                      />
                    </div>
                  )}

                </div>

                {/* CONTENT */}
                <div className="p-6">

                  {/* TOP */}
                  <div className="flex items-start justify-between gap-3">

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        {workout.title}
                      </h2>

                      <p className="text-blue-600 font-medium mt-1">
                        {workout.category}
                      </p>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-semibold ${
                        workout.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {workout.status}
                    </span>

                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-500 text-sm mt-4 leading-relaxed">
                    {workout.description}
                  </p>

                  {/* DETAILS */}
                  <div className="grid grid-cols-2 gap-4 mt-5">

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Clock3 size={16} />
                        Duration
                      </div>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {workout.duration} Min
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Flame size={16} />
                        Calories
                      </div>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {workout.caloriesBurn || 0}
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Layers3 size={16} />
                        Level
                      </div>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {workout.level}
                      </h3>
                    </div>

                    <div className="bg-gray-50 rounded-2xl p-3">
                      <div className="flex items-center gap-2 text-gray-500 text-sm">
                        <Activity size={16} />
                        Exercises
                      </div>

                      <h3 className="font-bold text-gray-800 mt-1">
                        {workout.exercises?.length || 0}
                      </h3>
                    </div>

                  </div>

                  {/* EXERCISES */}
                  {workout.exercises?.length > 0 && (
                    <div className="mt-6">

                      <h3 className="font-semibold text-gray-800 mb-3">
                        Exercise List
                      </h3>

                      <div className="space-y-2">

                        {workout.exercises.map((ex, i) => (
                          <div
                            key={i}
                            className="bg-gray-50 rounded-xl p-3"
                          >

                            <div className="flex justify-between items-center">

                              <h4 className="font-medium text-gray-800">
                                {ex.name}
                              </h4>

                              <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full">
                                {ex.sets} Sets
                              </span>

                            </div>

                            <div className="flex gap-4 mt-2 text-sm text-gray-500">

                              <span>
                                Reps: {ex.reps}
                              </span>

                              <span>
                                Weight: {ex.weight}kg
                              </span>

                            </div>

                          </div>
                        ))}

                      </div>

                    </div>
                  )}

                  {/* BUTTONS */}
                  <div className="mt-6 flex gap-3">

                    <button
                      onClick={() =>
                        deleteWorkout(workout._id)
                      }
                      className="flex-1 bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 size={18} />
                      Delete
                    </button>

                  </div>

                </div>

              </div>
            ))}

          </div>
        )}

      </div>

    </div>
  );
};

export default Workouts;