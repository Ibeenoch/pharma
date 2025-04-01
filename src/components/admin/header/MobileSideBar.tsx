import Cancel from "../../../assets/icons/cancel-slim.svg?react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setSideBarIndex,
} from "../../../features/admin/adminSlice";
import MobileNavIcons from "./MobileNavIcons";
import CompanyLogo from "../../common/CompanyLogo";

interface MobileSideBarProps {
  showSideBar: boolean;
  closeFunc: () => void;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({
  showSideBar,
  closeFunc,
}) => {
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
      case 3:
        navigate("/admin/order");
        break;
      default:
        navigate("/admin/dashboard");
        break;
    }
  };
  return (
    <aside
      className={`fixed left-0 ${
        showSideBar ? "block" : "hidden"
      } w-full top-0 h-full bg-white z-50`}
    >
      <div className={`mx-auto flex  px-8 pt-4 items-center justify-between`}>
        <CompanyLogo />

        <div
          onClick={closeFunc}
          className="w-10 h-10 p-2 bg-gray-400 rounded-full absolute top-8 right-8 flex justify-center items-center"
        >
          <Cancel className="w-26 h-26 stroke-white" />
        </div>
      </div>
      <div className={`pl-[10%] h-full pt-12 pb-24`}>
        <MobileNavIcons
          indexClicked={sideBarIndex}
          handleIndexClicked={handleIndexClicked}
        />
      </div>
    </aside>
  );
};

export default MobileSideBar;
