"use client";

import Image from "next/image";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";
import CommonButton from "@/components/common/CommonButton";
import bg01 from "@/assets/images/home/hero-banner.webp";
import ShutterText from "@/components/animations/ShutterText";
import Reviews from "./Reviews";

const EventDetails = () => {
  // Example event data (you can fetch this dynamically later)
  const event = {
    title: "Hiking Adventure",
    category: "Outdoor",
    status: "Active",
    price: 99,
    description:
      "Join us for an unforgettable hiking adventure in the mountains! Experience breathtaking views, expert guides, and create memories that will last a lifetime. Suitable for all skill levels. Bring your friends or make new ones along the way.",
    image: bg01,
  };

  return (
    <div className="w-full min-h-screen bg-primary text-secondary1">
      {/* Hero Image */}
      <div className="relative w-full h-[450px]">
        <Image
          src={event.image}
          alt={event.title}
          fill
          className="object-cover w-full h-full"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-primary/40 to-primary/80" />
      </div>

      {/* Event Info Container */}
      <div className="container mx-auto px-4 md:px-12 lg:px-24 -mt-[20rem] md:-mt-[9.6rem] relative z-10 flex flex-col md:flex-row gap-10 justify-center items-center">
        {/* Left: Image */}
        <div className="md:w-1/2 h-[400px] md:h-[500px] rounded-xl overflow-hidden shadow-lg">
          <Image
            src={event.image}
            alt={event.title}
            width={600}
            height={400}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>

        {/* Right: Event Details */}
        <div className="md:w-1/2 flex flex-col gap-6">
          {/* Title */}
          <h1
            className={`${LocalFonts.anton.className} text-3xl md:text-4xl xl:text-6xl leading-tight text-secondary1`}
          >
            <ShutterText text={event.title} />
          </h1>

          {/* Tags & Status */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="border border-secondary1 text-secondary1 text-sm font-semibold px-4 py-1 rounded-full">
              {event.category}
            </span>

            <span
              className={`border text-sm font-semibold px-4 py-1 rounded-full ${
                event.status === "Active"
                  ? "border-green-500 text-green-500"
                  : "border-red-500 text-red-500"
              }`}
            >
              {event.status}
            </span>
          </div>

          {/* Price */}
          <div className="mt-2">
            <p className="text-secondary1/70 text-xs tracking-wider uppercase">
              Price
            </p>
            <p
              className={`${LocalFonts.anton.className} text-5xl md:text-6xl text-secondary1`}
            >
              ${event.price}
            </p>
          </div>

          {/* Description */}
          <p className="text-secondary1/80 text-base md:text-sm xl:text-lg leading-relaxed mt-4">
            {event.description}
          </p>

          {/* CTA Button */}
          <div className="mt-0">
            <Link href="">
              <CommonButton title="Book Now" />
            </Link>
          </div>
        </div>
      </div>
      <Reviews />
    </div>
  );
};

export default EventDetails;
