import React, { useEffect, useState } from "react";
import axios from "axios";

import {
  ArrowLeft,
  Mail,
  Phone,
  CalendarDays,
  MapPin,
  Shield,
  Activity,
  User,
  BadgeCheck,
  Loader2,
  Weight,
  Ruler,
} from "lucide-react";

import { Link, useParams } from "react-router-dom";

const ViewMember = () => {
  const API = import.meta.env.VITE_API_URL;
  
  const { id } = useParams();

  const [member, setMember] = useState(null);

  const [loading, setLoading] = useState(true);

  // =========================================
  // FETCH MEMBER
  // =========================================
  useEffect(() => {
    const fetchMember = async () => {
      try {
        setLoading(true);

        const response = await axios.get(
          `${API}/api/members/singlemember/${id}`
        );

        setMember(response.data.member);
      } catch (error) {
        console.log(error);
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchMember();
    }
  }, [id]);

  // =========================================
  // LOADING
  // =========================================
  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="flex items-center gap-3 text-blue-600 text-xl font-semibold">
          <Loader2 className="animate-spin" size={28} />
          Loading Member...
        </div>
      </div>
    );
  }

  // =========================================
  // MEMBER NOT FOUND
  // =========================================
  if (!member) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <h1 className="text-3xl font-bold text-red-500">
          Member Not Found
        </h1>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-4 md:p-6">
      {/* Header */}
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-5 mb-8">
        <div>
          <div className="flex items-center gap-3 mb-2">
            <Link
              to="/members"
              className="bg-white shadow-md p-3 rounded-xl hover:bg-gray-100 transition"
            >
              <ArrowLeft size={22} />
            </Link>

            <h1 className="text-3xl font-bold text-gray-800">
              Member Profile
            </h1>
          </div>

          <p className="text-gray-500">
            View complete gym member information.
          </p>
        </div>

        {/* Status */}
        <div
          className={`w-fit px-5 py-3 rounded-xl text-sm font-semibold ${
            member.status === "Active"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-700"
          }`}
        >
          {member.status || "Inactive"}
        </div>
      </div>

      {/* Main Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left Side */}
        <div className="bg-white rounded-3xl shadow-md p-8">
          <div className="flex flex-col items-center">
            <img
              src={
                member.image
                  ? `${API}/uploads/${member.image}`
                  : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
              }
              alt={member.name}
              className="w-40 h-40 rounded-full object-cover border-4 border-blue-500"
            />

            <h2 className="text-2xl font-bold text-gray-800 mt-5 text-center">
              {member.name}
            </h2>

            <p className="text-gray-500 mt-1">
              Member ID: #{member._id?.slice(-6)}
            </p>

            <div className="mt-4 bg-blue-100 text-blue-700 px-5 py-2 rounded-full text-sm font-semibold">
              {member.membership || "Basic"} Plan
            </div>
          </div>

          {/* Contact Information */}
          <div className="mt-8 space-y-5">
            {/* Email */}
            <div className="flex items-center gap-4">
              <div className="bg-blue-100 text-blue-700 p-3 rounded-xl">
                <Mail size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Email</p>

                <h3 className="font-semibold text-gray-800 break-all">
                  {member.email || "N/A"}
                </h3>
              </div>
            </div>

            {/* Phone */}
            <div className="flex items-center gap-4">
              <div className="bg-green-100 text-green-700 p-3 rounded-xl">
                <Phone size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Phone</p>

                <h3 className="font-semibold text-gray-800">
                  {member.phone || "N/A"}
                </h3>
              </div>
            </div>

            {/* Joining Date */}
            <div className="flex items-center gap-4">
              <div className="bg-purple-100 text-purple-700 p-3 rounded-xl">
                <CalendarDays size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">
                  Joining Date
                </p>

                <h3 className="font-semibold text-gray-800">
                  {member.joiningDate
                    ? new Date(
                        member.joiningDate
                      ).toLocaleDateString()
                    : "N/A"}
                </h3>
              </div>
            </div>

            {/* Address */}
            <div className="flex items-center gap-4">
              <div className="bg-red-100 text-red-700 p-3 rounded-xl">
                <MapPin size={20} />
              </div>

              <div>
                <p className="text-sm text-gray-500">Address</p>

                <h3 className="font-semibold text-gray-800">
                  {member.address || "N/A"}
                </h3>
              </div>
            </div>
          </div>
        </div>

        {/* Right Side */}
        <div className="lg:col-span-2 space-y-8">
          {/* Personal Information */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Personal Information
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Name */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <User className="text-blue-600" size={20} />

                  <h3 className="font-semibold text-gray-700">
                    Full Name
                  </h3>
                </div>

                <p className="text-lg font-bold text-gray-800">
                  {member.name || "N/A"}
                </p>
              </div>

              {/* Membership */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <BadgeCheck
                    className="text-green-600"
                    size={20}
                  />

                  <h3 className="font-semibold text-gray-700">
                    Membership
                  </h3>
                </div>

                <p className="text-lg font-bold text-gray-800">
                  {member.membership || "N/A"}
                </p>
              </div>

              {/* Age */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Age
                </h3>

                <p className="text-lg font-bold text-gray-800">
                  {member.age ? `${member.age} Years` : "N/A"}
                </p>
              </div>

              {/* Gender */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <h3 className="font-semibold text-gray-700 mb-3">
                  Gender
                </h3>

                <p className="text-lg font-bold text-gray-800">
                  {member.gender || "N/A"}
                </p>
              </div>

              {/* Height */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Ruler className="text-orange-600" size={20} />

                  <h3 className="font-semibold text-gray-700">
                    Height
                  </h3>
                </div>

                <p className="text-lg font-bold text-gray-800">
                  {member.height
                    ? `${member.height} cm`
                    : "N/A"}
                </p>
              </div>

              {/* Weight */}
              <div className="bg-gray-50 rounded-2xl p-5">
                <div className="flex items-center gap-3 mb-3">
                  <Weight className="text-pink-600" size={20} />

                  <h3 className="font-semibold text-gray-700">
                    Weight
                  </h3>
                </div>

                <p className="text-lg font-bold text-gray-800">
                  {member.weight
                    ? `${member.weight} kg`
                    : "N/A"}
                </p>
              </div>
            </div>
          </div>

          {/* Fitness Details */}
          <div className="bg-white rounded-3xl shadow-md p-8">
            <h2 className="text-2xl font-bold text-gray-800 mb-6">
              Fitness Details
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Trainer */}
              <div className="bg-blue-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Assigned Trainer
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                      {member.trainer || "N/A"}
                    </h3>
                  </div>

                  <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                    <User size={24} />
                  </div>
                </div>
              </div>

              {/* BMI */}
              <div className="bg-green-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">BMI</p>

                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                      {member.bmi || "N/A"}
                    </h3>
                  </div>

                  <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                    <Activity size={24} />
                  </div>
                </div>
              </div>

              {/* Emergency Contact */}
              <div className="bg-purple-50 rounded-2xl p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-gray-600">
                      Emergency Contact
                    </p>

                    <h3 className="text-xl font-bold text-gray-800 mt-2">
                      {member.emergencyContact || "N/A"}
                    </h3>
                  </div>

                  <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                    <Shield size={24} />
                  </div>
                </div>
              </div>
            </div>

            {/* Medical Issues */}
            <div className="mt-8 bg-red-50 border border-red-100 rounded-2xl p-6">
              <h3 className="text-lg font-bold text-red-700 mb-3">
                Medical Issues
              </h3>

              <p className="text-gray-700">
                {member.medicalIssues ||
                  "No medical issues"}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViewMember;