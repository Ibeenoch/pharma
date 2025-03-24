import React from "react";
import CustomText from "../common/Text";
import ArrowRight from "../../assets/icons/arrow-right2-white.svg?react";

interface ProfileListProps {
  listOfIcons: React.FunctionComponent<
    React.SVGProps<SVGSVGElement> & {
      title?: string;
      titleId?: string;
      desc?: string;
      descId?: string;
    }
  >[];
  icontext: string[];
}

const ProfileList: React.FC<ProfileListProps> = ({ listOfIcons, icontext }) => {
  return listOfIcons.map((Item, index) => (
    <div
      key={index}
      className="flex justify-between bg-white p-4 items-center my-4 cursor-pointer group"
    >
      <div className="flex items-center gap-5">
        <div className="p-2 bg-black rounded-full">
          <Item className="w-5 h-5" />
        </div>

        <CustomText
          text={icontext[index]}
          textType="normal"
          weightType="bold"
          extraStyle=""
        />
      </div>

      <div className="p-2 bg-black rounded-full">
        <ArrowRight className="w-5 h-5" />
      </div>
    </div>
  ));
};

export default ProfileList;
