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
import { useState } from "react";
import UsersTable from "@/components/pages/dashboard/users/UsersTable";

const Users = () => {
  const [filters, setFilters] = useState({});
  const [page, setPage] = useState(1);

  const resetFilters = () => {
    setFilters({});
    setPage(1);
  };
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">All Users</h2>

      {/* Filters */}
      <div className="grid grid-cols-1 md:grid-cols-7 gap-4 mb-6">
        <Input
          placeholder="Search..."
          // value={filters.searchTerm || ""}
          // onChange={(e) => handleFilterChange("searchTerm", e.target.value)}
          className="w-full md:col-span-2"
        />
        <Select
        // onValueChange={(value) => handleFilterChange("role", value)}
        // value={filters.role || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Role" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="driver">Driver</SelectItem>
            <SelectItem value="rider">Rider</SelectItem>
          </SelectContent>
        </Select>
        <Select
        // onValueChange={(value) => handleFilterChange("isActive", value)}
        // value={filters.isActive || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Active Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="active">Active</SelectItem>
            <SelectItem value="inactive">Inactive</SelectItem>
          </SelectContent>
        </Select>
        <Select
        // onValueChange={(value) => handleFilterChange("isBlocked", value)}
        // value={filters.isActive || ""}
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Block Status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="false">Open</SelectItem>
            <SelectItem value="true">Blocked</SelectItem>
          </SelectContent>
        </Select>
        <Select
        // onValueChange={(value) =>
        //   handleFilterChange(
        //     "isApproved",
        //     value === "true" ? "true" : "false"
        //   )
        // }
        // value={
        //   filters.isApproved !== undefined ? String(filters.isApproved) : ""
        // }
        >
          <SelectTrigger className="w-full">
            <SelectValue placeholder="Approval" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="true">Approved</SelectItem>
            <SelectItem value="false">Suspended</SelectItem>
          </SelectContent>
        </Select>
        <Button
          // onClick={resetFilters}
          variant="outline"
          className="w-full md:w-auto"
        >
          Reset Filters
        </Button>
      </div>
      {/* Table */}
      <UsersTable />
      {/* Pagination */}
      <div className="flex justify-center gap-4 items-center mt-4">
        <Button
        // onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        // disabled={page === 1}
        >
          Previous
        </Button>
        <span>
          {/* Page {meta?.page} of {Math.ceil(meta?.total / meta?.limit)} */}
        </span>
        <Button
        // onClick={() =>
        //   setPage((prev) =>
        //     meta && page < Math.ceil(meta.total / meta.limit)
        //       ? prev + 1
        //       : prev
        //   )
        // }
        // disabled={!meta || page >= Math.ceil(meta?.total / meta?.limit)}
        >
          Next
        </Button>
      </div>
    </div>
  );
};

export default Users;
