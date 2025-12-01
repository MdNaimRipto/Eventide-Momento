import CountUp from "@/components/animations/CountUp";
import { LocalFonts } from "@/components/common/fonts";

const statsData = [
  { label: "Total Activities", value: 1240 },
  { label: "Active Monthly Users", value: 58200 },
  { label: "Meetups Hosted", value: 875 },
  { label: "Categories Available", value: 42 },
];

const Stats = () => {
  return (
    <div className="container grid md:grid-cols-4 px-0 scale-95 my-16 h-[1200px] md:h-[300px] lg:h-[400px] xl:h-[500px] border border-secondary1">
      {statsData.map((stat, index) => {
        const isAlt = index === 1; // second card special

        const bg = isAlt ? "bg-secondary1" : "bg-primary";
        const text = isAlt ? "text-primary" : "text-secondary1";
        const border = index !== 3 ? "md:border-r border-secondary1" : ""; // last one no border

        return (
          <div
            key={index}
            className={`${bg} ${text} flex flex-col justify-center items-center ${border}`}
          >
            <CountUp
              from={0}
              to={stat.value}
              duration={1}
              separator=","
              className={`${LocalFonts.anton.className} text-7xl md:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-wider`}
            />

            <span className="mt-3 text-xl md:text-base lg:text-xl tracking-wide">
              {stat.label}
            </span>
          </div>
        );
      })}
    </div>
  );
};

export default Stats;
