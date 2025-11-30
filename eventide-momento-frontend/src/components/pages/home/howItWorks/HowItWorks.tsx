import ScrollFloat from "@/components/animations/ScrollFloat";
import { LocalFonts } from "@/components/common/fonts";

const HowItWorks = () => {
  return (
    <div className="relative z-[500]">
      {/* Section #1 - Main Title */}
      <CommonFloat title="How it works?" />

      {/* Step 1 */}
      <CommonFloat title="Find Activities You Love" />

      {/* Step 2 */}
      <CommonFloat title="Join or Create Events" />

      {/* Step 3 */}
      <CommonFloat title="Meet New People & Have Fun" />
    </div>
  );
};

export default HowItWorks;

const CommonFloat = ({ title }: { title: string }) => {
  return (
    <section className="h-screen flex items-center justify-center bg-secondary1">
      <ScrollFloat
        animationDuration={1}
        ease="back.inOut(2)"
        scrollStart="center bottom+=20%"
        scrollEnd="bottom bottom-=40%"
        stagger={0.03}
        textClassName={`${LocalFonts.anton.className} uppercase text-8xl text-primary`}
      >
        {title}
      </ScrollFloat>
    </section>
  );
};
