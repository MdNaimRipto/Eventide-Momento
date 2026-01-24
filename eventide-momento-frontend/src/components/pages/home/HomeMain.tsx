import { Suspense } from "react";
import Banner from "./banner/Banner";
import HowItWorks from "./howItWorks/HowItWorks";
import Categories from "./categories/Categories";
import UpcomingEvents from "./upcomingEvents/UpcomingEvents";
import Stats from "./stats/Stats";
import TopHosts from "./topHosts/TopHosts";
import Memories from "./memories/Memories";
import CTA from "./CTA/CTA";
import Reviews from "./reviews/Reviews";

export default function HomeMain() {
  return (
    <div className="bg-primary">
      <Banner />

      <Suspense fallback={null}>
        <HowItWorks />
        <Categories />
        <UpcomingEvents />
      </Suspense>

      <Stats />
      <TopHosts />
      <Memories />

      <Suspense fallback={null}>
        <Reviews />
        <CTA />
      </Suspense>
    </div>
  );
}
