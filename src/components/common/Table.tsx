import React from "react";
import View from "../../assets/icons/eye-show.svg?react";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Pen from "../../assets/icons/pen.svg?react";
import {
  lightgreenBgColor,
  lightredBgColor,
  lightyellowBgColor,
  adminDefaultBgColor,
} from "../../constants/appColor";

interface Columns {
  key: string;
  label: string;
  className?: string;
  conditionalFormat?: (value: any) => string; // function for conditional styling
}

interface TableProps {
  columns: Columns[];
  data: any[];
  rowClassname?: string; // optional classname
  onRowClick?: (row: any) => void; // optional event clicked
  tableHeaderBg?: string;
  tableHeaderTxtColor?: string;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowClassname,
  onRowClick,
  tableHeaderBg,
  tableHeaderTxtColor,
}) => {
  return (
    <div className="w-full overflow-x-auto">
      <table className="min-w-full border-collapse border-none table-auto">
        <thead className="overflow-x-auto">
          <tr
            className={`border-0 ${
              tableHeaderTxtColor ? tableHeaderTxtColor : "text-white"
            }  ${tableHeaderBg ? tableHeaderBg : `${adminDefaultBgColor}`}`}
          >
            {columns.map((col) => (
              <th
                key={col.key}
                className={`text-[10px] sm:text-[14px] first:rounded-tl-xl last:rounded-tr-xl first:rounded-bl-xl last:rounded-br-xl font-normal p-3 border-0`}
              >
                {col.label}
              </th>
            ))}
          </tr>
        </thead>

        {/* Table Body */}
        <tbody>
          {data.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={`border-0 ${rowClassname} hover:bg-gray-50 cursor-pointer`}
              onClick={() => onRowClick && onRowClick(row)}
            >
              {columns.map((col) => (
                <td
                  key={col.key}
                  className={`text-[10px] sm:text-[13px] text-black px-2 py-3 text-center border border-0 ${
                    col.className || ""
                  } ${
                    col.conditionalFormat
                      ? col.conditionalFormat(row[col.key])
                      : ""
                  }`}
                >
                  {row[col.key] === "Actions" ? (
                    <div className="flex gap-2 items-center justify-center">
                      <div className="cursor-pointer">
                        <View className="w-4 h-4 text-green-500" />
                      </div>
                      <div className="cursor-pointer">
                        <Pen className="w-4 h-4 text-blue-600" />
                      </div>
                      <div className="cursor-pointer">
                        <Trash className="w-4 h-4 stroke-red-600" />
                      </div>
                    </div>
                  ) : row[col.key] === "Complete" ||
                    row[col.key] === "Delivered" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${lightgreenBgColor}`}
                    >
                      <p>{row[col.key]}</p>
                    </div>
                  ) : row[col.key] === "Pending" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${lightyellowBgColor}`}
                    >
                      <p>{row[col.key]}</p>
                    </div>
                  ) : row[col.key] === "Failed" ||
                    row[col.key] === "Cancelled" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${lightredBgColor}`}
                    >
                      <p>{row[col.key]}</p>
                    </div>
                  ) : (
                    row[col.key]
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
