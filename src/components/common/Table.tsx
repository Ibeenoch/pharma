import React from "react";
// import View from "../../assets/icons/eye-show.svg?react";
import Trash from "../../assets/icons/trash-bin.svg?react";
import Pen from "../../assets/icons/edit-clipboard.svg?react";
import {
  lightgreenBgColor,
  lightredBgColor,
  lightyellowBgColor,
  adminDefaultBgColor,
  darkredText,
  darkyellowText,
  darkGreenText,
} from "../../constants/appColor";
import { useAppDispatch, useAppSelector } from "../../hooks/reduxHooks";
import { selectproductAdmin, setProductIndexClicked } from "../../features/admin/product/productSlice";

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
  onEdit?: (id: string) => void;
  onDelete?: (id: string) => void;
}

const Table: React.FC<TableProps> = ({
  columns,
  data,
  rowClassname,
  onRowClick,
  tableHeaderBg,
  tableHeaderTxtColor,
  onEdit,
  onDelete,
}) => {
  const dispatch = useAppDispatch();
  const { productIndexClicked } = useAppSelector(selectproductAdmin)
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
                className={`text-[10px] sm:text-[12px] first:rounded-tl-xl last:rounded-tr-xl first:rounded-bl-xl last:rounded-br-xl font-normal py-3 border-0`}
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
                  className={`text-[10px] sm:text-[12px] text-black px-2 py-2 text-center border border-0 ${
                    col.className || ""
                  } ${
                    col.conditionalFormat
                      ? col.conditionalFormat(row[col.key])
                      : ""
                  }`}
                >
                  { typeof row[col.key] === 'string' && row[col.key].includes('Actions') ? (
                    <div className="flex gap-2 items-center justify-center">
                      {/* <div className="cursor-pointer">
                        <View className="w-4 h-4 text-green-500" />
                      </div> */}
                      <div onClick={() => {
                        const id = row[col.key].split('_')[1];
                        dispatch(setProductIndexClicked(id))
                        productIndexClicked && onEdit?.(productIndexClicked);
                        } } className="cursor-pointer">
                        <Pen className="w-5 h-5 text-blue-600" />
                      </div>
                      <div  onClick={() => {
                        const id = row[col.key].split('_')[1];
                        dispatch(setProductIndexClicked(id))
                        productIndexClicked && onDelete?.(productIndexClicked)
                        } } className="cursor-pointer">
                        <Trash className="w-5 h-5 stroke-red-600" />
                      </div>
                    </div>
                  ) : row[col.key] === "Complete" ||
                    row[col.key] === "Delivered" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${darkGreenText} ${lightgreenBgColor}`}
                    >
                      <p>{row[col.key]}</p>
                    </div>
                  ) : row[col.key] === "Pending" ||
                    row[col.key] === "Processing" ||
                    row[col.key] === "Shipped" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${darkyellowText} ${lightyellowBgColor}`}
                    >
                      <p>{row[col.key]}</p>
                    </div>
                  ) : row[col.key] === "Failed" ||
                    row[col.key] === "Cancelled" ? (
                    <div
                      className={`flex justify-center items-center p-1 rounded-md ${darkredText} ${lightredBgColor}`}
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
