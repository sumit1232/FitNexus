import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Search,
  Plus,
  Users,
  Mail,
  Phone,
  Star,
  Eye,
  Edit,
  Trash2,
  CalendarDays,
  Menu,
} from "lucide-react";

import Sidebar from "../Sidebar";

const Trainers = () => {
  const API = import.meta.env.VITE_API_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [trainers, setTrainers] = useState([]);
  const [search, setSearch] = useState("");

  // =========================
  // FETCH TRAINERS
  // =========================
  const fetchTrainers = async () => {
    try {
      const res = await axios.get(
        `${API}/api/trainers/alltrainers`
      );

      setTrainers(res.data?.trainers || []);
    } catch (error) {
      console.log("Fetch error:", error);
      setTrainers([]);
    }
  };

  useEffect(() => {
    fetchTrainers();
  }, []);

  // =========================
  // DELETE TRAINER
  // =========================
  const deleteTrainer = async (id) => {
    try {
      const confirmDelete = window.confirm(
        "Are you sure you want to delete this trainer?"
      );

      if (!confirmDelete) return;

      await axios.delete(
        `${API}/api/trainers/deletetrainer/${id}`
      );

      setTrainers((prev) => prev.filter((t) => t._id !== id));
    } catch (error) {
      console.log(error);
    }
  };

  // =========================
  // SEARCH FILTER (SAFE)
  // =========================
  const filteredTrainers = trainers.filter((t) =>
    (t?.name || "").toLowerCase().includes(search.toLowerCase())
  );

  // =========================
  // STATS
  // =========================
const totalTrainers = trainers.length;

const activeTrainers = trainers.filter(
  (t) => t.status === "Active"
).length;

const inactiveTrainers = trainers.filter(
  (t) => t.status !== "Active"
).length;
  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main */}
      <div className="flex-1 p-6">
        {/* HEADER */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-white p-3 rounded-xl shadow md:hidden"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Trainers Management
              </h1>
              <p className="text-gray-500">
                Manage all gym trainers
              </p>
            </div>
          </div>

          <Link
            to="/addtrainers"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-xl"
          >
            <Plus size={18} />
            Add Trainer
          </Link>
        </div>

        {/* SEARCH */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6">
          <div className="relative">
            <Search
              className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              size={18}
            />

            <input
              type="text"
              placeholder="Search trainer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full border rounded-xl py-3 pl-10 pr-4 focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

               {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Trainers */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Total Trainers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalTrainers}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>

          {/* Active Trainers */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Active Trainers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {activeTrainers}
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>

          {/* Inactive Trainers */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Inactive Trainers
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {inactiveTrainers}
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>
        </div>

    {/* TABLE SECTION */}
<div className="bg-white rounded-2xl shadow-md overflow-hidden">
  {/* Table Header */}
  <div className="p-5 border-b flex items-center justify-between">
    <h2 className="text-lg font-semibold text-gray-800">
      All Trainers
    </h2>

    <span className="text-sm text-gray-500">
      Total: {filteredTrainers.length}
    </span>
  </div>

  {/* Table */}
  <div className="overflow-x-auto">
    <table className="w-full min-w-[1000px]">
      <thead className="bg-gray-50">
        <tr className="text-left text-gray-600 text-sm uppercase tracking-wider">
          <th className="px-6 py-4">Trainer</th>
          <th className="px-6 py-4">Contact</th>
          <th className="px-6 py-4">Specialization</th>
          <th className="px-6 py-4">Experience</th>
          <th className="px-6 py-4">Rating</th>
          <th className="px-6 py-4">Joining Date</th>
          <th className="px-6 py-4">Status</th>
          <th className="px-6 py-4 text-center">Actions</th>
        </tr>
      </thead>

      <tbody className="divide-y divide-gray-100">
        {filteredTrainers.map((trainer) => (
          <tr
            key={trainer._id}
            className="hover:bg-gray-50 transition"
          >
            {/* Trainer */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-4">
                <img
                  src={
                    trainer?.image
                      ? `${API}/uploads/${trainer.image}`
                      : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                  }
                  className="w-12 h-12 rounded-full object-cover border"
                  alt="trainer"
                />

                <div>
                  <h3 className="font-semibold text-gray-800">
                    {trainer?.name}
                  </h3>
                  <p className="text-xs text-gray-500">
                    ID: #{trainer?._id?.slice(-6)}
                  </p>
                </div>
              </div>
            </td>

            {/* Contact */}
            <td className="px-6 py-4 text-sm text-gray-700">
              <div className="flex items-center gap-2 mb-1">
                <Mail size={14} className="text-gray-400" />
                {trainer?.email}
              </div>

              <div className="flex items-center gap-2">
                <Phone size={14} className="text-gray-400" />
                {trainer?.phone}
              </div>
            </td>

            {/* Specialization */}
            <td className="px-6 py-4">
              <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-medium">
                {trainer?.specialization}
              </span>
            </td>

            {/* Experience */}
            <td className="px-6 py-4 text-gray-700">
              {trainer?.experience}
            </td>

            {/* Rating */}
            <td className="px-6 py-4">
              <div className="flex items-center gap-1 text-yellow-500 font-semibold">
                <Star size={16} />
                {trainer?.rating || "0"}
              </div>
            </td>

            {/* Date */}
            <td className="px-6 py-4 text-gray-600">
              {trainer?.joiningDate
                ? new Date(trainer.joiningDate).toLocaleDateString()
                : "N/A"}
            </td>

            {/* Status */}
            <td className="px-6 py-4">
              <span
                className={`px-3 py-1 rounded-full text-xs font-medium ${
                  trainer?.status === "Active"
                    ? "bg-green-100 text-green-700"
                    : "bg-red-100 text-red-700"
                }`}
              >
                {trainer?.status}
              </span>
            </td>

            {/* Actions */}
            <td className="px-6 py-4">
              <div className="flex items-center justify-center gap-2">
                <Link
                  to={`/viewtrainers/${trainer._id}`}
                  className="p-2 rounded-lg bg-blue-50 hover:bg-blue-100 text-blue-600 transition"
                >
                  <Eye size={16} />
                </Link>

                <Link
                  to={`/edittrainers/${trainer._id}`}
                  className="p-2 rounded-lg bg-yellow-50 hover:bg-yellow-100 text-yellow-600 transition"
                >
                  <Edit size={16} />
                </Link>

                <button
                  onClick={() => deleteTrainer(trainer._id)}
                  className="p-2 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>

    {/* EMPTY STATE */}
    {filteredTrainers.length === 0 && (
      <div className="py-16 text-center">
        <p className="text-gray-500 text-lg">
          No trainers found
        </p>
        <p className="text-gray-400 text-sm mt-1">
          Try adjusting your search
        </p>
      </div>
    )}
  </div>
</div>
      </div>
    </div>
  );
};

export default Trainers;