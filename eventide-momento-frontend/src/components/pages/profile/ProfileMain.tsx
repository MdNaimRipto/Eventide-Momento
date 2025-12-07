"use client";

import { ReactElement, useState } from "react";
import { Tabs, TabsContent } from "@/components/ui/tabs";
import ProfileHeader from "./ProfileHeader";
import About from "./tabs/About";
import AttendedEvents from "./tabs/AttendedEvents";
import UpcomingEvents from "./tabs/UpcomingEvents";
import Settings from "./tabs/settings/Settings";
import ManageEvents from "./tabs/manageEvents/ManageEvents";
import ManageUsers from "./tabs/manageUsers/ManageUsers";
import TabsSection from "./TabsSection";
import OpacityTransition from "@/components/animations/OpacityTransition";
import { useUserContext } from "@/contexts/AuthContext";
import { roleEnums } from "@/types/userTypes";

interface Tab {
  label: string;
  value: string;
  roles: roleEnums[];
  component: ReactElement;
}

export default function ProfileMain() {
  const { user } = useUserContext();
  const role = user?.role as roleEnums;

  const allTabs: Tab[] = [
    {
      value: "manage-events",
      label: "Manage Events",
      component: <ManageEvents />,
      roles: ["ADMIN", "HOST"],
    },
    {
      value: "manage-users",
      label: "Manage Users",
      component: <ManageUsers />,
      roles: ["ADMIN"],
    },
    {
      value: "upcoming-events",
      label: "Upcoming Events",
      component: <UpcomingEvents />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "completed-events",
      label: "Attended Events",
      component: <AttendedEvents />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "about",
      label: "About",
      component: <About />,
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      value: "settings",
      label: "Settings",
      component: <Settings />,
      roles: ["USER", "ADMIN", "HOST"],
    },
  ];

  const visibleTabs = allTabs.filter((t) => t.roles.includes(role));

  // Initialize from URL or fallback to first visible tab
  const initialTab =
    typeof window !== "undefined"
      ? new URLSearchParams(window.location.search).get("tab") ||
        visibleTabs[0].value
      : visibleTabs[0].value;

  const [currentTab, setCurrentTab] = useState(initialTab);

  return (
    <OpacityTransition>
      <div className="px-4 2xl:max-w-[1600px] mx-auto py-10">
        <ProfileHeader />

        <Tabs value={currentTab} className="w-full mt-6">
          <TabsSection
            visibleTabs={visibleTabs}
            currentTab={currentTab}
            setCurrentTab={setCurrentTab}
          />

          <div className="mt-6">
            {visibleTabs.map((tab) => (
              <TabsContent key={tab.value} value={tab.value}>
                {tab.component}
              </TabsContent>
            ))}
          </div>
        </Tabs>
      </div>
    </OpacityTransition>
  );
}
