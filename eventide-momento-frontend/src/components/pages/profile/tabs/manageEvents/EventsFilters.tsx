import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useSearchParams, useRouter, usePathname } from "next/navigation";
import { useState, useEffect } from "react";

const EventsFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [category, setCategory] = useState(searchParams.get("category") || "");
  const [status, setStatus] = useState(searchParams.get("status") || "");
  const [hostId, setHostId] = useState(searchParams.get("hostId") || "");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);

    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");

    if (category) params.set("category", category);
    else params.delete("category");

    if (status) params.set("status", status);
    else params.delete("status");

    if (hostId) params.set("hostId", hostId);
    else params.delete("hostId");

    const newUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  }, [searchTerm, category, status, hostId, router, pathname]);

  const resetFilters = () => {
    setSearchTerm("");
    setCategory("");
    setStatus("");
    setHostId("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-5 md:w-4/5 gap-4 mb-6">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:col-span-2 rounded-none"
      />

      <Select value={category} onValueChange={(value) => setCategory(value)}>
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="SPORTS">Sports</SelectItem>
          <SelectItem value="MUSIC">Music</SelectItem>
          <SelectItem value="TECHNOLOGY">Technology</SelectItem>
          <SelectItem value="BUSINESS">Business</SelectItem>
          <SelectItem value="ARTS">Arts</SelectItem>
          <SelectItem value="EDUCATION">Education</SelectItem>
          <SelectItem value="SOCIAL">Social</SelectItem>
        </SelectContent>
      </Select>

      <Select value={status} onValueChange={(value) => setStatus(value)}>
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Status" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="UPCOMING">Upcoming</SelectItem>
          <SelectItem value="ONGOING">Ongoing</SelectItem>
          <SelectItem value="COMPLETED">Completed</SelectItem>
          <SelectItem value="CANCELED">Canceled</SelectItem>
        </SelectContent>
      </Select>

      <Button
        variant="destructive"
        className="w-full md:w-auto bg-red-400 rounded-none"
        onClick={resetFilters}
      >
        Reset Filters
      </Button>
    </div>
  );
};

export default EventsFilters;
