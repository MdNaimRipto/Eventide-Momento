import EventsTable from "./EventsTable";
import EventsFilters from "./EventsFilters";
import Pagination from "@/components/common/Pagination";

const ManageEvents = () => {
  return (
    <div className="pt-10">
      {/* Filters */}
      <EventsFilters />
      {/* Table */}
      <EventsTable />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ManageEvents;
