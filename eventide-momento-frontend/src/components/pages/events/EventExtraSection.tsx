import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";
import Link from "next/link";

const EventExtraSection = () => {
  return (
    <div className="container mx-auto px-4 md:px-12 lg:px-24 mt-28 mb-20">
      <div className="flex flex-col md:flex-row gap-14">
        {/* LEFT SIDE – Additional Info */}
        <div className="md:w-2/3 flex flex-col gap-10">
          {/* Section Title */}
          <div>
            <h2
              className={`${LocalFonts.anton.className} text-3xl md:text-4xl text-secondary1 tracking-wide`}
            >
              Additional Information
            </h2>
            <div className="w-24 h-[3px] mt-2 bg-secondary1/40 rounded-full" />
          </div>

          {/* Info Block */}
          <div className="bg-secondary1/5 backdrop-blur-sm border border-secondary1/10 rounded-xl p-6 md:p-8 shadow-lg">
            <ul className="space-y-4 text-secondary1/80 text-base md:text-lg leading-relaxed">
              <li className="flex items-start gap-3">
                <span className="text-secondary1 text-xl">•</span>
                Duration: 6 hours
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary1 text-xl">•</span>
                Meeting point: Central City Square
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary1 text-xl">•</span>
                Includes water, snacks, professional guide
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary1 text-xl">•</span>
                Recommended gear: hiking boots, backpack
              </li>
              <li className="flex items-start gap-3">
                <span className="text-secondary1 text-xl">•</span>
                Group size: 6–12 people
              </li>
            </ul>
          </div>

          {/* Description */}
          <p className="text-secondary1/70 text-base md:text-lg leading-relaxed">
            This adventure is designed for both new and experienced hikers.
            Expect scenic views, steady inclines, and plenty of photo
            opportunities. Arrive 15 minutes early to ensure a smooth start and
            get briefed by our expert guides.
          </p>
        </div>

        {/* RIGHT SIDE – Sticky Sidebar */}
        <div className="md:w-1/3">
          <div className="sticky top-28 flex flex-col gap-10">
            {/* Host Card */}
            <div className="bg-secondary1/5 backdrop-blur-md border border-secondary1/10 rounded-xl p-6 shadow-lg flex flex-col items-center text-center">
              <h3
                className={`${LocalFonts.anton.className} text-2xl text-secondary1 mb-6 tracking-wide`}
              >
                Meet Our Host
              </h3>

              {/* Avatar */}
              <div className="w-20 h-20 rounded-full overflow-hidden bg-secondary1/20 mb-4">
                <Image
                  src="https://github.com/shadcn.png"
                  alt="Host"
                  width={120}
                  height={120}
                  className="object-cover w-full h-full"
                />
              </div>

              {/* Host Name */}
              <p className="text-secondary1 font-semibold text-xl">
                John Walker
              </p>

              {/* Email */}
              <p className="text-secondary1/70 text-sm mt-1">
                john.walker@example.com
              </p>

              {/* Member Since */}
              <p className="text-secondary1/60 text-xs mt-2 tracking-wide uppercase">
                Member since 2017
              </p>

              <Link href={""} className="mt-4">
                <CommonButton title="View Profile" />
              </Link>
            </div>

            {/* Event Quick Info */}
            <div className="bg-secondary1/5 backdrop-blur-md border border-secondary1/10 rounded-xl p-6 shadow-lg">
              <h3
                className={`${LocalFonts.anton.className} text-2xl text-secondary1 mb-5 text-center`}
              >
                Event Quick Info
              </h3>

              <ul className="space-y-3 text-secondary1/80 text-base md:text-lg">
                <li>• Difficulty: Moderate</li>
                <li>• Age requirement: 15+</li>
                <li>• Weather: Expected clear skies</li>
                <li>• Refund policy: 24 hours before start</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventExtraSection;
