import EventsTable from "@/components/pages/dashboard/events/EventsTable";

const EventsPage = () => {
  return (
    <div className="py-8">
      <h2 className="text-2xl font-bold mb-6">All Events</h2>

      {/* Filters */}

      {/* Table */}
      <EventsTable />
      {/* Pagination */}
    </div>
  );
};

export default EventsPage;
