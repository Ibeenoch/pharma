import React from "react";
import CustomButton from "../common/Button";
import CustomText from "../common/Text";
import CustomInput from "../common/Input";

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
    <div className="flex items-center gap-6 pt-2 overflow-x-auto">
      <div className="flex gap-2 items-center">
        <CustomText
          text="Start"
          textType="small"
          weightType="semibold"
          extraStyle="text-gray-500"
        />
        <CustomInput
          value={started}
          onChange={setStarted}
          type="date"
          Id="started"
        />
      </div>
      <div className="flex gap-2 items-center">
        <CustomText
          text="End"
          textType="small"
          weightType="semibold"
          extraStyle="text-gray-500"
        />
        <CustomInput value={ended} onChange={setEnded} type="date" Id="ended" />
      </div>
      <CustomButton text="Apply" onClick={applyCallback} />
    </div>
  );
};

export default DateFilter;
