import ShutterText from "@/components/animations/ShutterText";
import CommonButton from "@/components/common/CommonButton";
import { LocalFonts } from "@/components/common/fonts";
import Image from "next/image";
import Link from "next/link";

const EventsMain = () => {
  const categories = [
    { title: "All" },
    { title: "Concert" },
    { title: "Workshop" },
    { title: "Meetup" },
    { title: "Dinner" },
    { title: "Hiking" },
    { title: "Exhibition" },
  ];

  const events = [
    {
      id: 1,
      title: "Rock Fiesta Night",
      category: "Concert",
      status: "Active",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Creative Art Bootcamp",
      category: "Workshop",
      status: "Closed",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Tech Community Hangout",
      category: "Meetup",
      status: "Active",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 1,
      title: "Rock Fiesta Night",
      category: "Concert",
      status: "Active",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Creative Art Bootcamp",
      category: "Workshop",
      status: "Closed",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Tech Community Hangout",
      category: "Meetup",
      status: "Active",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 1,
      title: "Rock Fiesta Night",
      category: "Concert",
      status: "Active",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Creative Art Bootcamp",
      category: "Workshop",
      status: "Closed",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Tech Community Hangout",
      category: "Meetup",
      status: "Active",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 1,
      title: "Rock Fiesta Night",
      category: "Concert",
      status: "Active",
      price: 49,
      image:
        "https://images.unsplash.com/photo-1504805572947-34fad45aed93?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 2,
      title: "Creative Art Bootcamp",
      category: "Workshop",
      status: "Closed",
      price: 25,
      image:
        "https://images.unsplash.com/photo-1529390079861-591de354faf5?auto=format&fit=crop&w=800&q=60",
    },
    {
      id: 3,
      title: "Tech Community Hangout",
      category: "Meetup",
      status: "Active",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60",
    },
  ];

  const lines = ["Explore New", "Events Around You"];

  return (
    <div className="px-4 2xl:px-36 my-20">
      {/* Heading */}
      <div className="flex flex-col gap-4 py-10">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl text-coal ${LocalFonts.anton.className} text-secondary1`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h2>
      </div>

      {/* Categories + Search */}
      <div className="flex flex-wrap items-center justify-between gap-4">
        {/* Categories */}
        <div className="flex flex-wrap items-center gap-3">
          {categories.map((category, index) => (
            <button
              key={index}
              className={`${
                category.title === "All"
                  ? "text-secondary1 border border-secondary2"
                  : "text-secondary1 border"
              } hover:text-secondary hover:border-secondary text-sm font-semibold capitalize rounded-[200px] py-2 px-6 transition duration-300`}
            >
              {category.title}
            </button>
          ))}
        </div>

        {/* Search Field */}
        <div>
          <input
            type="text"
            placeholder="Search events..."
            className="border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-secondary"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-16">
        {events.map((event, i) => (
          <div key={i} className="bg-primary w-full overflow-hidden shadow-lg">
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
                  href={`/events/${i}`}
                  className="scale-90 md:scale-100 -mr-4 md:-mr-0"
                >
                  <CommonButton title="View Details" />
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventsMain;
