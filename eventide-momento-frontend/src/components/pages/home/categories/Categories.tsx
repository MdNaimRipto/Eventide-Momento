import bg01 from "@/assets/images/home/categories/01.webp";
import bg02 from "@/assets/images/home/categories/02.webp";
import bg03 from "@/assets/images/home/categories/03.webp";
import bg04 from "@/assets/images/home/categories/04.webp";
import bg05 from "@/assets/images/home/categories/05.webp";
import bg06 from "@/assets/images/home/categories/06.webp";
import bg07 from "@/assets/images/home/categories/07.webp";
import { LocalFonts } from "@/components/common/fonts";
import ShutterText from "@/components/animations/ShutterText";
import OpacityTransition from "@/components/animations/OpacityTransition";
import CommonButton from "@/components/common/CommonButton";
import Link from "next/link";
import CategoriesBackground from "./CategoriesBackground";
import CategoryOptions from "./CategoryOptions";

const Categories = () => {
  const lines = ["Explore", "Hobbies", "Together"];

  const categories = [
    { title: "SPORTS", image: bg01 },
    { title: "MUSIC", image: bg02 },
    { title: "TECHNOLOGY", image: bg03 },
    { title: "BUSINESS", image: bg04 },
    { title: "ARTS", image: bg05 },
    { title: "EDUCATION", image: bg06 },
    { title: "SOCIAL", image: bg07 },
  ];

  // const [currentImg, setCurrentImg] = useState(categories[0].image);
  // const [fade, setFade] = useState(false);
  // const [transitionImg, setTransitionImg] = useState(categories[0].image);

  // const handleBgChange = (img: StaticImageData) => {
  //   setTransitionImg(img);

  //   setFade(false);

  //   requestAnimationFrame(() => {
  //     requestAnimationFrame(() => {
  //       setFade(true);
  //     });
  //   });

  //   setTimeout(() => {
  //     setCurrentImg(img);
  //     setFade(false);
  //   }, 1600);
  // };

  return (
    <div className="relative w-full h-[860px] md:h-[850px] lg:h-[1000px] overflow-hidden z-[500]  bg-secondary1">
      <CategoriesBackground images={categories.map((c) => c.image)} />

      <div className="absolute z-10 bg-gradient-to-r from-secondary1/40 to-secondary1/50 w-full h-full" />

      <CategoryOptions cards={categories} />

      <div
        className={`lg:bg-primary overflow-hidden absolute right-0 top-0 lg:h-full lg:w-[440px] xl:w-[550px] 2xl:w-[764px] z-30 container flex flex-col lg:justify-center gap-6 mt-10 lg:mt-0`}
      >
        <h1
          className={`text-primary lg:text-secondary1 text-5xl lg:text-8xl xl:text-[7rem] 2xl:text-9xl flex flex-col gap-2 whitespace-nowrap tracking-[.95px] ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h1>
        <Link
          href="/events"
          className="scale-75 -ml-10 -mt-3 md:scale-100 md:-ml-0 md:-mt-0 xl:mt-4"
        >
          <OpacityTransition delay={1}>
            <CommonButton title="Explore Events" />
          </OpacityTransition>
        </Link>
      </div>
    </div>
  );
};

export default Categories;
