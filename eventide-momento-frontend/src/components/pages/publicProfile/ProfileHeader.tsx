"use client";

import Image from "next/image";
import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import Link from "next/link";
import { IUser } from "@/types/userTypes";

export default function ProfileHeader({ host }: { host: IUser }) {
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
        <div className="w-[220px] h-[220px] rounded-3xl overflow-hidden border-4 border-primary shadow-xl">
          <Image
            src={host.profileImage || "https://github.com/shadcn.png"}
            alt="Profile"
            width={220}
            height={220}
            className="object-cover h-full w-full bg-primary"
          />
        </div>

        {/* User Info */}
        <div className="flex flex-col items-center md:items-start">
          <h5
            className={`${LocalFonts.anton.className} text-3xl text-secondary1 tracking-wider font-semibold`}
          >
            <ShutterText text={host?.userName as string} />
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
