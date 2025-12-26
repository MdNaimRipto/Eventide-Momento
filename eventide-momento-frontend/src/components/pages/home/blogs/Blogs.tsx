import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import DynamicSwiper from "@/components/common/swiper/DynamicSwiper";
import Image from "next/image";
import Link from "next/link";
import bg from "@/assets/images/home/hero-banner.webp";
import CommonButton from "@/components/common/CommonButton";

interface BlogData {
  image: string;
  link: string;
  category: string;
  title: string;
  date: string;
}

const lines = ["Discover", "Latest Blogs"];

const Blogs = () => {
  const blogs: BlogData[] = [
    {
      image: bg.src,
      link: "/blog/1",
      category: "TECH",
      title: "Top 10 Event Tools",
      date: "Dec 20, 2025",
    },
    {
      image: bg.src,
      link: "/blog/2",
      category: "MUSIC",
      title: "Music Festivals Unite",
      date: "Dec 18, 2025",
    },
    {
      image: bg.src,
      link: "/blog/3",
      category: "ARTS",
      title: "Art Beyond Paintings",
      date: "Dec 15, 2025",
    },
    {
      image: bg.src,
      link: "/blog/4",
      category: "SPORTS",
      title: "Sports Events Matter",
      date: "Dec 10, 2025",
    },
  ];

  return (
    <div className="container pb-16 px-2 md:px-4 xl:px-16 mt-16">
      {/* Header */}
      <h1
        className={`text-secondary1 text-4xl md:text-5xl xl:text-6xl mb-8 flex flex-col whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
      >
        {lines.map((line, i) => (
          <ShutterText key={i} text={line} delay={i * 0.3} />
        ))}
      </h1>

      {/* Swiper */}
      <DynamicSwiper
        slidesPerView={3}
        spaceBetween={40}
        loop
        autoplay
        breakpoints={{
          0: { slidesPerView: 1, spaceBetween: 20 },
          768: { slidesPerView: 2, spaceBetween: 30 },
          1024: { slidesPerView: 3, spaceBetween: 40 },
        }}
      >
        {blogs.slice(0, 4).map((blog, i) => (
          <div
            key={i}
            className="bg-white/60 w-full overflow-hidden shadow-lg group rounded-none"
          >
            {/* Image Section */}
            <div className="w-full h-[220px] relative overflow-hidden group">
              <Image
                src={blog.image}
                alt={blog.title}
                width={400}
                height={400}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
            {/* Description Section */}
            <div className="px-4 py-4 flex flex-col gap-2">
              <h6
                className={`${LocalFonts.anton.className} text-lg xl:text-2xl text-secondary1 leading-tight`}
              >
                {blog.title}
              </h6>
              <div className="flex items-center gap-3 pb-1">
                <span className="px-3 py-1 rounded-md bg-secondary1 text-secondary2 text-[10px] tracking-widest font-semibold uppercase">
                  {blog.category}
                </span>
                <span className="px-3 py-1 rounded-md bg-secondary1/10 text-secondary1 text-[10px] tracking-widest font-semibold uppercase">
                  {blog.date}
                </span>
              </div>
              <Link href={blog.link} className="text-secondary2 text-sm mt-2">
                <CommonButton title="Read More" />
              </Link>
            </div>
          </div>
        ))}
      </DynamicSwiper>
    </div>
  );
};

export default Blogs;
