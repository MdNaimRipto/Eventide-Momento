import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EventsTable = () => {
  const tableHeader = [
    "Id",
    "Host Id",
    "Banner",
    "Event Name",
    "Events Date",
    "Category",
    "Entry Fee",
    "Total Participants",
    "Detail Information",
    "Min Participants",
    "Max Participants",
    "Location",
    "Status",
  ];
  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeader.map((data, index) => (
            <TableHead key={index} className="min-w-20">
              {data}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default EventsTable;
