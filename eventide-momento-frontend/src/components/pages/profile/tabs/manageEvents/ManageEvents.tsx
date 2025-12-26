import EventsTable from "./EventsTable";
import EventsFilters from "./EventsFilters";
import Pagination from "@/components/common/Pagination";
import { useState } from "react";
import AddNewEvent from "./AddNewEvent";
import { Button } from "@/components/ui/button";

const ManageEvents = () => {
  const [addNewEvent, setAddNewEvent] = useState(false);
  return (
    <div className="pt-10">
      <div className="flex flex-col lg:flex-row justify-between">
        <EventsFilters />
        <Button
          variant="default"
          className="w-full md:w-auto text-white hover:bg-secondary1 bg-secondary1 rounded-none"
          onClick={() => setAddNewEvent(true)}
        >
          Add New Event
        </Button>
      </div>
      <EventsTable />
      <Pagination />
      {addNewEvent && <AddNewEvent setAddNewEvent={setAddNewEvent} />}
    </div>
  );
};

export default ManageEvents;
