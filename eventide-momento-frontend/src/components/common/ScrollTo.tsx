"use client";
import { useEffect, useState } from "react";
import { GoArrowUp as ArrowUp } from "react-icons/go";

const ScrollTo = () => {
  const [atTop, setAtTop] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      setAtTop(window.scrollY <= 0); // true if at top
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleClick = () => {
    if (atTop) {
      // scroll down 100vh
      window.scrollTo({ top: window.innerHeight, behavior: "smooth" });
    } else {
      // scroll to top
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <button
      onClick={handleClick}
      aria-label={atTop ? "Scroll Down" : "Scroll to Top"}
      className={`fixed bottom-8 right-8 md:bottom-16 md:right-16 z-[600] rounded-full border ${
        atTop
          ? "text-primary border-primary"
          : "text-secondary1 border-secondary1 bg-primary"
      } p-3 shadow-lg transition-transform duration-500`}
      style={{
        transform: `rotate(${atTop ? 180 : 0}deg)`,
      }}
    >
      <ArrowUp className="w-6 h-6 md:w-8 md:h-8 animate-pulse" />
    </button>
  );
};

export default ScrollTo;
