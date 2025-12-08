"use client";

import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

export default function TabsSection() {
  const router = useRouter();
  const pathname = usePathname();
  const params = useSearchParams();

  const allTabs: Array<{
    tab: string;
    value: string;
  }> = [
    {
      tab: "Hosted Events",
      value: "managed-events",
    },
    {
      tab: "Upcoming Events",
      value: "upcoming-events",
    },
    {
      tab: "Completed Events",
      value: "completed-events",
    },
    { tab: "About", value: "about" },
    { tab: "Reviews", value: "reviews" },
  ];

  const updateTab = (value: string) => {
    const newParams = new URLSearchParams(params.toString());
    newParams.set("tab", value);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  return (
    <TabsList className="bg-white pb-0 pt-0 md:pt-[5.2px] border-b border-b-secondary1/10 overflow-x-auto scrollBarHidden w-full items-start justify-start">
      {allTabs.map((tab, i) => (
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
