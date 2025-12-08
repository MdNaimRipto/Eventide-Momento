import EventCard from "@/components/common/cards/EventCard";
import Loader from "@/components/common/Loader";
import { useGetHostEventsQuery } from "@/redux/features/eventApis";
import { IEvent } from "@/types/eventTypes";

const AttendedEvents = ({ id }: { id: string }) => {
  const { data, isLoading } = useGetHostEventsQuery({
    hostId: id,
  });

  if (isLoading) return <Loader />;

  const allEvents = data?.data?.data as IEvent[];

  const events = allEvents?.filter((e) => e.status === "COMPLETED");

  if (!isLoading && events.length === 0) {
    return (
      <div className="px-4 2xl:max-w-[1600px] h-[300px] mx-auto my-20">
        <div className="flex flex-col items-center justify-center h-full mt-24 text-secondary1/60">
          <p className="text-xl font-semibold tracking-wider">
            No Events Found
          </p>
          <p className="text-sm mt-2">
            This host hasn’t created any events yet. Any upcoming or past events
            will be displayed here once they start hosting.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {events.map((event, i) => {
        const eventDate = new Date(event.eventDate);
        const today = new Date();

        // Create YYYY-MM-DD strings to compare "date only" without time issue
        const eventDay = eventDate.toISOString().split("T")[0];
        const todayDay = today.toISOString().split("T")[0];

        const badgeText =
          eventDay === todayDay
            ? eventDate.toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })
            : eventDate.toLocaleDateString([], {
                year: "numeric",
                month: "short",
                day: "numeric",
              });

        return (
          <div key={i} className="relative">
            <span className="px-4 py-1 bg-secondary2/60 backdrop-blur-3xl animate-pulse text-secondary1 text-[10px] tracking-widest font-semibold uppercase absolute top-4 right-4 z-10">
              {event.status === "UPCOMING" ? badgeText : event.status}
            </span>
            <EventCard event={event} />
          </div>
        );
      })}
    </div>
  );
};

export default AttendedEvents;
