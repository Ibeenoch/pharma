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
  textcolor?: string;
  index: number;
}
const BodyCard: React.FC<BodyCardProps> = ({
  Icon,
  topText,
  middleText,
  endText,
  color,
  textcolor,
  index,
}) => {
  return (
    <article
      key={index}
      className={`${color} w-full md:w-[400px] h-[150px] md:h-auto md:w-full cursor-pointer rounded-2xl shadow-lg shadow-[${color}] p-4`}
    >
      <div className="flex justify-between items-center gap-2 my-3">
        <div>
          <CustomText
            text={topText}
            textType="small"
            color={textcolor}
            weightType="medium"
          />

          <CustomText
            text={middleText}
            textType="medium"
            weightType="semibold"
            color={textcolor}
          />
        </div>

        <div className="p-2 bg-white rounded-full">
          <Icon className={`w-7 h-7 ${textcolor}`} />
        </div>
      </div>
      <div>
        <CustomText
          text={endText}
          textType="small"
          weightType="medium"
          color={textcolor}
          extraStyle="pb-4"
        />
      </div>
    </article>
  );
};

export default BodyCard;
