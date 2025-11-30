import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import CTA from "./CTA/CTA";
import HowItWorks from "./howItWorks/HowItWorks";
import Stats from "./stats/Stats";
import Testimonials from "./testimonials/Testimonials";
import TopHosts from "./topHosts/TopHosts";

const HomeMain = () => {
  return (
    <div className="bg-primary">
      <Banner />
      <HowItWorks />
      <Categories />
      <Stats />
      <TopHosts />
      <Testimonials />
      <CTA />
    </div>
  );
};

export default HomeMain;
