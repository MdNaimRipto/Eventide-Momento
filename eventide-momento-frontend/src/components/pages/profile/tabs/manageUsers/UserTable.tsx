import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTable = () => {
  const tableHeader = [
    "Id",
    "Image",
    "Name",
    "Email",
    "Contact",
    "Location",
    "Role",
    "Bio",
    "Interests",
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

export default UserTable;
