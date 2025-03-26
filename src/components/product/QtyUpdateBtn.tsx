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
        className="group hover:bg-black hover:rounded-xl  border border-gray-300 rounded-xl cursor-pointer p-1"
      >
        <Minus className="w-3 h-3 cursor-pointer group-hover:text-white group-hover:stroke-white" />
      </div>
      <p className="text-sm">{qty}</p>
      <div
        onClick={increaseNum}
        className="group hover:bg-black hover:rounded-xl border border-gray-300 rounded-xl cursor-pointer p-1"
      >
        <Plus className="w-3 h-3 cursor-pointer group-hover:text-white group-hover:stroke-white" />
      </div>
    </div>
  );
};

export default QtyUpdateBtn;
