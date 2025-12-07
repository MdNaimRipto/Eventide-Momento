"use client";

import Image from "next/image";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";
import CommonButton from "@/components/common/CommonButton";
import ShutterText from "@/components/animations/ShutterText";
import Reviews from "./Reviews";
import EventExtraSection from "./EventExtraSection";
import { useGetEventDetailsQuery } from "@/redux/features/eventApis";
import { Loader } from "lucide-react";
import { IEvent } from "@/types/eventTypes";
import { useParams, useRouter } from "next/navigation";
import { toast } from "sonner";

const EventDetails = () => {
  const router = useRouter();
  const params = useParams();
  const id = params.eventId;

  const { data, isLoading } = useGetEventDetailsQuery(id as string);

  if (isLoading) return <Loader />;

  const event = (data?.data as IEvent) || null;

  if (!isLoading && !event) {
    router.push("/");
    toast.error("Event not found!");
    return <></>;
  }

  return (
    <div className="w-full min-h-screen bg-primary text-secondary1">
      {/* Hero Image */}
      <div className="relative w-full h-[450px]">
        <Image
          src={event.banner}
          alt={event.eventName}
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
            src={event.banner}
            alt={event.eventName}
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
            <ShutterText text={event.eventName} />
          </h1>

          {/* Tags & Status */}
          <div className="flex items-center gap-4 flex-wrap">
            <span className="border border-secondary1 text-secondary1 text-sm font-semibold px-4 py-1 rounded-full">
              {event.category}
            </span>

            <span
              className={`px-4 py-1 rounded-md text-[10px] tracking-widest font-semibold uppercase ${
                event.status === "UPCOMING"
                  ? "bg-green-500/15 text-green-400"
                  : event.status === "ONGOING"
                  ? "bg-blue-500/15 text-blue-400"
                  : event.status === "COMPLETED"
                  ? "bg-yellow-500/15 text-yellow-500"
                  : event.status === "CANCELED"
                  ? "bg-red-500/15 text-red-500"
                  : ""
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
              ${event.entryFee}
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
      <EventExtraSection />
      <Reviews />
    </div>
  );
};

export default EventDetails;
