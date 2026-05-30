import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  Search,
  Plus,
  Users,
  Phone,
  Mail,
  Calendar,
  Trash2,
  Eye,
  Edit,
  Menu,
  User,
  LogOut,
  Loader2,
} from "lucide-react";

import Sidebar from "../Sidebar";

const Members = () => {
   const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [members, setMembers] = useState([]);

  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // =========================================
  // FETCH MEMBERS
  // =========================================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const response = await axios.get(
        `${API}/api/members/allmembers`
      );

      setMembers(response.data.members || []);
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to fetch members"
      );
    } finally {
      setLoading(false);
    }
  };

  // =========================================
  // DELETE MEMBER
  // =========================================
  const deleteMember = async (id) => {
    const confirmDelete = window.confirm(
      "Are you sure you want to delete this member?"
    );

    if (!confirmDelete) return;

    try {
      const response = await axios.delete(
        `${API}/api/members/deletemember/${id}`
      );

      alert(response.data.message);

      // Remove deleted member instantly
      setMembers((prev) =>
        prev.filter((member) => member._id !== id)
      );
    } catch (error) {
      console.log(error);

      alert(
        error.response?.data?.message ||
        "Failed to delete member"
      );
    }
  };

  // =========================================
  // SEARCH FILTER
  // =========================================
  const filteredMembers = useMemo(() => {
    return members.filter((member) => {
      const searchText = search.toLowerCase();

      return (
        member.name?.toLowerCase().includes(searchText) ||
        member.email?.toLowerCase().includes(searchText) ||
        member.phone?.includes(searchText) ||
        member.membership
          ?.toLowerCase()
          .includes(searchText) ||
        member.status?.toLowerCase().includes(searchText)
      );
    });
  }, [members, search]);

  // =========================================
  // STATS
  // =========================================
  const totalMembers = members.length;

  const activeMembers = members.filter(
    (member) => member.status === "Active"
  ).length;

  const inactiveMembers = members.filter(
    (member) => member.status === "Inactive"
  ).length;

  // =========================================
  // LOAD DATA
  // =========================================
  useEffect(() => {
    fetchMembers();
  }, []);

  // =========================================
  // LOGOUT
  // =========================================
  const handleLogout = () => {
    localStorage.removeItem("token");

    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Main Content */}
      <div className="flex-1 p-4 md:p-6">
        {/* Header */}
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
          {/* Left */}
          <div className="flex items-center gap-4">
            {/* Mobile Menu */}
            <button
              onClick={() => setSidebarOpen(true)}
              className="bg-white p-3 rounded-xl shadow-md md:hidden"
            >
              <Menu size={24} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Members Management
              </h1>

              <p className="text-gray-500 mt-1">
                Manage all gym members easily.
              </p>
            </div>
          </div>

          {/* Right */}
          <div className="flex items-center gap-3">
            <Link
              to="/profile"
              className="flex items-center gap-2 bg-white shadow px-5 py-3 rounded-xl hover:bg-gray-50 transition"
            >
              <User size={20} />
              Profile
            </Link>

            <button
              onClick={handleLogout}
              className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-5 py-3 rounded-xl transition"
            >
              <LogOut size={20} />
              Logout
            </button>
          </div>
        </div>

        {/* Top Section */}
        <div className="flex flex-col lg:flex-row gap-4 justify-between mb-8">
          {/* Search */}
          <div className="bg-white rounded-2xl shadow-md p-5 flex-1">
            <div className="relative">
              <Search
                size={20}
                className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400"
              />

              <input
                type="text"
                placeholder="Search by name, email, phone, membership..."
                value={search}
                onChange={(e) =>
                  setSearch(e.target.value)
                }
                className="w-full border border-gray-200 rounded-xl py-3 pl-12 pr-4 focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </div>
          </div>

          {/* Add Button */}
          <Link
            to="/addmembers"
            className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 rounded-2xl transition font-semibold shadow-md"
          >
            <Plus size={20} />
            Add Member
          </Link>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {/* Total Members */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Total Members
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {totalMembers}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>

          {/* Active Members */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Active Members
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {activeMembers}
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>

          {/* Inactive Members */}
          <div className="bg-white rounded-3xl shadow-md p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-gray-500">
                  Inactive Members
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {inactiveMembers}
                </h2>
              </div>

              <div className="bg-red-100 text-red-700 p-4 rounded-2xl">
                <Users size={30} />
              </div>
            </div>
          </div>
        </div>

        {/* Members Table */}
        <div className="bg-white rounded-3xl shadow-md overflow-hidden">
          {/* Table Header */}
          <div className="px-6 py-5 border-b bg-gray-50">
            <h2 className="text-xl font-bold text-gray-800">
              All Members
            </h2>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[950px]">
              <thead className="bg-gray-50 border-b">
                <tr>
                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">
                    Member
                  </th>

                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">
                    Contact
                  </th>

                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">
                    Membership
                  </th>

                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">
                    Joining Date
                  </th>

                  <th className="text-left py-4 px-6 text-gray-600 font-semibold">
                    Status
                  </th>

                  <th className="text-center py-4 px-6 text-gray-600 font-semibold">
                    Actions
                  </th>
                </tr>
              </thead>

              <tbody>
                {/* Loading */}
                {loading ? (
                  <tr>
                    <td
                      colSpan="6"
                      className="py-16 text-center"
                    >
                      <div className="flex items-center justify-center gap-3 text-blue-600 font-semibold">
                        <Loader2
                          size={24}
                          className="animate-spin"
                        />
                        Loading Members...
                      </div>
                    </td>
                  </tr>
                ) : filteredMembers.length > 0 ? (
                  filteredMembers.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b hover:bg-gray-50 transition"
                    >
                      {/* Member */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-4">
                          <img
                            src={
                              member.image
                                ? `${API}/uploads/${member.image}`
                                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                            }
                            alt={member.name}
                            className="w-14 h-14 rounded-full object-cover border"
                          />

                          <div>
                            <h3 className="font-semibold text-gray-800">
                              {member.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              ID: #
                              {member._id?.slice(-6)}
                            </p>
                          </div>
                        </div>
                      </td>

                      {/* Contact */}
                      <td className="py-5 px-6">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Mail size={16} />

                            {member.email}
                          </div>

                          <div className="flex items-center gap-2 text-gray-600 text-sm">
                            <Phone size={16} />

                            {member.phone}
                          </div>
                        </div>
                      </td>

                      {/* Membership */}
                      <td className="py-5 px-6">
                        <span className="bg-blue-100 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                          {member.membership || "N/A"}
                        </span>
                      </td>

                      {/* Joining Date */}
                      <td className="py-5 px-6">
                        <div className="flex items-center gap-2 text-gray-600">
                          <Calendar size={16} />

                          {member.joiningDate
                            ? new Date(
                              member.joiningDate
                            ).toLocaleDateString()
                            : "N/A"}
                        </div>
                      </td>

                      {/* Status */}
                      <td className="py-5 px-6">
                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${member.status === "Active"
                            ? "bg-green-100 text-green-700"
                            : "bg-red-100 text-red-700"
                            }`}
                        >
                          {member.status || "Inactive"}
                        </span>
                      </td>

                      {/* Actions */}
                      <td className="py-5 px-6">
                        <div className="flex items-center justify-center gap-3">

                          {/* View */}
                          <Link
                            to={`/viewmembers/${member._id}`}
                            className="bg-blue-100 hover:bg-blue-200 text-blue-700 p-3 rounded-xl transition"
                          >
                            <Eye size={18} />
                          </Link>

                          {/* Edit */}
                          <Link
                            to={`/editmembers/${member._id}`}
                            className="bg-yellow-100 hover:bg-yellow-200 text-yellow-700 p-3 rounded-xl transition"
                          >
                            <Edit size={18} />
                          </Link>

                          {/* Delete */}
                          <button
                            onClick={() => deleteMember(member._id)}
                            className="bg-red-100 hover:bg-red-200 text-red-700 p-3 rounded-xl transition"
                          >
                            <Trash2 size={18} />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="6"
                      className="text-center py-16"
                    >
                      <div className="flex flex-col items-center">
                        <Users
                          size={50}
                          className="text-gray-300 mb-4"
                        />

                        <h2 className="text-xl font-bold text-gray-700">
                          No Members Found
                        </h2>

                        <p className="text-gray-500 mt-2">
                          Try searching with different keywords.
                        </p>
                      </div>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Members;