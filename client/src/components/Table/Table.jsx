/* eslint-disable react/prop-types */
import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { PropTypes } from "prop-types";

const Table = ({ data, btn }) => {
  // //console.log(data);
  const columns = [
    {
      header: "Employer Name",
      accessorKey: "employerName",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Category",
      accessorKey: "category",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Job Title",
      accessorKey: "title",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Posting Date",
      accessorKey: "postingDate",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Deadline",
      accessorKey: "deadline",
      cell: (props) => <p>{props.getValue()}</p>,
    },
    {
      header: "Salary",
      accessorKey: "salaryRange",
      cell: (props) => <p>{props.getValue()} TK</p>,
    },
    {
      header: "",
      accessorKey: "_id",
      cell: (props) => btn(props.getValue()),
    },
  ];
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className='overflow-x-auto'>
      <table className='table table-auto'>
        <thead>
          {data &&
            table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th key={header.id}>
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                  </th>
                ))}
              </tr>
            ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

Table.propTypes = {
  allJobs: PropTypes.array,
  btnList: PropTypes.array,
};

export default Table;
