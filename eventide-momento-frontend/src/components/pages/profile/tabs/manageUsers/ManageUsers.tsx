import Pagination from "@/components/common/Pagination";
import UserFilters from "./UserFilters";
import UserTable from "./UserTable";

const ManageUsers = () => {
  return (
    <div className="pt-10">
      {/* Filters */}
      <UserFilters />
      {/* Table */}
      <UserTable />
      {/* Pagination */}
      <Pagination />
    </div>
  );
};

export default ManageUsers;
