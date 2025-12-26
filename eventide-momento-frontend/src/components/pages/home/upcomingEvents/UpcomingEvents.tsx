"use client";
import { LocalFonts } from "@/components/common/fonts";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay } from "swiper/modules";
import ShutterText from "@/components/animations/ShutterText";
import { useGetAllEventsQuery } from "@/redux/features/eventApis";
import { IEvent } from "@/types/eventTypes";
import EventCard from "@/components/common/cards/EventCard";
import EventCardSkeleton from "@/components/common/skeleton/EventCardSkeleton";
import { useEffect, useState } from "react";

const lines = ["Discover", "Our Exciting", "Upcoming Events"];

const UpcomingEvents = () => {
  const { data, isLoading } = useGetAllEventsQuery({
    status: "UPCOMING",
  });

  const [skeletonCount, setSkeletonCount] = useState(3);

  const getSkeletonCount = () => {
    if (typeof window === "undefined") return 3;

    const width = window.innerWidth;

    if (width < 768) return 1;
    if (width < 1024) return 2;
    return 3;
  };

  useEffect(() => {
    const update = () => setSkeletonCount(getSkeletonCount());

    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  if (isLoading) {
    return (
      <div className="container pb-16 px-2 md:px-4 xl:px-16 mt-16">
        <h1
          className={`text-secondary1 text-4xl md:text-5xl xl:text-6xl mb-8 flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
          {Array.from({ length: skeletonCount }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );
  }

  const events = (data?.data?.data as IEvent[]) || [];

  if (
    (!isLoading && events.length === 0) ||
    !events ||
    events === undefined ||
    events === null
  ) {
    return <div></div>;
  }

  return (
    <div className="container pb-16 px-2 md:px-4 xl:px-16 mt-16">
      <h1
        className={`text-secondary1 text-4xl md:text-5xl xl:text-6xl mb-8 flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
      >
        {lines.map((line, i) => (
          <ShutterText key={i} text={line} delay={i * 0.3} />
        ))}
      </h1>
      <Swiper
        modules={[Autoplay]}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        speed={1200}
        loop={true}
        spaceBetween={20}
        breakpoints={{
          0: { slidesPerView: 1 },
          768: { slidesPerView: 2 },
          1024: { slidesPerView: 3 },
        }}
        className="w-full h-full"
      >
        {events.slice(0, 3).map((event, index) => (
          <SwiperSlide key={index}>
            <EventCard event={event} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default UpcomingEvents;
