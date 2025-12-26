"use client";
import { useEffect, useState, useRef } from "react";
import NavLogo from "./NavLogo";
import { Fade as Hamburger } from "hamburger-react";
import NavItems from "./NavItems";
import { usePathname } from "next/navigation";

const Navbar = () => {
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  const pathname = usePathname();

  // For detecting clicks on the hamburger button
  const hamburgerRef = useRef<HTMLDivElement>(null);

  // For detecting clicks inside the opened menu (NavItems)
  const menuRef = useRef<HTMLDivElement>(null);

  // Scroll listener
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 0);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Outside-click listener
  useEffect(() => {
    if (!isOpen) return;

    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;

      const clickedHamburger = hamburgerRef.current?.contains(target) ?? false;

      const clickedMenu = menuRef.current?.contains(target) ?? false;

      if (!clickedHamburger && !clickedMenu) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const isHomePage = pathname === "/";

  return (
    <div className="overflow-hidden relative w-full">
      <div
        className={`fixed top-0 left-0 w-full h-[80px] z-40 overflow-hidden ${
          isHomePage && !isScrolled ? "bg-white/0" : "bg-primary"
        } duration-700`}
      >
        <div className="flex w-full h-full justify-between items-center px-4 xl:max-w-[1600px] mx-auto">
          <NavLogo />

          {/* Wrap hamburger for ref */}
          <div ref={hamburgerRef} className="scale-90 md:scale-100">
            <Hamburger
              toggled={isOpen}
              toggle={setOpen}
              color={isHomePage && !isScrolled ? "#ffffff" : "#000000"}
            />
          </div>
        </div>
      </div>

      {/* Pass ref to your nav menu */}
      <NavItems isOpen={isOpen} setIsOpen={setOpen} menuRef={menuRef} />
    </div>
  );
};

export default Navbar;
