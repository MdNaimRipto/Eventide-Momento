import { AiOutlineUser } from "react-icons/ai";
import { Dispatch, Ref, SetStateAction } from "react";
import { Fade as Hamburger } from "hamburger-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { LocalFonts } from "@/components/common/fonts";
import { useUserContext } from "@/contexts/AuthContext";
import UserProfilePanel from "./UserProfilePanel";

const NavItems = ({
  isOpen,
  setIsOpen,
  menuRef,
}: {
  isOpen: boolean;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  menuRef: Ref<HTMLDivElement>;
}) => {
  const { user } = useUserContext();
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
      item: "Memories",
      path: "/#memories",
    },
    {
      item: "Contact Us",
      path: "/about-us#contact",
    },
    {
      item: "About Us",
      path: "/about-us",
    },
  ];

  return (
    <div
      ref={menuRef}
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

      {user ? (
        // <div className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex items-center gap-2">
        //   <AiOutlineUser className="text-5xl md:text-6xl border border-black rounded-full p-1" />
        //   <Link href={"/user/profile"} className="flex flex-col gap-1">
        //     <h6
        //       className={`${LocalFonts.anton.className} text-base md:text-xl hover:text-secondary1 duration-700`}
        //     >
        //       Hi {user.userName}!
        //     </h6>
        //     <button className="text-[10px] md:text-xs text-start font-light">
        //       Profile & Dashboard
        //     </button>
        //   </Link>
        // </div>
        <UserProfilePanel />
      ) : (
        <Link
          href="/auth/login"
          className="absolute bottom-8 left-8 md:bottom-16 md:left-16 flex items-center gap-2"
        >
          <AiOutlineUser className="text-5xl md:text-6xl border border-black rounded-full p-1" />
          <div className="flex flex-col gap-1">
            <h6
              className={`${LocalFonts.anton.className} text-base md:text-xl`}
            >
              <span className="hover:text-secondary1 duration-700">Login</span>{" "}
              /{" "}
              <span className="hover:text-secondary1 duration-700">
                Register
              </span>
            </h6>
            <button
              disabled
              className="text-[10px] md:text-xs text-start font-light cursor-not-allowed text-black/40"
            >
              Profile & Dashboard
            </button>
          </div>
        </Link>
      )}
    </div>
  );
};

export default NavItems;
