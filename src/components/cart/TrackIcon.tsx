import React from "react";
import CheckMark from "./CheckMark";
import CustomText from "../common/Text";

interface TrackIconProps {
  stage?: number;
}
const TrackIcon: React.FC<TrackIconProps> = ({ stage }) => {
  return (
    <>
      <div className="flex items-center my-5 overflow-x-auto">
        <CheckMark />
        <div className="w-[35%] border-2 border-amber-500 h-1"></div>
        <div className="w-4 h-4 rounded-full bg-amber-500 flex justify-center items-center">
          <CheckMark />
        </div>
        <div className={`w-[35%] border-2 border-amber-500 ${stage && stage >= 3 ? '' : 'opacity-50'} h-1`}></div>
        <div className={`w-4 h-4 rounded-full bg-amber-500 ${stage && stage >= 3 ? '' : 'opacity-50'} flex justify-center items-center`}>
          <CheckMark />
        </div>
        <div className={`w-[35%] border-2 border-amber-500 ${stage && stage >= 4 ? '' : 'opacity-50'} h-1`}></div>
        <div className={`w-4 h-4 rounded-full bg-amber-500 ${stage && stage >= 4 ? '' : 'opacity-50'} flex justify-center items-center`}>
          <CheckMark />
        </div>
      </div>

      <div className="flex items-center my-4 md:gap-25 gap-10">
        <CustomText
          text="Order Placed"
          textType="small"
          weightType="semibold"
        />
        <CustomText
          text="Payment Received"
          textType="small"
          weightType="semibold"
        />
        <CustomText
          text="Shipped"
          textType="small"
          weightType="semibold"
        />
        <CustomText
          text="Delivered"
          textType="small"
          weightType="semibold"
        />
      </div>
    </>
  );
};

export default TrackIcon;
