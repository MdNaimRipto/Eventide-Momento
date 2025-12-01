import { AiOutlineUser } from "react-icons/ai";
import { Dispatch, SetStateAction } from "react";
import { Fade as Hamburger } from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocalFonts } from "@/components/common/fonts";

const NavItems = ({
  isOpen,
  setIsOpen,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}) => {
  const pathName = usePathname();

  const menuItems = [
    {
      item: "Home",
      path: "/",
    },

    {
      item: "Events",
      path: "/events",
    },
    {
      item: "Contact Us",
      path: "/contact",
    },
    {
      item: "About Us",
      path: "/about-us",
    },
    {
      item: "Blogs",
      path: "/blog",
    },
  ];

  return (
    <div
      className={`fixed top-0 h-screen w-4/5 md:w-2/4 lg:w-2/5 xl:w-2/6 bg-white brightness-95 z-[700] ${
        isOpen ? "right-0" : "-right-full"
      } duration-700`}
    >
      <div className="absolute right-8 top-8 scale-90 md:scale-100">
        <Hamburger toggled={isOpen} toggle={setIsOpen} color="#000" />
      </div>
      <ul
        className={`flex flex-col items-start gap-9 absolute top-0 z-40 pt-24 pl-8 md:pl-16`}
      >
        {menuItems.map((menu, i) => (
          <Link
            onClick={() => setIsOpen(false)}
            href={menu?.path ? menu.path : "/"}
            key={i}
            className={`block text-black text-base md:text-xl xl:text-2xl duration-300`}
          >
            <li
              className={`${LocalFonts.anton.className} hover:underline ${
                pathName === menu?.path && "text-secondary1"
              }`}
            >
              {menu?.item}
            </li>
          </Link>
        ))}
      </ul>

      <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex items-center gap-2">
        <AiOutlineUser className="text-5xl md:text-6xl border border-black rounded-full p-1" />
        <div className="flex flex-col gap-1">
          <h6 className={`${LocalFonts.anton.className} text-base md:text-xl`}>
            <Link
              className="hover:text-secondary1 duration-700"
              href={"/auth/login"}
            >
              Login
            </Link>{" "}
            /{" "}
            <Link
              className="hover:text-secondary1 duration-700"
              href={"/auth/register"}
            >
              Register
            </Link>
          </h6>
          <button className="text-[10px] md:text-xs text-start font-light">
            Profile & Dashboard
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavItems;
