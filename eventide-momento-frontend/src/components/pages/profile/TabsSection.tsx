"use client";

import { useEffect } from "react";
import { TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useRouter, usePathname } from "next/navigation";

interface Tab {
  value: string;
  label: string;
}

export default function TabsSection({
  visibleTabs,
  currentTab,
  setCurrentTab,
}: {
  visibleTabs: Tab[];
  currentTab: string;
  setCurrentTab: (value: string) => void;
}) {
  const router = useRouter();
  const pathname = usePathname();

  const updateTab = (value: string) => {
    setCurrentTab(value);
    const newParams = new URLSearchParams(window.location.search);
    newParams.set("tab", value);
    router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
  };

  // Redirect if current tab is not visible (unauthorized)
  useEffect(() => {
    if (!visibleTabs.some((t) => t.value === currentTab)) {
      const newTab = visibleTabs[0].value;
      setCurrentTab(newTab);
      const newParams = new URLSearchParams(window.location.search);
      newParams.set("tab", newTab);
      router.replace(`${pathname}?${newParams.toString()}`, { scroll: false });
    }
  }, [currentTab, visibleTabs, router, pathname, setCurrentTab]);

  return (
    <TabsList className="bg-white pb-0 pt-0 md:pt-[5.2px] border-b border-b-secondary1/10 overflow-x-auto scrollBarHidden w-full items-start justify-start">
      {visibleTabs.map((tab) => (
        <TabsTrigger
          key={tab.value}
          value={tab.value}
          onClick={() => updateTab(tab.value)}
          className="border-b-2 border-transparent data-[state=active]:border-b-secondary1 rounded-none"
        >
          {tab.label}
        </TabsTrigger>
      ))}
    </TabsList>
  );
}
