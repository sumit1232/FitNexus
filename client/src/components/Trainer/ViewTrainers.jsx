import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import {
  ArrowLeft,
  Mail,
  Phone,
  Star,
  CalendarDays,
  Award,
} from "lucide-react";

const ViewTrainers = () => {
  const API = import.meta.env.VITE_API_URL;

  const { id } = useParams();
  const navigate = useNavigate();

  const [trainer, setTrainer] = useState(null);
  const [loading, setLoading] = useState(true);

  // ======================
  // FETCH TRAINER
  // ======================
  useEffect(() => {
    const fetchTrainer = async () => {
      try {
        const res = await axios.get(
          `${API}/api/trainers/singletrainer/${id}`
        );

        setTrainer(res.data?.trainer || null);
      } catch (error) {
        console.log(error);
        setTrainer(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrainer();
  }, [id]);

  // ======================
  // LOADING STATE
  // ======================
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-600 text-lg">Loading trainer...</p>
      </div>
    );
  }

  // ======================
  // NOT FOUND
  // ======================
  if (!trainer) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-red-500 text-lg">Trainer not found</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      {/* HEADER */}
      <div className="flex items-center gap-3 mb-6">
        <button
          onClick={() => navigate("/trainers")}
          className="bg-white shadow p-3 rounded-xl hover:bg-gray-100"
        >
          <ArrowLeft size={20} />
        </button>

        <h1 className="text-2xl font-bold text-gray-800">
          Trainer Details
        </h1>
      </div>

      {/* CARD */}
      <div className="bg-white rounded-3xl shadow-md p-8 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* LEFT - IMAGE */}
        <div className="flex flex-col items-center">
          <img
            src={
              trainer.image
                ? `${API}/uploads/${trainer.image}`
                : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
            }
            alt="trainer"
            className="w-40 h-40 rounded-full border-4 border-blue-500 object-cover"
          />

          <h2 className="mt-4 text-xl font-bold text-gray-800">
            {trainer.name}
          </h2>

          <p className="text-gray-500">
            {trainer.specialization}
          </p>

          <div className="flex items-center gap-1 text-yellow-500 mt-2 font-semibold">
            <Star size={18} />
            {trainer.rating || "0"}
          </div>
        </div>

        {/* RIGHT - DETAILS */}
        <div className="md:col-span-2 space-y-5">

          {/* EMAIL */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Mail className="text-blue-600" />
            <div>
              <p className="text-sm text-gray-500">Email</p>
              <h3 className="font-semibold">{trainer.email}</h3>
            </div>
          </div>

          {/* PHONE */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Phone className="text-green-600" />
            <div>
              <p className="text-sm text-gray-500">Phone</p>
              <h3 className="font-semibold">{trainer.phone}</h3>
            </div>
          </div>

          {/* EXPERIENCE */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <Award className="text-purple-600" />
            <div>
              <p className="text-sm text-gray-500">Experience</p>
              <h3 className="font-semibold">
                {trainer.experience}
              </h3>
            </div>
          </div>

          {/* JOINING DATE */}
          <div className="flex items-center gap-4 bg-gray-50 p-4 rounded-xl">
            <CalendarDays className="text-orange-600" />
            <div>
              <p className="text-sm text-gray-500">
                Joining Date
              </p>
              <h3 className="font-semibold">
                {trainer.joiningDate
                  ? new Date(
                      trainer.joiningDate
                    ).toLocaleDateString()
                  : "N/A"}
              </h3>
            </div>
          </div>

          {/* STATUS */}
          <div>
            <span
              className={`px-4 py-2 rounded-full text-sm font-medium ${
                trainer.status === "Active"
                  ? "bg-green-100 text-green-700"
                  : "bg-red-100 text-red-700"
              }`}
            >
              {trainer.status}
            </span>
          </div>
        </div>
      </div>

    </div>
  );
};

export default ViewTrainers;