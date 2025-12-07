"use client";

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

const UserFilters = () => {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Initialize state from URL once
  const [searchTerm, setSearchTerm] = useState(
    searchParams.get("searchTerm") || ""
  );
  const [role, setRole] = useState(searchParams.get("role") || "");

  // Update URL when searchTerm or role changes
  useEffect(() => {
    const params = new URLSearchParams(window.location.search); // <-- keep existing params

    if (searchTerm) params.set("searchTerm", searchTerm);
    else params.delete("searchTerm");

    if (role) params.set("role", role);
    else params.delete("role");

    const newUrl = `${pathname}${
      params.toString() ? `?${params.toString()}` : ""
    }`;
    if (newUrl !== window.location.pathname + window.location.search) {
      router.replace(newUrl, { scroll: false });
    }
  }, [searchTerm, role, router, pathname]);

  const resetFilters = () => {
    setSearchTerm("");
    setRole("");
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
      <Input
        placeholder="Search..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        className="w-full md:col-span-2 rounded-none"
      />
      <Select value={role} onValueChange={(value) => setRole(value)}>
        <SelectTrigger className="w-full rounded-none">
          <SelectValue placeholder="Role" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="HOST">Host</SelectItem>
          <SelectItem value="USER">User</SelectItem>
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

export default UserFilters;
