import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

import {
  Menu,
  Plus,
  Search,
  IndianRupee,
  Calendar,
  User,
  CreditCard,
  Trash2,
  CheckCircle,
  Clock3,
} from "lucide-react";

import Sidebar from "../Sidebar";

const Payment = () => {
  const API = import.meta.env.VITE_API_URL;

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);

  const [search, setSearch] = useState("");

  // ================= FETCH PAYMENTS =================
  const fetchPayments = async () => {
    try {
      setLoading(true);

      const res = await axios.get(
        `${API}/api/payments/all`
      );

      setPayments(res.data.payments || []);
    } catch (error) {
      console.log("Payment Fetch Error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPayments();
  }, []);

  // ================= DELETE PAYMENT =================
  const deletePayment = async (id) => {
    const confirmDelete = window.confirm(
      "Delete this payment?"
    );

    if (!confirmDelete) return;

    try {
      await axios.delete(
        `${API}/api/payments/delete/${id}`
      );

      setPayments((prev) =>
        prev.filter((p) => p._id !== id)
      );
    } catch (error) {
      console.log("Delete Error:", error);
    }
  };

  // ================= FILTER =================
  const filteredPayments = payments.filter((payment) =>
    payment.member?.name
      ?.toLowerCase()
      .includes(search.toLowerCase())
  );

  // ================= TOTAL REVENUE =================
  const totalRevenue = payments.reduce(
    (acc, curr) => acc + Number(curr.amount || 0),
    0
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
                Payments
              </h1>

              <p className="text-gray-500 mt-1">
                Manage gym payment records
              </p>
            </div>

          </div>

          <Link
            to="/addpayment"
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-2xl flex items-center gap-2 shadow"
          >
            <Plus size={18} />
            Add Payment
          </Link>

        </div>

        {/* ================= TOP CARDS ================= */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">

          <div className="bg-white p-6 rounded-3xl shadow">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Total Revenue
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  ₹{totalRevenue}
                </h2>
              </div>

              <div className="bg-green-100 text-green-700 p-4 rounded-2xl">
                <IndianRupee size={28} />
              </div>

            </div>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Total Payments
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {payments.length}
                </h2>
              </div>

              <div className="bg-blue-100 text-blue-700 p-4 rounded-2xl">
                <CreditCard size={28} />
              </div>

            </div>

          </div>

          <div className="bg-white p-6 rounded-3xl shadow">

            <div className="flex items-center justify-between">

              <div>
                <p className="text-gray-500">
                  Completed Payments
                </p>

                <h2 className="text-3xl font-bold mt-2">
                  {
                    payments.filter(
                      (p) => p.status === "Paid"
                    ).length
                  }
                </h2>
              </div>

              <div className="bg-purple-100 text-purple-700 p-4 rounded-2xl">
                <CheckCircle size={28} />
              </div>

            </div>

          </div>

        </div>

        {/* ================= SEARCH ================= */}
        <div className="bg-white rounded-2xl shadow p-4 mb-8 flex items-center gap-3">

          <Search size={18} className="text-gray-400" />

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

        {/* ================= LOADING ================= */}
        {loading ? (
          <div className="text-center py-20 text-gray-500">
            Loading payments...
          </div>
        ) : filteredPayments.length === 0 ? (
          <div className="bg-white rounded-3xl shadow p-10 text-center">

            <CreditCard
              size={50}
              className="mx-auto text-gray-300 mb-4"
            />

            <h2 className="text-2xl font-bold text-gray-700">
              No Payments Found
            </h2>

            <p className="text-gray-500 mt-2">
              Add your first payment record.
            </p>

          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">

            {filteredPayments.map((payment) => (
              <div
                key={payment._id}
                className="bg-white rounded-3xl shadow hover:shadow-2xl transition duration-300 overflow-hidden"
              >

                {/* TOP */}
                <div className="p-6 border-b">

                  <div className="flex items-center justify-between">

                    <div>
                      <h2 className="text-2xl font-bold text-gray-800">
                        ₹{payment.amount}
                      </h2>

                      <p className="text-gray-500 mt-1">
                        Payment Amount
                      </p>
                    </div>

                    <div
                      className={`px-4 py-2 rounded-full text-sm font-semibold ${
                        payment.status === "Paid"
                          ? "bg-green-100 text-green-700"
                          : "bg-yellow-100 text-yellow-700"
                      }`}
                    >
                      {payment.status}
                    </div>

                  </div>

                </div>

                {/* BODY */}
                <div className="p-6 space-y-4">

                  {/* MEMBER */}
                  <div className="flex items-center gap-3">

                    <div className="bg-blue-100 p-3 rounded-xl text-blue-700">
                      <User size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Member
                      </p>

                      <h3 className="font-semibold text-gray-800">
                        {payment.member?.name ||
                          "No Member"}
                      </h3>
                    </div>

                  </div>

                  {/* PLAN */}
                  <div className="flex items-center gap-3">

                    <div className="bg-purple-100 p-3 rounded-xl text-purple-700">
                      <CreditCard size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Plan
                      </p>

                      <h3 className="font-semibold text-gray-800">
                        {payment.plan?.name ||
                          "No Plan"}
                      </h3>
                    </div>

                  </div>

                  {/* DATE */}
                  <div className="flex items-center gap-3">

                    <div className="bg-orange-100 p-3 rounded-xl text-orange-700">
                      <Calendar size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Date
                      </p>

                      <h3 className="font-semibold text-gray-800">
                        {new Date(
                          payment.paymentDate
                        ).toLocaleDateString()}
                      </h3>
                    </div>

                  </div>

                  {/* METHOD */}
                  <div className="flex items-center gap-3">

                    <div className="bg-green-100 p-3 rounded-xl text-green-700">
                      <Clock3 size={20} />
                    </div>

                    <div>
                      <p className="text-sm text-gray-500">
                        Payment Method
                      </p>

                      <h3 className="font-semibold text-gray-800">
                        {payment.paymentMethod}
                      </h3>
                    </div>

                  </div>

                  {/* NOTES */}
                  {payment.notes && (
                    <div className="bg-gray-50 rounded-2xl p-4">

                      <p className="text-sm text-gray-500">
                        Notes
                      </p>

                      <p className="text-gray-700 mt-1">
                        {payment.notes}
                      </p>

                    </div>
                  )}

                  {/* BUTTONS */}
                  <div className="pt-2">

                    <button
                      onClick={() =>
                        deletePayment(payment._id)
                      }
                      className="w-full bg-red-100 hover:bg-red-200 text-red-600 py-3 rounded-2xl flex items-center justify-center gap-2 transition"
                    >
                      <Trash2 size={18} />
                      Delete Payment
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

export default Payment;