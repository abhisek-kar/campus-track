import { useMemo } from "react";
import {
  MaterialReactTable,
  useMaterialReactTable,
} from "material-react-table";
import { RiEdit2Line } from "react-icons/ri";

const Table = ({ tableData, tableHeadData }) => {
  const columns = useMemo(() => tableHeadData, [tableHeadData]);
  const data = tableData;
  const table = useMaterialReactTable({
    columns,
    data,
    enableColumnFilters: false,
    paginationDisplayMode: "pages",
    muiPaginationProps: {
      color: "primary",
      shape: "rounded",
      showRowsPerPage: true,
      variant: "outlined",
      //   rowsPerPageOptions: [5, 10, 15, 20],
    },
    defaultColumn: {
      minSize: 20, //allow columns to get smaller than default
      maxSize: 200, //allow columns to get larger than default
    },
  });

  return <MaterialReactTable table={table} />;
};

export default Table;

// Components to show Edit button inside the table
export function Edit() {
  return (
    <div className="flex  items-center gap-2 text-theme-blue poppins-medium underline cursor-pointer font-semibold">
      <RiEdit2Line /> Edit
    </div>
  );
}

// component to show the status - Active || Inactive inside the table
export function Badge({ status = "active" }) {
  return (
    <div
      className={`rounded-md ${
        status === "active"
          ? "bg-green-200 text-green-700"
          : "bg-red-200 text-red-700"
      } poppins-medium text-xs w-fit px-2 py-1`}
    >
      {status.charAt(0).toUpperCase() + status.slice(1)}
    </div>
  );
}
