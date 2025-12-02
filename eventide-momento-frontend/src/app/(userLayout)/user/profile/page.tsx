import Image from "next/image";
import image from "@/assets/images/logo.svg";
import Link from "next/link";
import { LocalFonts } from "@/components/common/fonts";

const UserProfile = () => {
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
  ];
  return (
    <div className="bg-primary flex rounded-xl xl:px-4 gap-6 py-8 mt-[80px]">
      <div className="w-[340px] lg:border-r lg:border-r-gray-300 flex flex-col gap-4 items-center p-4">
        <div className="mb-6">
          <Image src={image} alt="" />
        </div>
        <h4 className="text-xl lg:text-xl font-semibold">Naimur Rahman</h4>
        <div className="text-sm lg:text-sm text-gray-400 space-y-1">
          <div className="flex gap-1">
            <span className="font-medium">Role:</span>
            <span>Admin</span>
          </div>
          <div className="flex gap-1">
            <span className="font-medium">Email:</span>
            <span>naimur@gmail.com</span>
          </div>
          <div className="flex gap-1">
            <span className="font-medium">Contact:</span>
            <span>01712312312</span>
          </div>
          <div className="flex gap-1">
            <span className="font-medium">Location:</span>
            <span>Admin</span>
          </div>

          <div className="flex gap-1">
            <span className="font-medium">Interests:</span>
            <span>Games, Anime, Coding</span>
          </div>
          <div className="flex gap-1">
            <span className="font-medium">Bio:</span>
            <span>I love playing games and watching anime.</span>
          </div>
        </div>
        <Link href={"/user/setting"}>
          <button
            className={`w-[200px] px-3 py-2 my-4 bg-secondary2 text-secondary1 hover:bg-white duration-700 lg:text-lg tracking-wide ${LocalFonts.anton.className}`}
          >
            Edit Profile
          </button>
        </Link>
      </div>
      <div className="col-span-4 pr-6">
        {/* For Host */}
        <div className="border-b pb-8">
          <h4 className="text-lg lg::text-lg font-semibold text-secondary1">
            Upcoming Events
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-primary w-full overflow-hidden shadow-lg"
              >
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
                    {/* <Link
                      href={`/events/${i}`}
                      className="scale-90 md:scale-100 -mr-4 md:-mr-0"
                    >
                      <CommonButton title="View Details" />
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="border-b pt-4">
          <h4 className="text-lg lg::text-lg font-semibold text-secondary1">
            Attended Events
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 mt-8">
            {events.map((event, i) => (
              <div
                key={i}
                className="bg-primary w-full overflow-hidden shadow-lg"
              >
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
                    {/* <Link
                      href={`/events/${i}`}
                      className="scale-90 md:scale-100 -mr-4 md:-mr-0"
                    >
                      <CommonButton title="View Details" />
                    </Link> */}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfile;
