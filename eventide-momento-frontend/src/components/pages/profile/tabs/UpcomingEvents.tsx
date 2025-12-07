import EventCard from "@/components/common/cards/EventCard";

const UpcomingEvents = () => {
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
      id: 3,
      title: "Tech Community Hangout",
      category: "Meetup",
      status: "Active",
      price: 10,
      image:
        "https://images.unsplash.com/photo-1509223197845-458d87318791?auto=format&fit=crop&w=800&q=60",
    },
  ];
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mt-10">
      {events.map((event, i) => (
        <div key={i} className="relative">
          <span className="px-4 py-1 bg-secondary2/60 backdrop-blur-3xl animate-pulse text-secondary1 text-[10px] tracking-widest font-semibold uppercase absolute top-4 right-4 z-10">
            Upcoming
          </span>
          <EventCard event={event} />
        </div>
      ))}
    </div>
  );
};

export default UpcomingEvents;
