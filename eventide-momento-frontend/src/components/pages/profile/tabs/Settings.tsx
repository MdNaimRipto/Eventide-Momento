"use client";
import CommonButton from "@/components/common/CommonButton";
import React, { useState } from "react";

const Settings: React.FC = () => {
  const [activeTab, setActiveTab] = useState<"profile" | "password">("profile");

  const [profile, setProfile] = useState({
    userName: "Jane Doe",
    email: "jane.doe@example.com",
    contactNumber: "+1234567890",
    location: "New York, USA",
    bio: "Enthusiastic event-goer and hobbyist coder.",
  });

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setProfile({ ...profile, [e.target.name]: e.target.value });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPasswords({ ...passwords, [e.target.name]: e.target.value });
  };

  const handleProfileSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Profile updated:", profile);
  };

  const handlePasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Password updated:", passwords);
  };

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
        {activeTab === "profile" && (
          <form className="space-y-4" onSubmit={handleProfileSubmit}>
            <div className="mb-6 border-b border-gray-200">
              <h2 className="text-3xl font-semibold mb-2">Update Profile</h2>
              <p className="text-gray-500 font-light tracking-wide leading-5 text-sm pb-3 pt-2 md:max-w-[550px]">
                Update your personal information and contact details. This is
                how others will see you on the platform.
              </p>
            </div>

            <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 flex flex-col gap-6">
              <input
                type="text"
                name="userName"
                value={profile.userName}
                onChange={handleProfileChange}
                placeholder="Full Name"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <input
                type="email"
                name="email"
                value={profile.email}
                onChange={handleProfileChange}
                placeholder="Email"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <input
                type="text"
                name="contactNumber"
                value={profile.contactNumber}
                onChange={handleProfileChange}
                placeholder="Contact Number"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <input
                type="text"
                name="location"
                value={profile.location}
                onChange={handleProfileChange}
                placeholder="Location"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <textarea
                name="bio"
                value={profile.bio}
                onChange={handleProfileChange}
                placeholder="Bio"
                rows={3}
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />

              <div>
                <CommonButton title="Update Now" />
              </div>
            </div>
          </form>
        )}

        {activeTab === "password" && (
          <form className="space-y-4" onSubmit={handlePasswordSubmit}>
            <div className="mb-6 border-b border-gray-200">
              <h2 className="text-3xl font-semibold mb-2">Update Password</h2>
              <p className="text-gray-500 font-light tracking-wide leading-5 text-sm pb-3 pt-2 md:max-w-[500px]">
                Update your password to keep your account safe and strong from
                any kind of harm.
              </p>
            </div>

            <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 flex flex-col gap-6">
              <input
                type="password"
                name="currentPassword"
                value={passwords.currentPassword}
                onChange={handlePasswordChange}
                placeholder="Current Password"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <input
                type="password"
                name="newPassword"
                value={passwords.newPassword}
                onChange={handlePasswordChange}
                placeholder="New Password"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
              <input
                type="password"
                name="confirmPassword"
                value={passwords.confirmPassword}
                onChange={handlePasswordChange}
                placeholder="Confirm Password"
                className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
              />
            </div>
            <div>
              <CommonButton title="Update Now" />
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default Settings;
