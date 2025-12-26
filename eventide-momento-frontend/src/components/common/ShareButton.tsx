"use client";

import { Share2, Check } from "lucide-react";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

const ShareButton = () => {
  const pathname = usePathname();
  const [copied, setCopied] = useState(false);

  const handleShare = async () => {
    try {
      const url = `${window.location.origin}${pathname}`;
      await navigator.clipboard.writeText(url);

      setCopied(true);
      toast.success("Link copied to clipboard");

      setTimeout(() => setCopied(false), 2000);
    } catch {
      toast.error("Failed to copy link");
    }
  };

  return (
    <button
      onClick={handleShare}
      aria-label="Share event"
      className="
        flex items-center gap-2
        px-4 h-full rounded-none
        border border-secondary1/30
        text-secondary1
        hover:bg-secondary1/10
        transition-all duration-300
      "
    >
      {copied ? (
        <Check size={18} className="text-green-400" />
      ) : (
        <Share2 size={18} />
      )}

      {/* Optional text – hidden on small screens */}
      <span className="hidden md:inline text-sm font-medium">Share</span>
    </button>
  );
};

export default ShareButton;
