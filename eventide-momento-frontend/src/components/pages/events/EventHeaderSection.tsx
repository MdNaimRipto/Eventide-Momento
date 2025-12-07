"use client";

import { useState, useEffect } from "react";
import { SlidersHorizontal } from "lucide-react";
import ShutterText from "@/components/animations/ShutterText";
import { LocalFonts } from "@/components/common/fonts";
import { useSearchParams, useRouter, usePathname } from "next/navigation";

const EventHeaderSection = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  // Filter state synced with URL
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");

  // Sync filters with URL
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (searchTerm) {
      params.set("searchTerm", searchTerm);
    } else {
      params.delete("searchTerm");
    }
    if (category) {
      params.set("category", category);
    } else {
      params.delete("category");
    }
    if (status) {
      params.set("status", status);
    } else {
      params.delete("status");
    }

    const newUrl = `${pathname}${params.toString() ? `?${params}` : ""}`;

    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  }, [searchTerm, category, status, router, pathname]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setStatus("");
    setFilterOpen(false);
  };

  const lines = ["Explore New", "Events Around You"];

  const categories = [
    { title: "SPORTS" },
    { title: "MUSIC" },
    { title: "TECHNOLOGY" },
    { title: "BUSINESS" },
    { title: "ARTS" },
    { title: "EDUCATION" },
    { title: "SOCIAL" },
  ];

  const statuses = ["UPCOMING", "ONGOING", "COMPLETED", "CANCELED"];

  return (
    <div className="pt-10 lg:pt-16 relative">
      {/* Heading + Search + Filter Button */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl text-secondary1 ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h2>

        {/* Search + Filter Toggle */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search events..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="flex-1 md:flex-none border border-gray-300 rounded-full py-2 px-4 text-sm focus:outline-none focus:border-secondary"
          />

          <button
            onClick={() => setFilterOpen(!filterOpen)}
            className="p-3 rounded-full border border-secondary1 text-secondary1 hover:bg-secondary1 hover:text-primary transition-all"
          >
            <SlidersHorizontal size={18} />
          </button>
        </div>
      </div>

      {/* FILTER PANEL */}
      <div
        className={`
          absolute top-full left-0 w-full 
          border border-secondary1/20 rounded p-6 mt-3 bg-white
          transition-all duration-300 ease-out shadow-xl
          ${
            filterOpen
              ? "opacity-100 translate-y-0 z-20"
              : "opacity-0 translate-y-4 -z-50 pointer-events-none"
          }
        `}
      >
        {/* CATEGORY FILTER */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2 text-secondary1">Category</p>
          <div className="flex items-center gap-3 overflow-x-auto scrollBarHidden py-1">
            {categories.map((c, index) => (
              <button
                key={index}
                onClick={() => setCategory(c.title === category ? "" : c.title)}
                className={`text-xs font-semibold capitalize whitespace-nowrap rounded-[200px] py-1.5 px-6 transition duration-300 ${
                  category === c.title
                    ? "bg-secondary1 text-primary border-secondary1"
                    : "text-secondary1 border hover:border-secondary1"
                }`}
              >
                {c.title}
              </button>
            ))}
          </div>
        </div>

        {/* STATUS FILTER */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2 text-secondary1">Status</p>
          <div className="flex items-center gap-3 overflow-x-auto scrollBarHidden py-1">
            {statuses.map((s, index) => (
              <button
                key={index}
                onClick={() => setStatus(s === status ? "" : s)}
                className={`text-xs font-semibold capitalize whitespace-nowrap rounded-[200px] py-1.5 px-6 transition duration-300
                  ${
                    status === s
                      ? "bg-secondary1 text-primary border-secondary1"
                      : "text-secondary1 border hover:border-secondary1"
                  }
                `}
              >
                {s}
              </button>
            ))}
          </div>
        </div>

        {/* ACTION BUTTONS */}
        <div className="flex items-center gap-4 pt-1">
          <button
            onClick={resetFilters}
            className="w-[200px] bg-secondary1 hover:bg-secondary1/90 text-primary font-semibold rounded-none py-2 transition text-sm"
          >
            Reset Filters
          </button>

          {/* <button
            onClick={resetFilters}
            className="text-red-500 font-medium underline"
          >
            Reset Filters
          </button> */}
        </div>
      </div>
    </div>
  );
};

export default EventHeaderSection;
