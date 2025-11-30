import Link from "next/link";
import { LocalFonts } from "../common/fonts";

const Footer = () => {
  const menuItems = [
    { item: "Home", path: "/" },
    { item: "Events", path: "/events" },
    { item: "Contact Us", path: "/contact" },
    { item: "About Us", path: "/about-us" },
    { item: "Blogs", path: "/blog" },
  ];

  const year = new Date().getFullYear();

  return (
    <div className="bg-secondary1 w-full h-[600px] flex flex-col justify-between">
      <div className="container relative p-16 overflow-hidden">
        <h1
          className={`text-[280px] tracking-widest -mt-20 text-center uppercase text-white ${LocalFonts.anton.className} relative`}
        >
          {/* Galacraft */}
          Eventide
          <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-b from-secondary1/10 to-secondary1/70" />
        </h1>

        <div className="flex items-start justify-between px-4 mt-10">
          {/* Left Description */}
          <div className="w-[400px] relative">
            <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-b from-secondary1/30 to-secondary1/60" />
            <p
              className={`${LocalFonts.anton.className} text-white text-xl leading-snug`}
            >
              We are dedicated to creating unforgettable events tailored to your
              unique vision.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col xl:flex-row gap-4 relative">
            {menuItems.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.path}
                className={`text-white uppercase tracking-wider text-xl hover:text-white/70 transition ${LocalFonts.anton.className}`}
              >
                {menu.item}
              </Link>
            ))}
            <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-b from-secondary1/30 to-secondary1/50" />
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full pb-6">
        <p className="text-center text-white/60 text-sm">
          © {year} Galacraft. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
