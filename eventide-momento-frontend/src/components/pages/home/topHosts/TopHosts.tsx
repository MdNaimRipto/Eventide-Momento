import host from "@/assets/images/home/hero-banner.webp";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";

const hosts = [
  {
    name: "Ariana Ford",
    image: host,
  },
  {
    name: "Lucas Bennett",
    image: host,
  },
  {
    name: "Meera Das",
    image: host,
  },
];

const TopHosts = () => {
  return (
    <div className="container pb-16 grid grid-cols-3 gap-16 px-0">
      {hosts.map((host, index) => (
        <div key={index} className="relative h-[600px] overflow-hidden">
          {/* Host Image */}
          <Image
            src={host.image}
            alt={host.name}
            fill
            className="object-cover"
          />

          {/* Rank Badge */}

          <span
            className={`absolute top-10 left-8 text-white ${LocalFonts.anton.className} text-9xl`}
          >
            {String(index + 1).padStart(2, "0")}
          </span>

          {/* Host Name */}
          <div
            className={`absolute left-8 bottom-16 text-6xl ${LocalFonts.anton.className} text-primary`}
          >
            {host.name}
          </div>
        </div>
      ))}
    </div>
  );
};

export default TopHosts;
