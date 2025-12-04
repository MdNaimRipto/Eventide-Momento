import Image from "next/image";
import { LocalFonts } from "../fonts";
import Link from "next/link";
import CommonButton from "../CommonButton";

interface IEvent {
  id: number;
  title: string;
  category: string;
  status: string;
  price: number;
  image: string;
}

const EventCard = ({ event }: { event: IEvent }) => {
  return (
    <div className="bg-primary w-full overflow-hidden shadow-lg">
      {/* Image Section */}
      <div className="w-full h-[250px] relative overflow-hidden">
        <Image
          src={event.image}
          alt="events-image"
          width={400}
          height={400}
          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
        />
      </div>

      {/* Description Section */}
      <div className="px-4 py-6 flex flex-col h-1/2 gap-4">
        {/* Title */}
        <h6
          className={`${LocalFonts.anton.className} text-xl xl:text-2xl text-secondary1 leading-tight`}
        >
          {event.title}
        </h6>

        {/* Category + Status */}
        <div className="flex items-center gap-3 flex-wrap">
          <span className="px-4 py-1 rounded-md bg-secondary1/10 text-secondary1 text-[10px] tracking-widest font-semibold uppercase">
            {event.category}
          </span>

          <span
            className={`px-4 py-1 rounded-md text-[10px] tracking-widest font-semibold uppercase ${
              event.status === "Active"
                ? "bg-green-500/15 text-green-500"
                : "bg-red-500/15 text-red-500"
            }`}
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
              ${event.price}
            </p>
          </div>

          {/* Button */}
          <Link
            href={`/events/${event.id}`}
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
