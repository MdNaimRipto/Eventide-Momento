import Loader from "@/components/common/Loader";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useGetAllUsersQuery } from "@/redux/features/userApis";
import { IUser } from "@/types/userTypes";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const UserTable = () => {
  const searchParams = useSearchParams();

  const searchTerm = searchParams.get("searchTerm") || "";
  const role = searchParams.get("role") || "";

  // Pass directly to API query
  const { data, isLoading } = useGetAllUsersQuery({
    searchTerm,
    role,
  });

  if (isLoading) {
    return <Loader />;
  }

  const users = (data?.data?.data as IUser[]) || [];

  const tableHeader = ["Id", "Image", "Name", "Email", "Contact", "Role"];

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {tableHeader.map((data, index) => (
            <TableHead
              key={index}
              className={index === 0 || index === 1 ? "w-[60px]" : "min-w-20"}
            >
              {data}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>
      <TableBody>
        {users.map((user, i) => (
          <TableRow key={i}>
            <TableCell className="font-medium">{user.id.slice(0, 6)}</TableCell>
            <TableCell className="font-medium">
              <Image
                src={user.profileImage}
                alt="Profile Image"
                width={40}
                height={40}
                priority
              />
            </TableCell>
            <TableCell className="font-medium">{user.userName}</TableCell>
            <TableCell className="font-medium">{user.email}</TableCell>
            <TableCell className="font-medium">{user.contactNumber}</TableCell>
            <TableCell className="font-medium">{user.role}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default UserTable;
