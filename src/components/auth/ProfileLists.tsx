import React from "react";
import CustomText from "../common/Text";

interface ProfileListsProps {
  Icon: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >;
  leftText?: string;
  rightText?: string;
}

const ProfileLists: React.FC<ProfileListsProps> = ({
  Icon,
  leftText,
  rightText,
}) => {
  return (
    <div className="flex gap-4 items-center my-1">
      <div className="flex gap-2 items-center">
        <Icon className="w-4 h-4 text-gray-500" />
        <CustomText
          text={leftText}
          textType="normal"
          weightType="normal"
          extraStyle="text-gray-500"
        />
      </div>
      <div>
        <CustomText text={rightText} textType="normal" weightType="semibold" />
      </div>
    </div>
  );
};

export default ProfileLists;
