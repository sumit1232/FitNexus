import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Loader,
  User,
  Mail,
  Phone,
  Shield,
  ArrowLeft,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const API = import.meta.env.VITE_API_URL;

  const navigate = useNavigate();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");

        if (!token) {
          navigate("/login");
          return;
        }

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
        console.log(error);
        navigate("/login");
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [navigate]);

  // Loading
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="flex items-center gap-3 text-blue-600 text-xl font-semibold">
          <Loader className="animate-spin" size={28} />
          Loading Profile...
        </div>
      </div>
    );
  }

  // No user
  if (!user) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <h1 className="text-2xl font-bold text-red-500">
          User Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6 flex items-center justify-center">

      <div className="bg-white shadow-xl rounded-3xl p-8 w-full max-w-2xl">

        {/* BACK BUTTON */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-black transition"
        >
          <ArrowLeft size={20} />
          Back
        </button>

        {/* HEADER */}
        <div className="flex flex-col items-center text-center">
          <img
            src={
              user.profile
                ? `${API}/${user.profile}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="profile"
            className="w-32 h-32 rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="text-2xl font-bold text-gray-800 mt-4">
            {user.fullname}
          </h2>

          <p className="text-gray-500">{user.role}</p>
        </div>

        {/* DETAILS */}
        <div className="mt-8 space-y-5">

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="font-semibold">{user.email}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Phone className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <h3 className="font-semibold">{user.phone}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Shield className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Role</p>
              <h3 className="font-semibold">{user.role}</h3>
            </div>
          </div>

          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <User className="text-gray-600" />
            <div>
              <p className="text-sm text-gray-500">User ID</p>
              <h3 className="font-semibold">
                #{user._id?.slice(-6)}
              </h3>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Profile;