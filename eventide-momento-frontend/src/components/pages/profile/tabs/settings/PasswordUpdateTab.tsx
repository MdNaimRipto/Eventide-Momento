"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { useUpdatePasswordMutation } from "@/redux/features/userApis";
import { postApiHandler } from "@/lib/postApiHandler";

const PasswordUpdateTab = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [updatePassword] = useUpdatePasswordMutation();

  const [passwords, setPasswords] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setPasswords((prev) => ({ ...prev, [name]: value }));
  };

  const handlePasswordSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const options = {
      data: passwords,
    };

    await postApiHandler({
      mutateFn: updatePassword,
      options,
      setIsLoading,
      optionalTasksFn: async () => {
        setPasswords({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handlePasswordSubmit}>
      <div className="mb-6 border-b border-gray-200">
        <h2 className="text-3xl font-semibold mb-2">Update Password</h2>
        <p className="text-gray-500 font-light tracking-wide leading-5 text-sm pb-3 pt-2 md:max-w-[500px]">
          Update your password to keep your account safe and strong from any
          kind of harm.
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
        <CommonButton title={isLoading ? "Updating..." : "Update Now"} />
      </div>
    </form>
  );
};

export default PasswordUpdateTab;
