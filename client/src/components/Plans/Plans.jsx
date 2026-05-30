import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import {
  Plus,
  Trash2,
  IndianRupee,
  Clock,
  Menu,
  Shield,
  Layers,
  RefreshCw,
} from "lucide-react";

import Sidebar from "../Sidebar";

const Plans = () => {
  const API = import.meta.env.VITE_API_URL;

  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  // ================= FETCH PLANS =================
  const fetchPlans = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/plans/all`
      );

      setPlans(res.data.plans || []);
    } catch (err) {
      console.log("Fetch Error:", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlans();
  }, []);

  // ================= DELETE PLAN =================
  const deletePlan = async (id) => {
    if (!window.confirm("Delete this plan?")) return;

    try {
      await axios.delete(
        `${API}/api/plans/delete/${id}`
      );

      setPlans((prev) => prev.filter((p) => p._id !== id));
    } catch (err) {
      console.log("Delete Error:", err);
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-100">

      {/* SIDEBAR */}
      <Sidebar
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* MAIN */}
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
              Membership Plans
            </h1>

          </div>

          <Link
            to="/addplans"
            className="bg-blue-600 text-white px-5 py-3 rounded-xl flex items-center gap-2 hover:bg-blue-700"
          >
            <Plus size={18} />
            Add Plan
          </Link>

        </div>

        {/* LOADING */}
        {loading ? (
          <p className="text-gray-500">Loading plans...</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

            {plans.map((plan) => (
              <div
                key={plan._id}
                className="bg-white rounded-2xl shadow hover:shadow-xl transition overflow-hidden"
              >

                {/* IMAGE */}
                {plan.image && (
                  <img
                    src={`${API}/uploads/${plan.image}`}
                    alt={plan.name}
                    className="h-40 w-full object-cover"
                  />
                )}

                <div className="p-5">

                  {/* NAME + STATUS */}
                  <div className="flex justify-between items-center">
                    <h2 className="text-xl font-bold">
                      {plan.name}
                    </h2>

                    <span
                      className={`text-xs px-3 py-1 rounded-full ${
                        plan.status === "Active"
                          ? "bg-green-100 text-green-700"
                          : "bg-red-100 text-red-700"
                      }`}
                    >
                      {plan.status}
                    </span>
                  </div>

                  {/* PRICE */}
                  <div className="flex items-center gap-2 mt-2 text-gray-600">
                    <IndianRupee size={18} />
                    <span className="font-semibold text-lg">
                      {plan.price}
                    </span>
                  </div>

                  {/* DURATION */}
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <Clock size={18} />
                    <span>{plan.duration} Days</span>
                  </div>

                  {/* TYPE */}
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <Layers size={16} />
                    <span>{plan.type}</span>
                  </div>

                  {/* ACCESS LEVEL */}
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <Shield size={16} />
                    <span>{plan.accessLevel}</span>
                  </div>

                  {/* FREEZE */}
                  <div className="flex items-center gap-2 mt-2 text-gray-500">
                    <RefreshCw size={16} />
                    <span>
                      Freeze:{" "}
                      {plan.isFreezeAllowed ? "Yes" : "No"}
                    </span>
                  </div>

                  {/* DESCRIPTION */}
                  <p className="text-gray-500 mt-3 text-sm line-clamp-2">
                    {plan.description}
                  </p>

                  {/* DELETE */}
                  <button
                    onClick={() => deletePlan(plan._id)}
                    className="mt-4 w-full bg-red-100 text-red-600 px-4 py-2 rounded-xl flex items-center justify-center gap-2 hover:bg-red-200"
                  >
                    <Trash2 size={16} />
                    Delete
                  </button>

                </div>
              </div>
            ))}

          </div>
        )}

      </div>
    </div>
  );
};

export default Plans;