import React, { lazy } from "react";
const CustomText = lazy(() =>import('../common/Text'));

interface IconShowListProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  topText: string;
  bottomText: string;
}

const IconShowList: React.FC<IconShowListProps> = ({
  Icon,
  topText,
  bottomText,
}) => {
  return (
    <div className="flex items-center gap-2 my-3">
      <div className="bg-white p-2 flex justify-center items-center rounded-lg">
        <Icon className="w-6 h-6" />
      </div>
      <div>
        <CustomText
          text={topText}
          textType="small"
          weightType="thin"
          extraStyle="text-gray-500"
        />
        <CustomText
          text={bottomText}
          textType="small"
          weightType="thin"
          extraStyle=""
        />
      </div>
    </div>
  );
};

export default IconShowList;
