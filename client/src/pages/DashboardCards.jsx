import React, { useEffect, useState } from "react";
import axios from "axios";
import {
  Users,
  Dumbbell,
  CreditCard,
  UserCheck,
  UserX,
} from "lucide-react";

const DashboardCards = () => {
  const API = import.meta.env.VITE_API_URL;
  
  const [stats, setStats] = useState({
    members: 0,
    trainers: 0,
    payments: 0,
    active: 0,
    inactive: 0,
  });

  // ================= FETCH STATS =================
  const fetchStats = async () => {
    try {
      const res = await axios.get(
        `${API}/api/members/allmembers`
      );

      const members = res.data.members || [];

      const active = members.filter(
        (m) => m.status?.toLowerCase() === "active"
      ).length;

      const inactive = members.filter(
        (m) => m.status?.toLowerCase() === "inactive"
      ).length;

      // trainers
      const trainersRes = await axios.get(
        `${API}/api/trainers/all`
      );

      // payments (optional API)
      const paymentsRes = await axios.get(
        `${API}/api/payments/total`
      );

      setStats({
        members: members.length,
        trainers: trainersRes.data?.total || 0,
        payments: paymentsRes.data?.total || 0,
        active,
        inactive,
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchStats();
  }, []);

  // ================= CARD DATA =================
  const cards = [
    {
      title: "Total Members",
      value: stats.members,
      icon: Users,
      color: "bg-blue-100 text-blue-600",
    },
    {
      title: "Total Trainers",
      value: stats.trainers,
      icon: Dumbbell,
      color: "bg-purple-100 text-purple-600",
    },
    {
      title: "Payments",
      value: `₹${stats.payments}`,
      icon: CreditCard,
      color: "bg-yellow-100 text-yellow-600",
    },
    {
      title: "Active Members",
      value: stats.active,
      icon: UserCheck,
      color: "bg-green-100 text-green-600",
    },
    {
      title: "Inactive Members",
      value: stats.inactive,
      icon: UserX,
      color: "bg-red-100 text-red-600",
    },
  ];

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-5 gap-5">

      {cards.map((card, index) => {
        const Icon = card.icon;

        return (
          <div
            key={index}
            className="bg-white p-5 rounded-2xl shadow hover:shadow-lg transition"
          >
            <div className="flex justify-between items-center">

              <div>
                <p className="text-gray-500 text-sm">
                  {card.title}
                </p>

                <h2 className="text-2xl font-bold mt-2">
                  {card.value}
                </h2>
              </div>

              <div
                className={`p-3 rounded-xl ${card.color}`}
              >
                <Icon size={28} />
              </div>

            </div>
          </div>
        );
      })}

    </div>
  );
};

export default DashboardCards;