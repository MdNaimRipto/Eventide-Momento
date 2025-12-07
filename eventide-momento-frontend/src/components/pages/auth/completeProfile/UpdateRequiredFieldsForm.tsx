"use client";

import { useState } from "react";
import { LocalFonts } from "@/components/common/fonts";
import { useUserContext } from "@/contexts/AuthContext";
import { userApis, useUpdateUserMutation } from "@/redux/features/userApis";
import { postApiHandler } from "@/lib/postApiHandler";
import { useRouter } from "next/navigation";
import { useAppDispatch } from "@/redux/hook";

const interestsList = [
  "Gaming",
  "Traveling",
  "Sports",
  "Music",
  "Cooking",
  "Tech",
  "Photography",
  "Art",
];

const UpdateRequiredFieldsForm = () => {
  const { user } = useUserContext();
  const [update] = useUpdateUserMutation();
  const dispatch = useAppDispatch();

  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  // Only track changed fields
  const [profile, setProfile] = useState<
    Partial<{
      role: string;
      bio: string;
      interests: string[];
    }>
  >({});

  // Role toggle
  const handleRoleSelect = (value: string) => {
    setProfile((prev) => ({ ...prev, role: value }));
  };

  // Text inputs
  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setProfile((prev) => ({ ...prev, [name]: value }));
  };

  // Multi-select interests
  const handleInterestsChange = (value: string) => {
    setProfile((prev) => {
      const interests = prev.interests || [];
      const updated = interests.includes(value)
        ? interests.filter((i) => i !== value)
        : [...interests, value];
      return { ...prev, interests: updated };
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!user) return;

    await postApiHandler({
      mutateFn: update,
      options: { data: { ...profile, IsFirstTimeUpdated: true } },
      setIsLoading,
      optionalTasksFn: async () => {
        setProfile({});
        dispatch(userApis.util.resetApiState());
        router.push("/user/profile");
      },
    });
  };

  return (
    <div className="bg-primary col-span-1 min-h-screen w-full z-30 flex justify-center items-center">
      <div className="flex flex-col gap-4 w-full px-6 lg:w-2/3">
        <h2
          className={`${LocalFonts.anton.className} text-3xl lg:text-5xl mb-2 text-secondary1 tracking-wide`}
        >
          Complete Your Profile
        </h2>

        <p className="text-secondary1/70 text-sm mb-4">
          Please fill these required details to access your profile and get
          personalized event suggestions.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid gap-6">
            {/* ROLE SELECTOR */}
            <div className="flex flex-col gap-2 py-2">
              <label className="text-secondary1 text-sm font-medium">
                Role
              </label>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => handleRoleSelect("HOST")}
                  className={`px-4 py-2 border-2 rounded-lg text-sm ${
                    profile.role === "HOST"
                      ? "bg-secondary2 border-secondary2 text-secondary1"
                      : "border-secondary1 text-secondary1"
                  }`}
                >
                  Host
                </button>

                <button
                  type="button"
                  onClick={() => handleRoleSelect("USER")}
                  className={`px-4 py-2 border-2 rounded-lg text-sm ${
                    profile.role === "USER"
                      ? "bg-secondary2 border-secondary2 text-secondary1"
                      : "border-secondary1 text-secondary1"
                  }`}
                >
                  User
                </button>
              </div>
            </div>

            {/* BIO */}
            <div className="flex flex-col gap-2 py-2">
              <label
                htmlFor="bio"
                className="text-secondary1 text-sm font-medium"
              >
                Bio
              </label>
              <textarea
                name="bio"
                placeholder="Tell something about yourself..."
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:outline-none"
                rows={4}
                onChange={handleChange}
              ></textarea>
            </div>
          </div>

          {/* INTERESTS */}
          <div className="flex flex-col gap-3 py-2 mt-4">
            <label className="text-secondary1 text-sm font-medium">
              Interests
            </label>

            <div className="flex flex-wrap gap-3">
              {interestsList.map((item) => {
                const active = profile.interests?.includes(item);
                return (
                  <button
                    key={item}
                    type="button"
                    onClick={() => handleInterestsChange(item)}
                    className={`px-4 py-2 rounded-full border-2 text-xs ${
                      active
                        ? "bg-secondary2 border-secondary2 text-secondary1"
                        : "border-secondary1 text-secondary1"
                    }`}
                  >
                    {item}
                  </button>
                );
              })}
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button
            type="submit"
            disabled={isLoading}
            className={`w-[220px] px-3 py-2 my-6 bg-secondary2 text-secondary1 hover:bg-white duration-700 lg:text-lg tracking-wide ${
              LocalFonts.anton.className
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Saving..." : "Complete Setup"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default UpdateRequiredFieldsForm;
