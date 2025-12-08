"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import About from "./tabs/About";
import AttendedEvents from "./tabs/AttendedEvents";
import UpcomingEvents from "./tabs/UpcomingEvents";
import TabsSection from "./TabsSection";
import ManageEvents from "./tabs/manageEvents/ManageEvents";
import OpacityTransition from "@/components/animations/OpacityTransition";
import { ReactNode } from "react";
import { IUser } from "@/types/userTypes";
import Loader from "@/components/common/Loader";
import { toast } from "sonner";
import { useGetPublicProfileQuery } from "@/redux/features/userApis";
import Reviews from "./tabs/reviews/Reviews";

export default function PublicProfileMain() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const params = useParams();
  const id = params.profileId;

  const { data, isLoading } = useGetPublicProfileQuery(id as string);

  if (isLoading) return <Loader />;

  const host = (data?.data as IUser) || null;

  if (!isLoading && !host) {
    router.push("/");
    toast.error("Host not found!");
    return <></>;
  }

  const tabs: Array<{
    value: string;
    component: ReactNode;
  }> = [
    {
      value: "managed-events",
      component: <ManageEvents id={String(id)} />,
    },
    {
      value: "upcoming-events",
      component: <UpcomingEvents id={String(id)} />,
    },
    {
      value: "completed-events",
      component: <AttendedEvents id={String(id)} />,
    },
    {
      value: "about",
      component: <About host={host} />,
    },
    {
      value: "reviews",
      component: <Reviews id={String(id)} />,
    },
  ];

  const savedTab = searchParams.get("tab");
  const defaultTab =
    tabs.find((t) => t.value === savedTab)?.value || tabs[0].value;

  return (
    <OpacityTransition>
      <div className="px-4 2xl:max-w-[1600px] mx-auto py-10">
        <ProfileHeader host={host} />

        <Tabs value={defaultTab} className="w-full mt-6">
          <TabsSection />

          <div className="mt-6">
            {tabs.map((item, index) => (
              <TabsContent key={index} value={item.value}>
                {item.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </OpacityTransition>
  );
}
