import ShutterText from "@/components/animations/ShutterText";
import EventCard from "@/components/common/cards/EventCard";
import { LocalFonts } from "@/components/common/fonts";

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
    <div className="px-4 2xl:px-0 2xl:max-w-[1600px] mx-auto my-20">
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
          <EventCard key={i} event={event} />
        ))}
      </div>
    </div>
  );
};

export default EventsMain;
