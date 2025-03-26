import React from "react";
import Minus from "../../assets/icons/minus.svg?react";
import Plus from "../../assets/icons/plus-slim.svg?react";

interface QtyUpdateBtnProps {
  qty: number;
  decreaseNum: () => void;
  increaseNum: () => void;
}
const QtyUpdateBtn: React.FC<QtyUpdateBtnProps> = ({
  qty,
  decreaseNum,
  increaseNum,
}) => {
  return (
    <div className="flex items-center gap-3 ">
      <div
        onClick={decreaseNum}
        className="group hover:bg-black hover:rounded-xl  border border-gray-300 rounded-xl cursor-pointer p-2"
      >
        <Minus className="w-4 h-4 cursor-pointer group-hover:text-white group-hover:stroke-white" />
      </div>
      <p className="text-md">{qty}</p>
      <div
        onClick={increaseNum}
        className="group hover:bg-black hover:rounded-xl border border-gray-300 rounded-xl cursor-pointer p-2"
      >
        <Plus className="w-4 h-4 cursor-pointer group-hover:text-white group-hover:stroke-white" />
      </div>
    </div>
  );
};

export default QtyUpdateBtn;
