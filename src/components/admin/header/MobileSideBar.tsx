import Cancel from "../../../assets/icons/cancel-slim.svg?react";
import { useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setSideBarIndex,
} from "../../../features/admin/adminSlice";
import CompanyLogo from "../../common/CompanyLogo";
import { animateTransition } from "../../../constants/appText";
import MobileNavIcons from "./MobileNavIcons1";
import { selectAuth } from "../../../features/auth/authSlice";

interface MobileSideBarProps {
  showSideBar: boolean;
  closeFunc: () => void;
  shouldMinimize?: boolean;
}

const MobileSideBar: React.FC<MobileSideBarProps> = ({
  showSideBar,
  closeFunc,
  shouldMinimize = true,
}) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { sideBarIndex } = useAppSelector(selectAdmin);
  const { user } = useAppSelector(selectAuth)

  const handleIndexClicked = (index: number) => {
    dispatch(setSideBarIndex(index));

    switch (index) {
      case 0:
        navigate( `/admin/dashboard/${user && user.userId}`);
        break;
    }
  };
  return (
    <aside
      className={`fixed left-0 ${animateTransition} ${
        showSideBar ? "block" : "hidden"
      } w-full top-0 h-full bg-black z-50`}
    >
      <div
        className={`mx-auto flex flex-col pb-5 justify-around items-center  pt-7 `}
      >
        <div className="absolute top-7 left-7">
          <CompanyLogo
            fontWeight="normal"
            textSize="medium"
            textColor="text-white"
            iconSize="w-7 h-7 text-amber-500"
            showText={!shouldMinimize}
          />
        </div>

        <div
          onClick={closeFunc}
          className="w-10 h-10 p-3 bg-amber-500/50 rounded-full absolute top-7 right-7 flex justify-center items-center"
        >
          <Cancel className="w-20 h-20 text-white stroke-white" />
        </div>
      </div>

      <div className={`h-full pt-15 pb-24`}>
        <MobileNavIcons
          indexClicked={sideBarIndex}
          handleIndexClicked={handleIndexClicked}
          shouldMinimize={shouldMinimize}
        />
      </div>
    </aside>
  );
};

export default MobileSideBar;
