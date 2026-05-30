import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

import {
  Save,
  ArrowLeft,
  Menu,
  User,
  CreditCard,
  IndianRupee,
  Calendar,
  FileText,
} from "lucide-react";

import Sidebar from "../Sidebar";

const AddPayment = () => {
   const API = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [members, setMembers] = useState([]);
  const [plans, setPlans] = useState([]);

  const [loading, setLoading] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    member: "",
    plan: "",
    amount: "",
    paymentMethod: "Cash",
    paymentDate: today,
    startDate: today,
    endDate: "",
    transactionId: "",
    status: "Paid",
    notes: "",
  });

  // ================= FETCH MEMBERS & PLANS =================
  const fetchData = async () => {
    try {
      const [memberRes, planRes] = await Promise.all([
        axios.get(
          `${API}/api/members/allmembers`
        ),
        axios.get(
          `${API}/api/plans/all`
        ),
      ]);

      setMembers(memberRes.data.members || []);
      setPlans(planRes.data.plans || []);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  // ================= HANDLE CHANGE =================
  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  // ================= PLAN CHANGE =================
  const handlePlanChange = (e) => {
    const selectedPlan = plans.find(
      (p) => p._id === e.target.value
    );

    const start = new Date(form.startDate || today);

    const end = new Date(start);

    end.setDate(
      end.getDate() +
        Number(selectedPlan?.duration || 0)
    );

    setForm({
      ...form,
      plan: e.target.value,
      amount: selectedPlan?.price || "",
      endDate: end.toISOString().split("T")[0],
    });
  };

  // ================= START DATE CHANGE =================
  const handleStartDate = (e) => {
    const value = e.target.value;

    const selectedPlan = plans.find(
      (p) => p._id === form.plan
    );

    const start = new Date(value);

    const end = new Date(start);

    end.setDate(
      end.getDate() +
        Number(selectedPlan?.duration || 0)
    );

    setForm({
      ...form,
      startDate: value,
      endDate: end.toISOString().split("T")[0],
    });
  };

  // ================= SUBMIT =================
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      setLoading(true);

      await axios.post(
        `${API}/api/payments/add`,
        form
      );

      alert("Payment added successfully");

      navigate("/payments");
    } catch (error) {
      console.log(error);

      alert("Failed to add payment");
    } finally {
      setLoading(false);
    }
  };

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
        <div className="flex justify-between items-center mb-8">

          <div className="flex items-center gap-3">

            <button
              onClick={() => setSidebarOpen(true)}
              className="md:hidden bg-white p-3 rounded-xl shadow"
            >
              <Menu size={20} />
            </button>

            <div>
              <h1 className="text-3xl font-bold text-gray-800">
                Add Payment
              </h1>

              <p className="text-gray-500 mt-1">
                Create payment record
              </p>
            </div>

          </div>

          <Link
            to="/payments"
            className="bg-white px-5 py-3 rounded-2xl shadow flex items-center gap-2"
          >
            <ArrowLeft size={18} />
            Back
          </Link>

        </div>

        {/* ================= FORM ================= */}
        <form
          onSubmit={handleSubmit}
          className="bg-white rounded-3xl shadow p-8 max-w-5xl"
        >

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* MEMBER */}
            <div>

              <label className="block mb-2 font-semibold">
                Member
              </label>

              <div className="flex items-center border rounded-2xl px-4">

                <User
                  size={18}
                  className="text-gray-400"
                />

                <select
                  name="member"
                  value={form.member}
                  onChange={handleChange}
                  className="w-full p-4 outline-none bg-transparent"
                  required
                >

                  <option value="">
                    Select Member
                  </option>

                  {members.map((member) => (
                    <option
                      key={member._id}
                      value={member._id}
                    >
                      {member.name}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* PLAN */}
            <div>

              <label className="block mb-2 font-semibold">
                Membership Plan
              </label>

              <div className="flex items-center border rounded-2xl px-4">

                <CreditCard
                  size={18}
                  className="text-gray-400"
                />

                <select
                  name="plan"
                  value={form.plan}
                  onChange={handlePlanChange}
                  className="w-full p-4 outline-none bg-transparent"
                  required
                >

                  <option value="">
                    Select Plan
                  </option>

                  {plans.map((plan) => (
                    <option
                      key={plan._id}
                      value={plan._id}
                    >
                      {plan.name} - ₹{plan.price}
                    </option>
                  ))}

                </select>

              </div>

            </div>

            {/* AMOUNT */}
            <div>

              <label className="block mb-2 font-semibold">
                Amount
              </label>

              <div className="flex items-center border rounded-2xl px-4">

                <IndianRupee
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="number"
                  name="amount"
                  value={form.amount}
                  onChange={handleChange}
                  placeholder="Amount"
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            {/* PAYMENT METHOD */}
            <div>

              <label className="block mb-2 font-semibold">
                Payment Method
              </label>

              <select
                name="paymentMethod"
                value={form.paymentMethod}
                onChange={handleChange}
                className="w-full border rounded-2xl p-4 outline-none"
              >

                <option value="Cash">
                  Cash
                </option>

                <option value="UPI">
                  UPI
                </option>

                <option value="Card">
                  Card
                </option>

                <option value="Net Banking">
                  Net Banking
                </option>

                <option value="Razorpay">
                  Razorpay
                </option>

              </select>

            </div>

            {/* PAYMENT DATE */}
            <div>

              <label className="block mb-2 font-semibold">
                Payment Date
              </label>

              <div className="flex items-center border rounded-2xl px-4">

                <Calendar
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="date"
                  name="paymentDate"
                  value={form.paymentDate}
                  onChange={handleChange}
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            {/* START DATE */}
            <div>

              <label className="block mb-2 font-semibold">
                Membership Start Date
              </label>

              <div className="flex items-center border rounded-2xl px-4">

                <Calendar
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="date"
                  name="startDate"
                  value={form.startDate}
                  onChange={handleStartDate}
                  className="w-full p-4 outline-none"
                  required
                />

              </div>

            </div>

            {/* END DATE */}
            <div>

              <label className="block mb-2 font-semibold">
                Membership End Date
              </label>

              <div className="flex items-center border rounded-2xl px-4 bg-gray-50">

                <Calendar
                  size={18}
                  className="text-gray-400"
                />

                <input
                  type="date"
                  name="endDate"
                  value={form.endDate}
                  readOnly
                  className="w-full p-4 outline-none bg-transparent"
                />

              </div>

            </div>

            {/* STATUS */}
            <div>

              <label className="block mb-2 font-semibold">
                Status
              </label>

              <select
                name="status"
                value={form.status}
                onChange={handleChange}
                className="w-full border rounded-2xl p-4 outline-none"
              >

                <option value="Paid">
                  Paid
                </option>

                <option value="Pending">
                  Pending
                </option>

                <option value="Failed">
                  Failed
                </option>

              </select>

            </div>

            {/* TRANSACTION ID */}
            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">
                Transaction ID
              </label>

              <input
                type="text"
                name="transactionId"
                value={form.transactionId}
                onChange={handleChange}
                placeholder="Transaction ID"
                className="w-full border rounded-2xl p-4 outline-none"
              />

            </div>

            {/* NOTES */}
            <div className="md:col-span-2">

              <label className="block mb-2 font-semibold">
                Notes
              </label>

              <div className="border rounded-2xl p-4">

                <div className="flex gap-3">

                  <FileText
                    size={18}
                    className="text-gray-400 mt-1"
                  />

                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows="4"
                    placeholder="Payment notes..."
                    className="w-full outline-none resize-none"
                  />

                </div>

              </div>

            </div>

          </div>

          {/* SUBMIT */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-8 bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl flex items-center justify-center gap-2"
          >

            <Save size={18} />

            {loading
              ? "Saving Payment..."
              : "Save Payment"}

          </button>

        </form>

      </div>

    </div>
  );
};

export default AddPayment;