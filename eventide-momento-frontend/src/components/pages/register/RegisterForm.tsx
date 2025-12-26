"use client";

import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";
import { useRegisterMutation } from "@/redux/features/userApis";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { postApiHandler } from "@/lib/postApiHandler";

const RegisterForm = () => {
  const [register] = useRegisterMutation();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const formData = new FormData(e.currentTarget);

    const options = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      contact: formData.get("contact"),
      password: formData.get("password"),
    };

    await postApiHandler({
      mutateFn: register,
      options,
      setIsLoading,
      optionalTasksFn: () => {
        router.push("/auth/complete-profile");
      },
    });
  };

  return (
    <div className="bg-primary col-span-1 h-full w-full z-30 flex justify-center items-center">
      <div className="flex flex-col gap-2 w-full px-6 lg:w-2/3">
        <h2
          className={`${LocalFonts.anton.className} text-3xl lg:text-5xl mb-2 lg:mb-6 text-secondary1 tracking-wide`}
        >
          Register
        </h2>

        <form onSubmit={handleRegister}>
          <div className="grid lg:grid-cols-2 gap-2 lg:gap-6">
            <div className="flex flex-col gap-1 lg:gap-3 py-2 lg:py-3">
              <label
                htmlFor="name"
                className="text-secondary1 text-sm font-medium"
              >
                Name
              </label>
              <input
                name="fullName"
                type="text"
                placeholder="Your name goes here"
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1 lg:gap-3 py-2 lg:py-3">
              <label
                htmlFor="email"
                className="text-secondary1 text-sm font-medium"
              >
                Email
              </label>
              <input
                name="email"
                type="email"
                placeholder="Your email goes here"
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1 lg:gap-3 py-2 lg:py-3">
              <label
                htmlFor="contact"
                className="text-secondary1 text-sm font-medium"
              >
                Contact Number
              </label>
              <input
                name="contact"
                type="tel"
                placeholder="Your contact goes here"
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:outline-none"
                required
              />
            </div>

            <div className="flex flex-col gap-1 lg:gap-3 py-2 lg:py-3">
              <label
                htmlFor="password"
                className="text-secondary1 text-sm font-medium"
              >
                Password
              </label>
              <input
                name="password"
                type="password"
                placeholder="Your password goes here"
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:outline-none"
                required
              />
            </div>
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className={`w-[200px] px-3 py-2 my-4 bg-secondary2 text-secondary1 hover:bg-white duration-700 lg:text-lg tracking-wide ${
              LocalFonts.anton.className
            } ${isLoading ? "opacity-50 cursor-not-allowed" : ""}`}
          >
            {isLoading ? "Registering..." : "Register Now"}
          </button>

          <p className="text-xs">
            Already have an account?{" "}
            <Link
              className="text-secondary1 font-semibold hover:underline"
              href={"/auth/login"}
            >
              Login here
            </Link>
          </p>
        </form>

        <div className="flex justify-center">
          <Link
            href={"/"}
            className="text-secondary1 text-xs font-semibold hover:underline flex gap-1 absolute bottom-4"
          >
            <IoHomeSharp />
            Go back to home
          </Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterForm;
