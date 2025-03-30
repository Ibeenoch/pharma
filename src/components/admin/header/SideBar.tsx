import CustomText from "../../common/Text";
import NavIcons from "./NavIcons";
import { COMPANY_NAME } from "../../../constants/appText";
import Drug from "../../../assets/icons/pharmacy.svg?react";
import { oliveColorBg } from "../../../constants/appColor";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setSideBarIndex,
} from "../../../features/admin/adminSlice";

const SideBar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sideBarIndex } = useAppSelector(selectAdmin);

  const handleIndexClicked = (index: number) => {
    dispatch(setSideBarIndex(index));

    switch (index) {
      case 0:
        navigate("/admin/dashboard");
        break;
      case 1:
        navigate("/admin/users");
        break;
      case 2:
        navigate("/admin/product");
        break;
      default:
        navigate("/admin/dashboard");
        break;
    }
  };
  return (
    <aside className={`fixed left-0 w-[15%] top-0 h-full  z-50`}>
      <div
        className={`mx-auto flex flex-col pb-5 items-center ${oliveColorBg} pb-7 ${
          sideBarIndex === 0 && "rounded-br-4xl"
        }`}
      >
        <div className="flex items-center">
          <Drug className="w-4 h-4" />
          <CustomText
            text={`${COMPANY_NAME}`}
            textType="medium"
            weightType="semibold"
            extraStyle="py-4 text-black px-2"
          />
        </div>
      </div>
      <div className={`${oliveColorBg} h-full pb-24`}>
        <NavIcons
          indexClicked={sideBarIndex}
          handleIndexClicked={handleIndexClicked}
        />
      </div>
    </aside>
  );
};

export default SideBar;
