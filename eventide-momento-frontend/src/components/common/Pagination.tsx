import { Button } from "@/components/ui/button";
import { IoIosArrowRoundBack, IoIosArrowRoundForward } from "react-icons/io";

const Pagination = () => {
  return (
    <div className="flex justify-center gap-4 items-center mt-4">
      <Button
        className="rounded-full w-10 h-10"
        // onClick={() => setPage((prev) => Math.max(prev - 1, 1))}
        // disabled={page === 1}
      >
        <IoIosArrowRoundBack className="text-2xl font-bold" />
      </Button>
      <span>
        {/* Page {meta?.page} of {Math.ceil(meta?.total / meta?.limit)} */}
      </span>
      <Button
        className="rounded-full w-10 h-10"
        // onClick={() =>
        //   setPage((prev) =>
        //     meta && page < Math.ceil(meta.total / meta.limit)
        //       ? prev + 1
        //       : prev
        //   )
        // }
        // disabled={!meta || page >= Math.ceil(meta?.total / meta?.limit)}
      >
        <IoIosArrowRoundForward />
      </Button>
    </div>
  );
};

export default Pagination;
