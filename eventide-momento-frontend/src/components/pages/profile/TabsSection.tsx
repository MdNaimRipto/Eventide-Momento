"use client";

import { useEffect } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";
import { useUserContext } from "@/contexts/AuthContext";
import { roleEnums } from "@/types/userTypes";

export default function TabsSection() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();
  const { user } = useUserContext();

  const role = (user?.role ?? "USER") as roleEnums;

  const allTabs: Array<{
    tab: string;
    value: string;
    roles: Array<roleEnums>;
  }> = [
    { tab: "Overview", value: "overview", roles: ["ADMIN"] },
    { tab: "Manage Events", value: "manage-events", roles: ["ADMIN", "HOST"] },
    { tab: "Manage Users", value: "manage-users", roles: ["ADMIN"] },
    {
      tab: "Upcoming Events",
      value: "upcoming-events",
      roles: ["USER", "ADMIN", "HOST"],
    },
    {
      tab: "Attended Events",
      value: "completed-events",
      roles: ["USER", "ADMIN", "HOST"],
    },
    { tab: "About", value: "about", roles: ["USER", "ADMIN", "HOST"] },
    { tab: "Settings", value: "settings", roles: ["USER", "ADMIN", "HOST"] },
  ];

  // Filter tabs based on user role
  const visibleTabs = allTabs.filter((t) => t.roles.includes(role));

  // Validate tab in URL
  useEffect(() => {
    const currentTab = params.get("tab");
    if (!visibleTabs.some((t) => t.value === currentTab)) {
      // If invalid, reset to first available tab
      const newParams = new URLSearchParams(params.toString());
      newParams.set("tab", visibleTabs[0].value);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [params, visibleTabs, pathname, router]);

  const updateTab = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("tab", value);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <TabsList className="bg-white pb-0 pt-0 md:pt-[5.2px] border-b border-b-secondary1/10 overflow-x-auto scrollBarHidden w-full items-start justify-start">
      {visibleTabs.map((tab, i) => (
        <TabsTrigger
          key={i}
          value={tab.value}
          onClick={() => updateTab(tab.value)}
          className="border-b-2 border-transparent data-[state=active]:border-b-secondary1 rounded-none"
        >
          {tab.tab}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
