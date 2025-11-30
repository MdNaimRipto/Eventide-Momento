import Image from "next/image";
import bg from "@/assets/images/auth/banner.webp";
import { IoHomeSharp } from "react-icons/io5";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";

const LoginMain = () => {
  return (
    <div className="relative w-full h-screen grid md:grid-cols-2">
      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />
      <div className="absolute w-full h-full overflow-hidden z-0 -scale-x-100">
        <Image
          src={bg}
          alt="Hero-image"
          className="w-full h-full object-cover"
        />
      </div>
      <div className="bg-primary col-span-1 h-full w-full z-30 flex justify-center items-center">
        <div className="flex flex-col gap-2 w-full px-6 lg:w-1/2">
          <h2
            className={`${LocalFonts.anton.className} text-3xl lg:text-5xl mb-2 lg:mb-6 text-secondary1 tracking-wide`}
          >
            Login
          </h2>
          <form className="">
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
                className="border-b-2 border-secondary1 bg-primary p-3 text-sm focus:bg-primary focus:outline-none"
              />
            </div>
            <button
              className={`w-[200px] px-3 py-2 my-4 bg-secondary2 text-secondary1 hover:bg-white duration-700 lg:text-lg tracking-wide ${LocalFonts.anton.className}`}
            >
              Login Now
            </button>
            <p className="text-xs">
              Don&apos;t have an account?{" "}
              <Link
                className="text-secondary1 font-semibold hover:underline"
                href={"/auth/register"}
              >
                Register here
              </Link>
            </p>
          </form>
          <div className="flex justify-center sc">
            <Link
              href={"/"}
              className="text-secondary1 text-xs font-semibold hover:underline flex gap-1 absolute bottom-2"
            >
              <IoHomeSharp />
              Go back to home
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginMain;
