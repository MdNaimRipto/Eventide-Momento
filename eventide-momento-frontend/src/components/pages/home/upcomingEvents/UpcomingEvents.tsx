import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import { IEvent } from "@/types/eventTypes";
import { apiConfig } from "@/configs/apiConfig";
import DynamicSwiper from "@/components/common/swiper/DynamicSwiper";
import EventCard from "@/components/common/cards/EventCard";

const lines = ["Discover", "Our Exciting", "Upcoming Events"];

async function getUpcomingEvents(): Promise<IEvent[]> {
  const res = await fetch(
    `${apiConfig.BASE_URL}${apiConfig.EVENTS.GET_ALL}?status=UPCOMING`,
    { cache: "force-cache" }
  );

  const json = await res.json();
  return json?.data?.data ?? [];
}

const UpcomingEvents = async () => {
  const events = await getUpcomingEvents();

  return (
    <div className="container pb-16 px-2 md:px-4 xl:px-16 mt-16">
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
          1024: { slidesPerView: 3 },
        }}
      >
        {events.slice(0, 3).map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </DynamicSwiper>
    </div>
  );
};

export default UpcomingEvents;
