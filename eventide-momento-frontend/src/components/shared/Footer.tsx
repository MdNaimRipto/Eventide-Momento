import Link from "next/link";
import { LocalFonts } from "../common/fonts";
import ShutterText from "../animations/ShutterText";

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
    <div className="bg-secondary1 w-full h-[580px] md:h-[480px] xl:h-[550px] flex flex-col justify-between relative z-[650]">
      <div className="container relative p-6 xl:p-16 overflow-hidden">
        <h1
          className={`text-6xl md:text-[160px] xl:text-[280px] tracking-widest xl:-mt-10 text-center uppercase text-white ${LocalFonts.anton.className} relative`}
        >
          <ShutterText text={"Eventide"} delay={0} />
          <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-b from-secondary1/10 to-secondary1/70" />
        </h1>

        <div className="flex flex-col md:flex-row items-start justify-between md:px-8 xl:px-4 mt-10 gap-6 xl:gap-0 text-center md:text-left">
          {/* Left Description */}
          <div className="md:w-[400px] relative">
            <div className="absolute top-0 left-0 w-full h-full z-50 bg-gradient-to-b from-secondary1/30 to-secondary1/60" />
            <p
              className={`${LocalFonts.anton.className} text-white text-xl leading-snug`}
            >
              We are dedicated to creating unforgettable events tailored to your
              unique vision.
            </p>
          </div>

          {/* Navigation */}
          <div className="flex flex-col md:flex-row md:flex-wrap justify-center w-full md:w-[240px] lg:w-auto md:justify-start gap-4">
            {menuItems.map((menu, idx) => (
              <Link
                key={idx}
                href={menu.path}
                className={`text-white uppercase tracking-wider text-xl hover:text-white/70 transition ${LocalFonts.anton.className} relative`}
              >
                {menu.item}
                <div className="absolute top-0 left-0 w-full h-full z-0 bg-gradient-to-b from-secondary1/30 to-secondary1/50" />
              </Link>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Copyright */}
      <div className="w-full pb-6">
        <p className="text-center text-white/60 text-sm">
          © {year} Eventide Momento. All rights reserved.
        </p>
      </div>
    </div>
  );
};

export default Footer;
