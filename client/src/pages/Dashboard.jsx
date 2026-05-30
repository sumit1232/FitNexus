import React, { useEffect, useState } from "react";
import axios from "axios";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";
import { Link } from "react-router-dom";

import {
  Menu,
  Users,
  Dumbbell,
  Activity,
  IndianRupee,
  UserPlus,
  CreditCard,
  ClipboardList,
  User,
  LogOut,
  Download,
} from "lucide-react";

import Sidebar from "../components/Sidebar";

const Dashboard = () => {
   const API = import.meta.env.VITE_API_URL;
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [trainers, setTrainers] = useState([]);
  const [plans, setPlans] = useState([]);
  const [payments, setPayments] = useState([]);
  const [workouts, setWorkouts] = useState([]);

  const [revenue, setRevenue] = useState(0);

  const [loading, setLoading] = useState(true);

  // ================= FETCH DATA =================
  const fetchData = async () => {
    try {
      setLoading(true);

      const [
        memberRes,
        trainerRes,
        planRes,
        paymentRes,
        workoutRes,
      ] = await Promise.all([
        axios.get(
          `${API}/api/members/allmembers`
        ),
        axios.get(
          `${API}/api/trainers/alltrainers`
        ),
        axios.get(
          `${API}/api/plans/all`
        ),
        axios.get(
          `${API}/api/payments/all`
        ),
        axios.get(
          `${API}/api/workouts/all`
        ),
      ]);

      setMembers(memberRes.data.members || []);
      setTrainers(trainerRes.data.trainers || []);
      setPlans(planRes.data.plans || []);
      setPayments(paymentRes.data.payments || []);
      setWorkouts(workoutRes.data.workouts || []);

      // Revenue
      const totalRevenue = (
        paymentRes.data.payments || []
      )
        .filter((p) => p.status === "Paid")
        .reduce((acc, item) => acc + item.amount, 0);

      setRevenue(totalRevenue);
    } catch (error) {
      console.log("Dashboard Error:", error.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= EXPORT EXCEL =================
  const exportExcel = () => {
    const workbook = XLSX.utils.book_new();

    // MEMBERS
    const membersData = members.map((m) => ({
      Name: m.name,
      Email: m.email,
      Phone: m.phone,
      Gender: m.gender,
      Status: m.status,
    }));

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(membersData),
      "Members"
    );

    // TRAINERS
    const trainersData = trainers.map((t) => ({
      Name: t.name,
      Email: t.email,
      Phone: t.phone,
      Specialization: t.specialization,
      Experience: t.experience,
    }));

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(trainersData),
      "Trainers"
    );

    // PLANS
    const plansData = plans.map((p) => ({
      Name: p.name,
      Price: p.price,
      Duration: p.duration,
      Type: p.type,
      Status: p.status,
    }));

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(plansData),
      "Plans"
    );

    // PAYMENTS
    const paymentsData = payments.map((p) => ({
      Member: p.member?.name,
      Plan: p.plan?.name,
      Amount: p.amount,
      Method: p.paymentMethod,
      Status: p.status,
      Date: new Date(
        p.paymentDate
      ).toLocaleDateString(),
    }));

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(paymentsData),
      "Payments"
    );

    // WORKOUTS
    const workoutsData = workouts.map((w) => ({
      Title: w.title,
      Category: w.category,
      Duration: w.duration,
      Level: w.level,
      Calories: w.caloriesBurn,
      Status: w.status,
    }));

    XLSX.utils.book_append_sheet(
      workbook,
      XLSX.utils.json_to_sheet(workoutsData),
      "Workouts"
    );

    // DOWNLOAD
    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const fileData = new Blob([excelBuffer], {
      type: "application/octet-stream",
    });

    saveAs(fileData, "GymData.xlsx");
  };

  // ================= STATS =================
  const totalMembers = members.length;

  const activeMembers = members.filter(
    (m) => m.status?.toLowerCase() === "active"
  ).length;

  const inactiveMembers = members.filter(
    (m) => m.status?.toLowerCase() === "inactive"
  ).length;

  const totalTrainers = trainers.length;

  // ================= STATS CARDS =================
  const stats = [
    {
      title: "Total Members",
      value: totalMembers,
      icon: <Users size={28} />,
      color: "bg-blue-100 text-blue-700",
    },
    {
      title: "Active Members",
      value: activeMembers,
      icon: <Activity size={28} />,
      color: "bg-green-100 text-green-700",
    },
    {
      title: "Inactive Members",
      value: inactiveMembers,
      icon: <Users size={28} />,
      color: "bg-red-100 text-red-700",
    },
    {
      title: "Trainers",
      value: totalTrainers,
      icon: <Dumbbell size={28} />,
      color: "bg-purple-100 text-purple-700",
    },
    {
      title: "Revenue",
      value: `₹${revenue}`,
      icon: <IndianRupee size={28} />,
      color: "bg-yellow-100 text-yellow-700",
    },
  ];

  const quickActions = [
    {
      title: "Add Member",
      icon: <UserPlus size={22} />,
      link: "/members",
      color: "bg-blue-600",
    },
    {
      title: "Plans",
      icon: <CreditCard size={22} />,
      link: "/plans",
      color: "bg-green-600",
    },
    {
      title: "Workouts",
      icon: <ClipboardList size={22} />,
      link: "/workouts",
      color: "bg-orange-600",
    },
    {
      title: "Attendance",
      icon: <Activity size={22} />,
      link: "/attendance",
      color: "bg-purple-600",
    },
  ];

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Sidebar */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
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
              <h1 className="text-3xl font-bold">
                Gym Dashboard
              </h1>

              <p className="text-gray-500">
                Live system analytics
              </p>
            </div>
          </div>

          {/* RIGHT BUTTONS */}
          <div className="flex gap-3">
            {/* EXPORT */}
            <button
              onClick={exportExcel}
              className="bg-green-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-green-700 transition"
            >
              <Download size={18} />
              Export Excel
            </button>

            {/* PROFILE */}
            <Link
              to="/profile"
              className="hidden md:flex bg-white px-4 py-2 rounded-xl shadow items-center gap-2 hover:bg-gray-50 transition"
            >
              <User size={18} />
              Profile
            </Link>

            {/* LOGOUT */}
            <Link
              to="/login"
              className="hidden md:flex bg-red-500 text-white px-4 py-2 rounded-xl items-center gap-2 hover:bg-red-600 transition"
            >
              <LogOut size={18} />
              Logout
            </Link>
          </div>
        </div>

        {/* LOADING */}
        {loading ? (
          <div className="text-center text-gray-500">
            Loading dashboard...
          </div>
        ) : (
          <>
            {/* STATS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-6 mb-10">
              {stats.map((item, i) => (
                <div
                  key={i}
                  className="bg-white p-6 rounded-2xl shadow"
                >
                  <div className="flex justify-between">
                    <div>
                      <p className="text-gray-500 text-sm">
                        {item.title}
                      </p>

                      <h2 className="text-3xl font-bold mt-2">
                        {item.value}
                      </h2>
                    </div>

                    <div
                      className={`p-3 rounded-xl ${item.color}`}
                    >
                      {item.icon}
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* QUICK ACTIONS */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6">
              {quickActions.map((a, i) => (
                <Link
                  key={i}
                  to={a.link}
                  className={`${a.color} text-white p-5 rounded-2xl shadow hover:scale-105 transition`}
                >
                  <div className="flex justify-between items-center">
                    <h3>{a.title}</h3>
                    {a.icon}
                  </div>
                </Link>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Dashboard;