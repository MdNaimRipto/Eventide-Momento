"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";

import ProfileHeader from "./ProfileHeader";
import About from "./tabs/About";
import AttendedEvents from "./tabs/AttendedEvents";
import ManageEvents from "./tabs/ManageEvents";
import ManageUsers from "./tabs/ManageUsers";
import UpcomingEvents from "./tabs/UpcomingEvents";
import TabsSection from "./TabsSection";
import Settings from "./tabs/Settings";

export default function ProfileMain() {
  const searchParams = useSearchParams();
  const savedTab = searchParams.get("tab");

  const tabs = [
    { value: "manage-events", component: <ManageEvents /> },
    { value: "manage-users", component: <ManageUsers /> },
    { value: "upcoming-events", component: <UpcomingEvents /> },
    { value: "completed-events", component: <AttendedEvents /> },
    { value: "about", component: <About /> },
    { value: "settings", component: <Settings /> },
  ];

  const defaultTab = savedTab || tabs[0].value;

  return (
    <div className="px-4 2xl:px-0 2xl:max-w-[1600px] mx-auto py-10">
      <ProfileHeader />

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
  );
}
