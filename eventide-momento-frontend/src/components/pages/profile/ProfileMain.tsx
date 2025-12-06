"use client";

import { useSearchParams } from "next/navigation";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import About from "./tabs/About";
import AttendedEvents from "./tabs/AttendedEvents";
import UpcomingEvents from "./tabs/UpcomingEvents";
import TabsSection from "./TabsSection";
import Settings from "./tabs/settings/Settings";
import ManageEvents from "./tabs/manageEvents/ManageEvents";
import ManageUsers from "./tabs/manageUsers/ManageUsers";
import OpacityTransition from "@/components/animations/OpacityTransition";
import { useUserContext } from "@/contexts/AuthContext";
import { ReactNode } from "react";
import { roleEnums } from "@/types/userTypes";

export default function ProfileMain() {
  const { user } = useUserContext();
  const role = user?.role || "USER";

  const tabs: Array<{
    value: string;
    component: ReactNode;
    roles: Array<roleEnums>;
  }> = [
    {
      value: "manage-events",
      component: <ManageEvents />,
      roles: ["ADMIN", "HOST"],
    },
    {
      value: "manage-users",
      component: <ManageUsers />,
      roles: ["ADMIN"],
    },
    {
      value: "upcoming-events",
      component: <UpcomingEvents />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "completed-events",
      component: <AttendedEvents />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "about",
      component: <About />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "settings",
      component: <Settings />,
      roles: ["USER", "ADMIN", "HOST"],
    },
  ];

  const availableTabs = tabs.filter((t) => t.roles.includes(role));

  const searchParams = useSearchParams();
  const savedTab = searchParams.get("tab");
  const defaultTab =
    availableTabs.find((t) => t.value === savedTab)?.value ||
    availableTabs[0].value;

  return (
    <OpacityTransition>
      <div className="px-4 2xl:max-w-[1600px] mx-auto py-10">
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
    </OpacityTransition>
  );
}
