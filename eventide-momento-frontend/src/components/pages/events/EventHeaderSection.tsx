"use client";

import { useState } from "react";
import { SlidersHorizontal } from "lucide-react";
import ShutterText from "@/components/animations/ShutterText";
import { LocalFonts } from "@/components/common/fonts";

const EventHeaderSection = () => {
  const [filterOpen, setFilterOpen] = useState(false);

  const lines = ["Explore New", "Events Around You"];

  const categories = [
    { title: "All" },
    { title: "Concert" },
    { title: "Workshop" },
    { title: "Meetup" },
    { title: "Dinner" },
    { title: "Hiking" },
    { title: "Exhibition" },
  ];

  return (
    <div className="pt-10 lg:pt-16 relative">
      {/* Heading + Search + Filter Toggle */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
        <h2
          className={`text-3xl md:text-4xl lg:text-5xl text-secondary1 ${LocalFonts.anton.className}`}
        >
          {lines.map((line, i) => (
            <ShutterText key={i} text={line} delay={i * 0.3} />
          ))}
        </h2>

        {/* Search + Filter Button */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search events..."
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

      {/* ABSOLUTE FLOATING PANEL */}
      <div
        className={`
          absolute top-full left-0 w-full 
          border border-secondary1/20 rounded p-6 mt-3 bg-white
          transition-all duration-300 ease-out
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
            {categories.map((category, index) => (
              <button
                key={index}
                className={`${
                  category.title === "All"
                    ? "text-secondary1 border border-secondary2"
                    : "text-secondary1 border"
                } hover:text-secondary hover:border-secondary text-sm font-semibold capitalize whitespace-nowrap rounded-[200px] py-2 px-6 transition duration-300`}
              >
                {category.title}
              </button>
            ))}
          </div>
        </div>

        {/* DATE FILTER */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2 text-secondary1">Date</p>
          <div className="flex items-center gap-3 overflow-x-auto scrollBarHidden py-1">
            {["Today", "Tomorrow", "This Week", "This Month", "Upcoming"].map(
              (item, i) => (
                <button
                  key={i}
                  className="text-secondary1 border hover:text-secondary hover:border-secondary text-sm font-semibold whitespace-nowrap rounded-[200px] py-2 px-6 transition duration-300"
                >
                  {item}
                </button>
              )
            )}
          </div>
        </div>

        {/* PRICE FILTER */}
        <div className="mb-6">
          <p className="text-sm font-semibold mb-2 text-secondary1">Price</p>
          <div className="flex items-center gap-3 overflow-x-auto scrollBarHidden py-1">
            {["Free", "Paid", "Under $50", "Premium"].map((item, i) => (
              <button
                key={i}
                className="text-secondary1 border hover:text-secondary hover:border-secondary text-sm font-semibold whitespace-nowrap rounded-[200px] py-2 px-6 transition duration-300"
              >
                {item}
              </button>
            ))}
          </div>
        </div>

        <button className="w-[200px] bg-secondary1 hover:bg-secondary text-primary font-semibold rounded-none py-2 transition">
          Apply Filters
        </button>
      </div>
    </div>
  );
};

export default EventHeaderSection;
