import React from "react";
import CustomText from "../common/Text";
import CustomInput from "../common/Input";
import CustomButton from "../common/Button";

interface DateFilterProps {
  started: string;
  ended: string;
  setStarted: React.Dispatch<React.SetStateAction<string>>;
  setEnded: React.Dispatch<React.SetStateAction<string>>;
  applyCallback: () => void;
}

const DateFilter: React.FC<DateFilterProps> = ({
  started,
  ended,
  setStarted,
  setEnded,
  applyCallback,
}) => {
  return (
    <div className="md:flex md:justify-between my-3">
    <div className=" md:flex items-center gap-2 overflow-x-auto">
      <div className="md:flex gap-2 items-center">
        <CustomText
          text="Start"
          textType="small"
          weightType="semibold"
          extraStyle="text-gray-500 my-1"
        />
        <CustomInput
          value={started}
          onChange={setStarted}
          type="date"
          Id="started"
          showFullWidth={true}
          placeholder="Start Date"
        />
      </div>
      <div className="md:flex gap-2 items-center my-2">
        <CustomText
          text="End"
          textType="small"
          weightType="semibold"
          extraStyle="text-gray-500"
        />
        <CustomInput
          value={ended}
          onChange={setEnded}
          type="date"
          Id="ended"
          showFullWidth={true}
          placeholder="End Date"
        />
      </div>
    </div>

    <div className="w-full sm:w-[200px] my-1">
      <CustomButton text="Apply" fullwidth={true} onClick={applyCallback} />
    </div>
  </div>
  );
};

export default DateFilter;
