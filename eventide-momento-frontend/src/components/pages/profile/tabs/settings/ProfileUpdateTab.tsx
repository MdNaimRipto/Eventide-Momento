"use client";

import { useState } from "react";
import CommonButton from "@/components/common/CommonButton";
import { useUserContext } from "@/contexts/AuthContext";
import { useUpdateUserMutation } from "@/redux/features/userApis";
import { postApiHandler } from "@/lib/postApiHandler";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";

const availableInterests = [
  "Music",
  "Sports",
  "Gaming",
  "Travel",
  "Coding",
  "Reading",
  "Movies",
  "Photography",
];

const ProfileUpdateTab = () => {
  const { user } = useUserContext();
  const [isLoading, setIsLoading] = useState(false);
  const [update] = useUpdateUserMutation();

  // Only track changed fields
  const [profile, setProfile] = useState<
    Partial<{
      userName: string;
      email: string;
      contactNumber: string;
      location: string;
      bio: string;
      interests: string[];
    }>
  >({});

  const handleProfileChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  const handleInterestsChange = (value: string) => {
    setProfile((prev) => {
      const interests = prev.interests || [];
      const updated = interests.includes(value)
        ? interests.filter((i) => i !== value)
        : [...interests, value];
      return { ...prev, interests: updated };
    });
  };

  const handleProfileSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    // Only send fields that are present in `profile`
    const options = { data: profile };

    await postApiHandler({
      mutateFn: update,
      options,
      setIsLoading,
      optionalTasksFn: async () => {
        setProfile({});
      },
    });
  };

  return (
    <form className="space-y-4" onSubmit={handleProfileSubmit}>
      <div className="mb-6 border-b border-gray-200">
        <h2 className="text-3xl font-semibold mb-2">Update Profile</h2>
        <p className="text-gray-500 font-light tracking-wide leading-5 text-sm pb-3 pt-2 md:max-w-[550px]">
          Update only the fields you want. Unchanged fields will remain the
          same.
        </p>
      </div>

      <div className="w-full md:w-4/5 lg:w-3/5 xl:w-1/2 flex flex-col gap-6">
        {/** Full Name */}
        <div className="flex flex-col gap-1">
          <label htmlFor="userName" className="font-medium text-sm">
            Full Name
          </label>
          <input
            id="userName"
            type="text"
            name="userName"
            value={profile.userName || ""}
            onChange={handleProfileChange}
            placeholder="Full Name"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
        </div>

        {/** Email */}
        <div className="flex flex-col gap-1">
          <label htmlFor="email" className="font-medium text-sm">
            Email
          </label>
          <input
            id="email"
            type="email"
            name="email"
            value={profile.email || ""}
            onChange={handleProfileChange}
            placeholder="Email"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
        </div>

        {/** Contact Number */}
        <div className="flex flex-col gap-1">
          <label htmlFor="contactNumber" className="font-medium text-sm">
            Contact Number
          </label>
          <input
            id="contactNumber"
            type="text"
            name="contactNumber"
            value={profile.contactNumber || ""}
            onChange={handleProfileChange}
            placeholder="Contact Number"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
        </div>

        {/** Location */}
        <div className="flex flex-col gap-1">
          <label htmlFor="location" className="font-medium text-sm">
            Location
          </label>
          <input
            id="location"
            type="text"
            name="location"
            value={profile.location || ""}
            onChange={handleProfileChange}
            placeholder="Location"
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
        </div>

        {/** Bio */}
        <div className="flex flex-col gap-1">
          <label htmlFor="bio" className="font-medium text-sm">
            Bio
          </label>
          <textarea
            id="bio"
            name="bio"
            value={profile.bio || ""}
            onChange={handleProfileChange}
            placeholder="Bio"
            rows={3}
            className="w-full border border-gray-300 px-4 py-2 focus:outline-none focus:ring-2 focus:ring-secondary1"
          />
        </div>

        {/** Interests */}
        <div className="flex flex-col gap-1">
          <label htmlFor="interests" className="font-medium text-sm">
            Interests
          </label>
          <Select value="" onValueChange={handleInterestsChange}>
            <SelectTrigger id="interests" className="w-full">
              <SelectValue placeholder="Select Interests" />
            </SelectTrigger>
            <SelectContent>
              {availableInterests.map((interest) => (
                <SelectItem key={interest} value={interest}>
                  {interest}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <div className="flex flex-wrap gap-2 mt-2">
            {(profile.interests || []).map((i) => (
              <span
                key={i}
                className="bg-secondary1 text-white px-2 py-1 rounded-full text-sm"
              >
                {i}
              </span>
            ))}
          </div>
        </div>

        <div>
          <CommonButton title={isLoading ? "Updating..." : "Update Now"} />
        </div>
      </div>
    </form>
  );
};

export default ProfileUpdateTab;
