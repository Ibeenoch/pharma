import React from "react";
import Minus from "../../assets/icons/minus.svg?react";
import Plus from "../../assets/icons/plus-slim.svg?react";

interface QtyUpdateBtnProps {
  qty: number;
  decreaseNum: (id: string) => void;
  increaseNum: (id: string) => void;
  id: string;
  size?: 'big' | 'normal';
}
const QtyUpdateBtn: React.FC<QtyUpdateBtnProps> = ({
  qty,
  decreaseNum,
  increaseNum,
  id,
  size= 'normal'
}) => {
  return (
    <div className="flex items-center gap-3 ">
      <div
        onClick={() => decreaseNum(id)}
        className={`group hover:bg-black hover:rounded-xl  border border-gray-300 rounded-xl cursor-pointer ${size === 'normal' ? 'p-1' : 'p-3'}`}
      >
        <Minus className={`${size === 'normal' ? 'w-3 h-3': 'w-5 h-5'} cursor-pointer group-hover:text-white group-hover:stroke-white`} />
      </div>
      <p className={` ${size === 'normal' ? "text-sm" : 'text-lg'}`}>{qty}</p>
      <div
        onClick={() => increaseNum(id)}
        className={`group hover:bg-black hover:rounded-xl  border border-gray-300 rounded-xl cursor-pointer ${size === 'normal' ? 'p-1' : 'p-3'}`}
      >
        <Plus className={`${size === 'normal' ? 'w-3 h-3': 'w-5 h-5'} cursor-pointer group-hover:text-white group-hover:stroke-white`} />
      </div>
    </div>
  );
};

export default QtyUpdateBtn;
