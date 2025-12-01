import ScrollFloat from "@/components/animations/ScrollFloat";

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
        </div>
      ))}
    </div>
  );
};

export default HowItWorks;
