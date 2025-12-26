import Banner from "./banner/Banner";
import Categories from "./categories/Categories";
import CTA from "./CTA/CTA";
import HowItWorks from "./howItWorks/HowItWorks";
import Memories from "./memories/Memories";
import Reviews from "./reviews/Reviews";
import Stats from "./stats/Stats";
import TopHosts from "./topHosts/TopHosts";
import UpcomingEvents from "./upcomingEvents/UpcomingEvents";

const HomeMain = () => {
  return (
    <div className="bg-primary">
      <Banner />
      <HowItWorks />
      <Categories />
      <UpcomingEvents />
      <Stats />
      {/* <Blogs /> */}
      <TopHosts />
      <Memories />
      <Reviews />
      <CTA />
    </div>
  );
};

export default HomeMain;
