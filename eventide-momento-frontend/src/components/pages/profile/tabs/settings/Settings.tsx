"use client";
import React, { useState } from "react";
import ProfileUpdateTab from "./ProfileUpdateTab";
import PasswordUpdateTab from "./PasswordUpdateTab";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  return (
    <div className="flex flex-col md:flex-row bg-gray-100 min-h-[80vh] shadow-lg overflow-hidden">
      {/* Tabs */}
      <div className="w-full md:w-2/4 lg:w-[400px] bg-white flex md:flex-col gap-2 border-b md:border-b-0 md:border-r border-gray-200 p-2">
        {["profile", "password"].map((tab, i) => (
          <button
            key={i}
            className={`flex-1 md:flex-none px-4 py-3 text-left border-b md:border-b-0 md:border-r border-gray-200 ${
              activeTab === tab
                ? "bg-secondary1 text-white font-semibold"
                : "text-gray-700 hover:bg-gray-50"
            }`}
            onClick={() => setActiveTab(tab as "profile" | "password")}
          >
            {tab.slice(0, 1).toUpperCase() + tab.slice(1, tab.length)}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="w-full p-6 md:p-8 bg-white">
        {activeTab === "profile" && <ProfileUpdateTab />}

        {activeTab === "password" && <PasswordUpdateTab />}
      </div>
    </div>
  );
};

export default Settings;
