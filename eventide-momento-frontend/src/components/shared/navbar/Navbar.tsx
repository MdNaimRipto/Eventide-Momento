"use client";
import { useEffect, useState } from "react";
import NavLogo from "./NavLogo";
import { Fade as Hamburger } from "hamburger-react";
import NavItems from "./NavItems";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const isHomePage = pathname === "/";

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-40 overflow-hidden ${
          isHomePage && !isScrolled
            ? "bg-white/0"
            : `${isHomePage ? "bg-primary" : "bg-primary"}`
        } duration-700`}
      >
        <div className="flex w-full h-full justify-between items-center px-4 2xl:px-36">
          <NavLogo />
          <div className="scale-90 md:scale-100">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              color={isHomePage && !isScrolled ? "#ffffff" : "#000000"}
            />
          </div>
        </div>
      </div>
      <NavItems isOpen={isOpen} setIsOpen={setOpen} />
    </div>
  );
};

export default Navbar;
