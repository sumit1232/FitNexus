import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Dumbbell,
  CreditCard,
  ClipboardList,
  Settings,
  User,
  LogOut,
  X,
  Package,
} from "lucide-react";

const Sidebar = ({ sidebarOpen, setSidebarOpen }) => {
  const API = import.meta.env.VITE_API_URL;
  const location = useLocation();
  const navigate = useNavigate();

  const [user, setUser] = useState(null);

  // ==========================
  // FETCH LOGGED USER
  // ==========================
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const token = localStorage.getItem("token");

        const res = await axios.get(
          `${API}/api/users/profile`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );

        setUser(res.data.user);
      } catch (error) {
        console.log("User fetch error:", error.message);
      }
    };

    fetchUser();
  }, []);

  // ==========================
  // LOGOUT
  // ==========================
  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  const menuItems = [
    {
      title: "Dashboard",
      icon: <LayoutDashboard size={22} />,
      path: "/dashboard",
    },
    {
      title: "Members",
      icon: <Users size={22} />,
      path: "/members",
    },
    {
      title: "Trainers",
      icon: <Dumbbell size={22} />,
      path: "/trainers",
    },
    {
      title: "Subscription Plans",
      icon: <Package size={22} />,
      path: "/plans",
    },
     {
      title: "Workout Plans",
      icon: <ClipboardList size={22} />,
      path: "/workouts",
    },
    {
      title: "Payments",
      icon: <CreditCard size={22} />,
      path: "/payments",
    },
    {
      title: "Settings",
      icon: <Settings size={22} />,
      path: "/settings",
    },
  ];

  return (
    <>
      {/* Overlay */}
      {sidebarOpen && (
        <div
          className="fixed inset-0 bg-black/40 z-40 md:hidden"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <div
        className={`fixed md:static top-0 left-0 h-full w-72 bg-white shadow-xl z-50 transform transition-transform duration-300 flex flex-col
        ${
          sidebarOpen
            ? "translate-x-0"
            : "-translate-x-full md:translate-x-0"
        }`}
      >
        {/* Logo */}
        <div className="p-6 border-b flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-blue-600">
              Gym<span className="text-gray-800">App</span>
            </h1>
            <p className="text-gray-500 text-sm mt-1">
              Gym Management System
            </p>
          </div>

          <button
            onClick={() => setSidebarOpen(false)}
            className="md:hidden"
          >
            <X size={28} />
          </button>
        </div>

        {/* PROFILE (FIXED) */}
        <div className="p-6 border-b flex flex-col items-center">
          <img
            src={
              user?.profile
                ? `${API}/${user.profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="w-24 h-24 rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {user?.fullname || "Admin"}
          </h2>

          <p className="text-sm text-gray-500">
            {user?.role || "User"}
          </p>

          <Link
            to="/profile"
            className="mt-4 flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-xl transition"
          >
            <User size={18} />
            View Profile
          </Link>
        </div>

        {/* NAVIGATION */}
        <nav className="flex-1 p-5 space-y-3 overflow-y-auto">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              to={item.path}
              onClick={() => setSidebarOpen(false)}
              className={`flex items-center gap-3 p-3 rounded-xl transition font-medium
                ${
                  location.pathname === item.path
                    ? "bg-blue-50 text-blue-700"
                    : "hover:bg-gray-100 text-gray-700"
                }`}
            >
              {item.icon}
              {item.title}
            </Link>
          ))}
        </nav>

        {/* LOGOUT */}
        <div className="p-5 border-t">
          <button
            onClick={handleLogout}
            className="w-full flex items-center justify-center gap-2 bg-red-500 hover:bg-red-600 text-white py-3 rounded-xl transition"
          >
            <LogOut size={20} />
            Logout
          </button>
        </div>
      </div>
    </>
  );
};

export default Sidebar;