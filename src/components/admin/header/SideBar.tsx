import { useState } from "react";
import CustomText from "../../common/Text";
import NavIcons from "./NavIcons";
import { COMPANY_NAME } from "../../../constants/appText";
import Drug from "../../../assets/icons/pharmacy.svg?react";
import { oliveColorBg } from "../../../constants/appColor";

const SideBar = () => {
  const [indexClicked, setIndexClicked] = useState<number>(0);

  const handleIndexClicked = (index: number) => {
    setIndexClicked(index);
  };
  return (
    <aside className={`fixed left-0 top-0 h-full  z-50`}>
      <div
        className={`mx-auto flex flex-col pb-5 items-center ${oliveColorBg} pb-7 ${
          indexClicked === 0 && "rounded-br-4xl"
        }`}
      >
        <div className="flex gap-1 items-center">
          <Drug className="w-4 h-4" />
          <CustomText
            text={`${COMPANY_NAME}`}
            textType="medium"
            weightType="medium"
            extraStyle="py-4 text-white"
          />
        </div>
      </div>
      <div className={`${oliveColorBg} h-full pb-24`}>
        <NavIcons
          indexClicked={indexClicked}
          handleIndexClicked={handleIndexClicked}
        />
      </div>
    </aside>
  );
};

export default SideBar;
