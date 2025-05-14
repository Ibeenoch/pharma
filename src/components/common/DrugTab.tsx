import React from "react";
import CustomText from "./Text";

interface DrugTabProps {
  topText: string;
  bottomText?: string;
  bgColor?: string;
}

const DrugTab: React.FC<DrugTabProps> = ({ topText, bottomText, bgColor }) => {
  return (
    <div className={`p-3 rounded-lg my-1 ${bgColor ? bgColor : "bg-white"}`}>
      <CustomText
        text={topText}
        textType="extrasmall"
        weightType="medium"
        color="text-gray-400"
        extraStyle="text-center"
      />
      {bottomText && (
        <CustomText
          text={bottomText}
          textType="small"
          weightType="semibold"
          extraStyle="text-center"
        />
      )}
    </div>
  );
};

export default DrugTab;
