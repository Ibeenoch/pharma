import React from "react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  itemPerPage?: number;
  onPageChange: (page: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ currentPage, totalPages, onPageChange, }) => {
  if (totalPages <= 1) return null;

  return (
    <div className="flex items-center gap-2 my-2">
      {Array.from({ length: totalPages }, (_, i) => (
        <div
          key={i}
          className={`border ${
            currentPage === i
              ? "bg-black text-white border-black"
              : "border-gray-300"
          } rounded-lg py-2 px-3 text-[12px] flex justify-center items-center cursor-pointer hover:bg-black hover:text-white`}
          onClick={() => onPageChange(i)}
        >
          {i + 1}
        </div>
      ))}
    </div>
  );
};

export default Pagination;
