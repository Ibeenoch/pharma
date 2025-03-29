import React from "react";
import CustomText from "../../common/Text";

interface BodyCardProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
      index?: number;
    }
  >;
  topText?: string;
  middleText?: string;
  endText?: string;
  color?: string;
  index: number;
}
const BodyCard: React.FC<BodyCardProps> = ({
  Icon,
  topText,
  middleText,
  endText,
  color,
  index,
}) => {
  return (
    <article
      key={index}
      className={`${color} w-full cursor-pointer rounded-2xl shadow-lg shadow-[${color}] p-4`}
    >
      <div className="flex justify-between items-center gap-2 my-3">
        <div>
          <CustomText
            text={topText}
            textType="small"
            color="text-white"
            weightType="medium"
          />

          <CustomText
            text={middleText}
            textType="medium"
            weightType="semibold"
            color="text-white"
          />
        </div>

        <div className="p-2 bg-white rounded-full">
          <Icon className="w-7 h-7" />
        </div>
      </div>
      <div>
        <CustomText
          text={endText}
          textType="small"
          weightType="medium"
          color="text-white"
          extraStyle="pb-4"
        />
      </div>
    </article>
  );
};

export default BodyCard;
