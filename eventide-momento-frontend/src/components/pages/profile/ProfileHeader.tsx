"use client";

import Image from "next/image";
import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import { useUserContext } from "@/contexts/AuthContext";
import { useUpdateUserMutation } from "@/redux/features/userApis";
import { useState } from "react";
import { postApiHandler } from "@/lib/postApiHandler";
import { Input } from "@/components/ui/input";
import { FaEdit } from "react-icons/fa";
import { IApiSuccessResponse } from "@/types/apiResponseTypes";
import { Spinner } from "@/components/ui/spinner";
import Link from "next/link";
import { apiConfig } from "@/configs/apiConfig";

export default function ProfileHeader() {
  const { user } = useUserContext();
  const [updateUser] = useUpdateUserMutation();
  const [isLoading, setIsLoading] = useState(false);

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || !e.target.files[0]) return;
    const form = e.target;

    const files = form.files;

    if (files && files.length) {
      const formData = new FormData();
      formData.append("file", files[0]); // matches multer field name

      try {
        setIsLoading(true);
        const fetchResponse = await fetch(
          apiConfig.BASE_URL + apiConfig.IMAGE.UPLOAD,
          {
            method: "POST",
            body: formData,
            redirect: "follow",
          }
        );
        const response: IApiSuccessResponse = await fetchResponse.json();

        // // 1️⃣ Upload image
        const imageUrl = response.data.url;

        // 2️⃣ Update user profile
        await postApiHandler({
          mutateFn: updateUser,
          options: { data: { profileImage: imageUrl } },
          setIsLoading,
        });
      } catch (err) {
        console.error("Error uploading profile image:", err);
      } finally {
        setIsLoading(false);
      }
    }
  };

  const stats = [
    { label: "Followers", value: 2985 },
    { label: "Hosted", value: 132 },
    { label: "Attended", value: 548 },
  ];

  return (
    <div className="w-full relative mt-[80px]">
      {/* Gradient Banner */}
      <div className="h-56 w-full rounded-3xl bg-gradient-to-tr from-secondary1/90 to-secondary1/60" />

      {/* Content */}
      <div className="px-6 -mt-28 flex flex-col md:flex-row items-center md:items-end gap-6">
        {/* Profile Image */}
        <div className="w-[220px] h-[220px] rounded-3xl overflow-hidden border-4 border-primary shadow-xl relative group cursor-pointer">
          <Image
            src={user?.profileImage || "https://github.com/shadcn.png"}
            alt="Profile"
            width={220}
            height={220}
            className="object-cover h-full w-full bg-primary"
          />

          <Input
            className="opacity-0 absolute w-full h-full z-50 top-0 left-0 cursor-pointer"
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            disabled={isLoading}
          />

          <FaEdit
            className={`absolute z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-secondary1 text-3xl ${
              isLoading
                ? "opacity-0 cursor-default"
                : "opacity-0 group-hover:opacity-100"
            } duration-500`}
          />

          {isLoading && (
            <div className="absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <Spinner className="text-primary size-16" />
            </div>
          )}
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center md:items-start">
          <h5
            className={`${LocalFonts.anton.className} text-3xl text-secondary1 tracking-wider font-semibold`}
          >
            <ShutterText text={user?.userName as string} />
          </h5>

          <Link
            href={"/user/profile?tab=settings"}
            className="mt-2 flex gap-3 scale-75 md:-ml-6"
          >
            <CommonButton title={"Edit Profile"} />
          </Link>
        </div>

        {/* Stats */}
        <div className="ml-auto hidden lg:flex gap-12">
          {stats.map((item, index) => (
            <div className="text-start" key={index}>
              <h6 className="text-gray-500 text-sm">{item.label}</h6>
              <h4
                className={`${LocalFonts.anton.className} text-5xl text-secondary1`}
              >
                {item.value}
              </h4>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
