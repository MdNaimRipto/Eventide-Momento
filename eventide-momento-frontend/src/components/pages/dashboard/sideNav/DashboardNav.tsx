"use client";
import NavItems from "@/components/shared/navbar/NavItems";
import NavLogo from "@/components/shared/navbar/NavLogo";
import { Fade as Hamburger } from "hamburger-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

const DashboardNav = () => {
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
        className={`sticky top-0 left-0 w-full h-[80px] z-40 overflow-hidden ${
          isHomePage && !isScrolled ? "bg-white/0" : "bg-primary"
        } duration-700`}
      >
        <div className="flex w-full h-full justify-between items-center px-4 md:px-8">
          <NavLogo />
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            color={isHomePage && !isScrolled ? "#ffffff" : "#000000"}
          />
        </div>
      </div>
      <NavItems isOpen={isOpen} setIsOpen={setOpen} />
    </div>
  );
};

export default DashboardNav;
