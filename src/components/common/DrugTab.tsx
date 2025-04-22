import React from "react";
import CustomText from "./Text";

interface DrugTabProps {
  topText: string;
  bottomText?: string;
}

const DrugTab: React.FC<DrugTabProps> = ({ topText, bottomText }) => {
  return (
    <div className="p-3 rounded-lg bg-white">
      <CustomText
        text={topText}
        textType="small"
        weightType="medium"
        color="text-gray-400"
        extraStyle="text-center"
      />
      <CustomText
        text={bottomText}
        textType="small"
        weightType="semibold"
        extraStyle="text-center"
      />
    </div>
  );
};

export default DrugTab;
