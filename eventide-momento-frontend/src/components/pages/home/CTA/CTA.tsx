import Image from "next/image";
import bg from "@/assets/images/auth/banner.webp";
import { LocalFonts } from "@/components/common/fonts";

const CTA = () => {
  return (
    <div className="relative w-full h-screen">
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
        <div className="bg-primary p-10 max-w-[800px] w-full border border-white/20 text-center flex flex-col gap-6">
          {/* Description */}
          <p className={`text-black/30 text-4xl ${LocalFonts.anton.className}`}>
            Join our community and never miss exciting new events, activities,
            and gatherings happening around you.
          </p>

          <p
            className={`${LocalFonts.anton.className} text-2xl text-secondary1 mt-8`}
          >
            eventide.momento@gmail.com
          </p>
        </div>
      </div>
    </div>
  );
};

export default CTA;
