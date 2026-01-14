"use client";
import EventCard from "@/components/common/cards/EventCard";
import EventHeaderSection from "./EventHeaderSection";
import { IEvent } from "@/types/eventTypes";
import { useGetAllEventsQuery } from "@/redux/features/eventApis";
import { useSearchParams } from "next/navigation";
import EventCardSkeleton from "@/components/common/skeleton/EventCardSkeleton";

const EventsMain = () => {
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("searchTerm") || "";
  const category = searchParams.get("category") || "";
  const status = searchParams.get("status") || "";
  const hostId = searchParams.get("hostId") || "";

  const { data, isLoading } = useGetAllEventsQuery({
    searchTerm,
    category,
    status,
    hostId,
  });

  if (isLoading)
    return (
      <div className="px-4 2xl:max-w-[1600px] h-[500px] mx-auto my-20">
        <EventHeaderSection />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
          {Array.from({ length: 12 }).map((_, i) => (
            <EventCardSkeleton key={i} />
          ))}
        </div>
      </div>
    );

  const events = (data?.data?.data as IEvent[]) || [];

  if (!isLoading && events.length === 0) {
    return (
      <div className="px-4 2xl:max-w-[1600px] h-[500px] mx-auto my-20">
        <EventHeaderSection />

        <div className="flex flex-col items-center justify-center h-full mt-24 text-secondary1/60">
          <p className="text-xl font-semibold tracking-wider">
            No Events Found
          </p>
          <p className="text-sm mt-2">
            Try adjusting your filters or search terms.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 2xl:max-w-[1600px] mx-auto my-20">
      <EventHeaderSection />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
        {events.map((event, i) => (
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsMain;
