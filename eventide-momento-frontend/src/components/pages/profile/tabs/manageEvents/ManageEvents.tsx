"use client";
import EventsTable from "./EventsTable";
import EventsFilters from "./EventsFilters";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";
import AddNewEvent from "./AddNewEvent";

const ManageEvents = () => {
  const [addNewEvent, setAddNewEvent] = useState(false);
  return (
    <div className="pt-10">
      <button onClick={() => setAddNewEvent(true)}>Add new event</button>
      {/* Filters */}
      <EventsFilters />
      {/* Table */}
      <EventsTable />
      {/* Pagination */}
      <Pagination />
      {addNewEvent && <AddNewEvent setAddNewEvent={setAddNewEvent} />}
    </div>
  );
};

export default ManageEvents;
