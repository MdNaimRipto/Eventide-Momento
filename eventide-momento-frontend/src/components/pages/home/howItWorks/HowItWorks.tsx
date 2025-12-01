import ScrollFloat from "@/components/animations/ScrollFloat";
// import { LocalFonts } from "@/components/common/fonts";

const HowItWorks = () => {
  const steps = [
    "How it works?",
    "Find Activities You Love",
    "Join or Create Events",
    "Meet New People & Have Fun",
  ];

  return (
    <div className="relative z-[500]">
      {steps.map((step, idx) => (
        <div
          key={idx}
          className="h-screen flex items-center justify-center bg-secondary1"
        >
          <ScrollFloat
            animationDuration={1}
            ease="back.inOut(2)"
            scrollStart="center bottom+=40%"
            scrollEnd="bottom bottom-=80%"
            stagger={0.03}
          >
            {step}
          </ScrollFloat>
          {/* <span
            className={`inline-block text-[clamp(1.6rem,4vw,3rem)] ${LocalFonts.anton.className} uppercase md:!text-6xl lg:!text-7xl xl:!text-8xl 2xl:!text-9xl text-primary`}
          >
            How it works?
          </span> */}
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
