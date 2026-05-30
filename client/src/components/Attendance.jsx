import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Menu,
  Search,
  Calendar,
  CheckCircle,
  XCircle,
  Clock3,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const Attendance = () => {
   const API = import.meta.env.VITE_API_URL;
  const [sidebarOpen, setSidebarOpen] =
    useState(false);

  const [members, setMembers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= FETCH MEMBERS =================
  const fetchMembers = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/members/allmembers`
      );

      const formattedMembers = (
        res.data.members || []
      ).map((member) => ({
        ...member,
        attendanceStatus: "Present",
        checkInTime: new Date().toLocaleTimeString(),
      }));

      setMembers(formattedMembers);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchMembers();
  }, []);

  // ================= HANDLE STATUS =================
  const handleAttendanceChange = (
    id,
    status
  ) => {
    setMembers((prev) =>
      prev.map((member) =>
        member._id === id
          ? {
              ...member,
              attendanceStatus: status,
            }
          : member
      )
    );
  };

  // ================= FILTER =================
  const filteredMembers = members.filter(
    (member) =>
      member.name
        ?.toLowerCase()
        .includes(search.toLowerCase()) ||
      member.email
        ?.toLowerCase()
        .includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* ================= SIDEBAR ================= */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* ================= MAIN ================= */}
      <div className="flex-1 p-6">

        {/* ================= HEADER ================= */}
        <div className="flex items-center justify-between mb-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() =>
                setSidebarOpen(true)
              }
              className="md:hidden bg-white p-3 rounded-xl shadow"
            >
              <Menu size={22} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Attendance
              </h1>

              <p className="text-gray-500 mt-1">
                Track daily member attendance
              </p>
            </div>

          </div>

          <div className="bg-white px-5 py-3 rounded-2xl shadow flex items-center gap-2">
            <Calendar size={18} />
            <span className="font-medium">
              {new Date().toLocaleDateString()}
            </span>
          </div>

        </div>

        {/* ================= SEARCH ================= */}
        <div className="bg-white p-4 rounded-2xl shadow mb-6 flex items-center gap-3">

          <Search
            size={18}
            className="text-gray-500"
          />

          <input
            type="text"
            placeholder="Search member..."
            className="w-full outline-none"
            value={search}
            onChange={(e) =>
              setSearch(e.target.value)
            }
          />

        </div>

        {/* ================= TABLE ================= */}
        <div className="bg-white rounded-3xl shadow overflow-hidden">

          {loading ? (
            <div className="p-6 text-gray-500">
              Loading attendance...
            </div>
          ) : filteredMembers.length === 0 ? (
            <div className="p-6 text-gray-500">
              No members found
            </div>
          ) : (
            <div className="overflow-x-auto">

              <table className="w-full">

                <thead className="bg-gray-50 border-b">

                  <tr>

                    <th className="text-left p-5 font-semibold text-gray-600">
                      Member
                    </th>

                    <th className="text-left p-5 font-semibold text-gray-600">
                      Phone
                    </th>

                    <th className="text-left p-5 font-semibold text-gray-600">
                      Check In
                    </th>

                    <th className="text-left p-5 font-semibold text-gray-600">
                      Status
                    </th>

                    <th className="text-left p-5 font-semibold text-gray-600">
                      Actions
                    </th>

                  </tr>

                </thead>

                <tbody>

                  {filteredMembers.map((member) => (
                    <tr
                      key={member._id}
                      className="border-b hover:bg-gray-50"
                    >

                      {/* MEMBER */}
                      <td className="p-5">

                        <div className="flex items-center gap-3">

                          <img
                            src={
                              member.image
                                ? `${API}/uploads/${member.image}`
                                : "https://via.placeholder.com/50"
                            }
                            alt={member.name}
                            className="w-12 h-12 rounded-full object-cover"
                          />

                          <div>

                            <h3 className="font-semibold text-gray-800">
                              {member.name}
                            </h3>

                            <p className="text-sm text-gray-500">
                              {member.email}
                            </p>

                          </div>

                        </div>

                      </td>

                      {/* PHONE */}
                      <td className="p-5 text-gray-600">
                        {member.phone}
                      </td>

                      {/* CHECK IN */}
                      <td className="p-5">

                        <div className="flex items-center gap-2 text-gray-600">

                          <Clock3 size={16} />

                          <span>
                            {member.checkInTime}
                          </span>

                        </div>

                      </td>

                      {/* STATUS */}
                      <td className="p-5">

                        <span
                          className={`px-4 py-2 rounded-full text-sm font-medium ${
                            member.attendanceStatus ===
                            "Present"
                              ? "bg-green-100 text-green-700"
                              : member.attendanceStatus ===
                                "Absent"
                              ? "bg-red-100 text-red-700"
                              : "bg-yellow-100 text-yellow-700"
                          }`}
                        >
                          {
                            member.attendanceStatus
                          }
                        </span>

                      </td>

                      {/* ACTIONS */}
                      <td className="p-5">

                        <div className="flex gap-2">

                          <button
                            onClick={() =>
                              handleAttendanceChange(
                                member._id,
                                "Present"
                              )
                            }
                            className="bg-green-100 text-green-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-green-200 transition"
                          >
                            <CheckCircle
                              size={16}
                            />
                            Present
                          </button>

                          <button
                            onClick={() =>
                              handleAttendanceChange(
                                member._id,
                                "Absent"
                              )
                            }
                            className="bg-red-100 text-red-700 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-200 transition"
                          >
                            <XCircle
                              size={16}
                            />
                            Absent
                          </button>

                        </div>

                      </td>

                    </tr>
                  ))}

                </tbody>

              </table>

            </div>
          )}

        </div>

      </div>
    </div>
  );
};

export default Attendance;