import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const EventsTable = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="w-[100px]">Id</TableHead>
          <TableHead>Host Id</TableHead>
          <TableHead>Banner</TableHead>
          <TableHead>Event Name</TableHead>
          <TableHead>Description</TableHead>
          <TableHead>Events Date</TableHead>
          <TableHead>Category</TableHead>
          <TableHead>Entry Fee</TableHead>
          <TableHead>Total Participants</TableHead>
          <TableHead>Detail Information</TableHead>
          <TableHead>Min Participants</TableHead>
          <TableHead>Max Participants</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Status</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        <TableRow>
          <TableCell className="font-medium">INV001</TableCell>
          <TableCell>Image</TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
};

export default EventsTable;
