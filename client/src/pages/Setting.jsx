import React, { useState } from "react";
import { Menu, Settings, Wrench } from "lucide-react";

import Sidebar from "../components/Sidebar";

const Setting = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);

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
        <div className="flex items-center gap-4 mb-8">

          <button
            onClick={() => setSidebarOpen(true)}
            className="md:hidden bg-white p-3 rounded-xl shadow"
          >
            <Menu size={22} />
          </button>

          <div>
            <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
              <Settings className="text-blue-600" />
              Settings
            </h1>

            <p className="text-gray-500 mt-1">
              Manage application settings
            </p>
          </div>

        </div>

        {/* ================= UNDER CONSTRUCTION ================= */}
        <div className="bg-white rounded-3xl shadow-lg p-10 flex flex-col items-center justify-center min-h-[70vh]">

          <div className="bg-blue-100 p-6 rounded-full mb-6">
            <Wrench
              size={60}
              className="text-blue-600"
            />
          </div>

          <h2 className="text-4xl font-bold text-gray-800 mb-4 text-center">
            Under Construction
          </h2>

          <p className="text-gray-500 text-center max-w-lg text-lg leading-relaxed">
            We're currently working on the Settings
            module. New features and customization
            options will be available soon.
          </p>

          <div className="mt-8">
            <div className="w-72 h-3 bg-gray-200 rounded-full overflow-hidden">
              <div className="h-full bg-blue-600 w-2/3 animate-pulse rounded-full"></div>
            </div>

            <p className="text-center text-sm text-gray-400 mt-3">
              Development in progress...
            </p>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Setting;