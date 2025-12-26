import { LocalFonts } from "@/components/common/fonts";
import DynamicSwiper from "@/components/common/swiper/DynamicSwiper";
import ShutterText from "@/components/animations/ShutterText";
import { FaUserLarge } from "react-icons/fa6";

const lines = ["Discover", "The Amazing", "Event Experiences"];

const Reviews = () => {
  const reviews = [
    {
      text: "Attending the music festival was an unforgettable experience! The organization was top-notch and everything ran smoothly.",
      name: "Marta Williams",
      role: "Participant",
    },
    {
      text: "The tech workshop I joined was extremely informative and engaging. Learned a lot and met amazing people.",
      name: "John Smith",
      role: "Attendee",
    },
    {
      text: "I loved the art exhibition! Each piece was curated beautifully, and the event staff were very helpful.",
      name: "Emily Davis",
      role: "Guest",
    },
    {
      text: "The networking event was fantastic for making new professional connections. Highly recommend joining their events.",
      name: "Sarah Johnson",
      role: "Participant",
    },
    {
      text: "From start to finish, the event was seamless. Great speakers, activities, and overall experience.",
      name: "David Brown",
      role: "Attendee",
    },
    {
      text: "The outdoor sports event was well-organized, fun, and energetic. Definitely will join the next one.",
      name: "Sophia Lee",
      role: "Participant",
    },
  ];

  return (
    <div className="relative overflow-hidden backdrop-blur-[2px] mb-20">
      <div className="container flex flex-col items-start justify-center gap-12">
        {/* Header */}
        <h1
          className={`text-secondary1 text-4xl md:text-5xl xl:text-6xl flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>

        {/* Swiper Section */}
        <DynamicSwiper
          spaceBetween={30}
          slidesPerView={1}
          loop={true}
          breakpoints={{
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
          }}
          speed={1500}
          autoplay
        >
          {reviews.map((review, i) => (
            <div
              key={i}
              className="bg-white/80 w-full h-[300px] xl:h-[380px] flex flex-col gap-8 items-center justify-center p-6 xl:p-10"
            >
              <p className="leading-6 xl:leading-6 text-xs xl:text-sm text-center text-black">
                “{review.text}”
              </p>
              <span className="block w-full h-[.6px] bg-gray/20"></span>
              <div className="flex items-center gap-2">
                <div className="w-14 h-14 rounded-full border border-gray/30 flex items-center justify-center">
                  <div className="w-[90%] h-[90%] bg-gray/30 rounded-full flex items-center justify-center">
                    <FaUserLarge size={28} color="#ddd" />
                  </div>
                </div>
                <div className="flex flex-col gap-1 text-sm">
                  <p>{review.name}</p>
                  <p className="text-gray/60 text-xs">{review.role}</p>
                </div>
              </div>
            </div>
          ))}
        </DynamicSwiper>
      </div>
    </div>
  );
};

export default Reviews;
