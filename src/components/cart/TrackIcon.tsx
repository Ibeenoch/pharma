import CustomText from "../common/Text";
import CheckMark from "./CheckMark";

const TrackIcon = () => {
  return (
    <>
      <div className="flex items-center my-4">
        <CheckMark />
        <div className="w-[35%] border-2 border-amber-500 h-1"></div>
        <div className="w-4 h-4 rounded-full bg-amber-500 flex justify-center items-center">
          <CheckMark />
        </div>
        <div className="w-[35%] border-2 border-amber-500 opacity-50 h-1"></div>
        <div className="w-4 h-4 rounded-full bg-amber-500 opacity-50 flex justify-center items-center">
          <CheckMark />
        </div>
      </div>

      <div className="flex items-center my-4 md:gap-30 gap-28">
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
          text="Processing Delivery"
          textType="small"
          weightType="semibold"
        />
      </div>
    </>
  );
};

export default TrackIcon;
