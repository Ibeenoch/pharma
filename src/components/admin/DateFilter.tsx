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
    <div className="flex flex-col md:flex-row items-center justify-start gap-6 pt-2 overflow-x-auto">
      <div className="block sm:flex gap-2 items-center">
        <CustomText
          text="Start"
          textType="small"          
          weightType="medium"
        />
        <CustomInput
          value={started}
          onChange={setStarted}
          type="date"
          Id="started"
          showFullWidth={true}
        />
      </div>
      <div className="block sm:flex gap-2 items-center">
        <CustomText
          text="End"
          textType="small"
          weightType="medium"
        />
        <CustomInput value={ended} onChange={setEnded} type="date" Id="ended"   showFullWidth={true} />
      </div>
      <CustomButton text="Apply" onClick={applyCallback} fullwidth={true} />
    </div>
  );
};

export default DateFilter;
