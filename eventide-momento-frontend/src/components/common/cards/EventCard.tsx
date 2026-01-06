import Image from "next/image";
import { LocalFonts } from "../fonts";
import Link from "next/link";
import CommonButton from "../CommonButton";
import { IEvent } from "@/types/eventTypes";
import { HiOutlineCalendar, HiOutlineLocationMarker } from "react-icons/hi";

const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <div className="bg-primary w-full overflow-hidden shadow-lg group">
      {/* Image Section */}
      <div className="w-full h-[250px] relative overflow-hidden group">
        <Image
          src={event.banner}
          alt="events-image"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />

        <div
          className="absolute bottom-0 left-0 w-full bg-primary/0 backdrop-blur-lg  text-secondary1
                  text-xs flex items-center justify-between px-4 py-2 opacity-0
                  transition-all duration-500 group-hover:opacity-100 group-hover:bg-primary/80"
        >
          <div className="flex items-center gap-1">
            <HiOutlineCalendar className="text-secondary1" />
            <span>{new Date(event.eventDate).toLocaleDateString()}</span>
          </div>
          <div className="flex items-center gap-1">
            <HiOutlineLocationMarker className="text-secondary1" />
            <span>{event.location}</span>
          </div>
        </div>
      </div>

      {/* Description Section */}
      <div className="px-4 py-6 flex flex-col h-1/2 gap-4">
        {/* Title */}
        <h6
          className={`${LocalFonts.anton.className} text-xl xl:text-2xl text-secondary1 leading-tight`}
        >
          {event.eventName}
        </h6>

        {/* Category + Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-1 rounded-md bg-secondary1/10 text-secondary1 text-[10px] tracking-widest font-semibold uppercase">
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
            }
  `}
          >
            {event.status}
          </span>
        </div>

        {/* Big Price Section */}
        <div className="flex items-end justify-between mt-2">
          <div>
            <p className="text-secondary1/70 text-xs tracking-wider uppercase">
              Price
            </p>
            <p
              className={`${LocalFonts.anton.className} text-secondary1 text-4xl leading-none`}
            >
              ${event.entryFee}
            </p>
          </div>

          {/* Button */}
          <Link
            href={`/events/${event._id}`}
            scroll={true}
            className="scale-90 md:scale-100 -mr-4 md:-mr-0"
          >
            <CommonButton title="View Details" />
          </Link>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
