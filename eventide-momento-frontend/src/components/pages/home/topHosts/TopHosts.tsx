import host01 from "@/assets/images/home/persons/01.webp";
import host02 from "@/assets/images/home/persons/02.webp";
import host03 from "@/assets/images/home/persons/03.webp";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";
import ShutterText from "@/components/animations/ShutterText";
import DynamicSwiper from "@/components/common/swiper/DynamicSwiper";

const hosts = [
  { name: "Mason Carter", image: host01 },
  { name: "Aiden Brooks", image: host02 },
  { name: "Riley Turner", image: host03 },
];

const lines = ["Meet", "Our Finest", "Top Event Hosts"];

const TopHosts = () => {
  return (
    <div className="container px-2 md:px-4 xl:px-16">
      <h1
        className={`text-secondary1 text-4xl md:text-5xl xl:text-6xl mb-8 flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
      >
        {lines.map((line, i) => (
          <ShutterText key={i} text={line} delay={i * 0.3} />
        ))}
      </h1>
      <DynamicSwiper
        autoplay
        speed={1200}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {hosts.map((host, index) => (
          <div
            key={index}
            className="relative h-[500px] 2xl:h-[600px] overflow-hidden"
          >
            {/* Host Image */}
            <Image
              src={host.image}
              alt={host.name}
              fill
              className="object-cover"
              placeholder="blur"
              loading="lazy"
            />

            {/* Rank Badge */}
            <span
              className={`absolute top-10 left-4 text-white ${LocalFonts.anton.className} text-8xl`}
            >
              {String(index + 1).padStart(2, "0")}
            </span>

            {/* Host Name */}
            <div
              className={`absolute left-4 bottom-16 text-4xl ${LocalFonts.anton.className} text-primary`}
            >
              {host.name}
            </div>
          </div>
        ))}
      </DynamicSwiper>
    </div>
  );
};

export default TopHosts;
