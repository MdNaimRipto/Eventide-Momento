import Image from "next/image";
import bg from "@/assets/images/auth/banner.webp";
import { LocalFonts } from "@/components/common/fonts";
import { FaLinkedinIn, FaGithub, FaFacebook } from "react-icons/fa";

const CTA = () => {
  const socialLinks = [
    {
      icon: FaLinkedinIn,
      link: "https://www.linkedin.com/in/naimur-rahman2001",
      label: "LinkedIn",
    },
    {
      icon: FaGithub,
      link: "https://github.com/MdNaimRipto",
      label: "GitHub",
    },
    {
      icon: FaFacebook,
      link: "https://www.facebook.com/mdnaimur.rahman.50309",
      label: "Instagram",
    },
  ];

  return (
    <div className="relative w-full h-[600px] md:h-screen">
      <div className="absolute z-10 bg-gradient-to-r from-primary/10 to-primary/10 w-full h-full" />
      {/* Background Image */}
      <Image
        src={bg}
        alt="cta-background"
        className="w-full h-full object-cover absolute top-0 left-0"
        priority
      />

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black/40" />

      {/* Center Card */}
      <div className="relative z-20 w-full h-full flex items-center justify-center px-4">
        <div className="bg-primary p-6 md:p-10 max-w-[800px] w-full border border-white/20 text-center flex flex-col gap-6">
          {/* Description */}
          <p
            className={`text-black/30 text-xl md:text-4xl ${LocalFonts.anton.className}`}
          >
            Join our community and never miss exciting new events, activities,
            and gatherings happening around you.
          </p>

          <p
            className={`${LocalFonts.anton.className} text-lg md:text-2xl text-secondary1 md:mt-8`}
          >
            <a
              href="mailto:mdnaimurrahman681@gmail.com"
              className="hover:underline"
              target="_blank"
            >
              eventide.momento@gmail.com
            </a>
          </p>

          <div className="flex items-center justify-center gap-6">
            {socialLinks.map((item) => {
              const Icon = item.icon;
              return (
                <a
                  key={item.label}
                  href={item.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-black/30 text-2xl hover:text-secondary2 transition-colors duration-300"
                  aria-label={item.label}
                >
                  <Icon />
                </a>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CTA;
