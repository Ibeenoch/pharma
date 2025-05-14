import React, { useEffect, useState } from "react";
import { adminDefaultBgColor } from "../../../constants/appColor";
import ArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../../assets/icons/arrow-right2.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAdmin, setShouldAdminSideBarMinimize } from "../adminSlice";
import HamburgerMenu from "../../../assets/icons/menu.svg?react";
import { getAllUser, selectAuth } from "../../auth/authSlice";
import {
  calcualateTotalRevenue,
  getAllTransaction,
  selectOrder,
} from "../../order/orderSlice";
import SideBar from "../../../components/admin/header/SideBar";
import NavBar from "../../../components/admin/header/NavBar";
import MobileSideBar from "../../../components/admin/header/MobileSideBar";
import ArrowMaximize from "../../../components/admin/dashboard/ArrowMaximize";
import ArrowMinimize from "../../../components/admin/dashboard/ArrowMinimize";

interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  const [showMobileSideBar, setShowMobileSideBar] = useState<boolean>(false);
  const handleShowMobileSideBar = () => {
    setShowMobileSideBar(true);
  };
  const handleHideMobileSideBar = () => {
    setShowMobileSideBar(false);
  };
  const dispatch = useAppDispatch();
  const { refreshAllUsers } = useAppSelector(selectAuth);
  const { refreshTransaction } = useAppSelector(selectOrder);
  const { shouldMinimizeSideBar } = useAppSelector(selectAdmin);
  const toggleMinimizeSideBar = () => {
    dispatch(setShouldAdminSideBarMinimize(!shouldMinimizeSideBar));
  };

  useEffect(() => {
    refreshAllUsers && dispatch(getAllUser(0));
    refreshTransaction &&
      dispatch(getAllTransaction(1)).then(() => {
        dispatch(calcualateTotalRevenue());
      });
  }, []);

  return (
    <main className={`${adminDefaultBgColor} min-h-screen flex`}>
      <SideBar shouldMinimize={shouldMinimizeSideBar} />
      <section
        className={`absolute top-[20] w-full  ${
          shouldMinimizeSideBar
            ? "lg:w-[95%] left-[5%]"
            : "lg:w-[85%] lg:left-[15%]"
        }  p-4`}
      >
        <NavBar title={title} enlarge={shouldMinimizeSideBar} />
        <main className={`w-full`}>{children}</main>
        <div
          onClick={handleShowMobileSideBar}
          className={`flex lg:hidden fixed cursor-pointer z-50 top-5 left-[5%]`}
        >
          <HamburgerMenu className="w-8 h-8 text-gray-500" />
        </div>
        <div className="lg:hidden">
          <MobileSideBar
            showSideBar={showMobileSideBar}
            closeFunc={handleHideMobileSideBar}
            shouldMinimize={shouldMinimizeSideBar}
          />
        </div>
      </section>
      {shouldMinimizeSideBar ? (
        <ArrowMaximize
          Icon={ArrowRight}
          callBack={toggleMinimizeSideBar}
          showIcon={shouldMinimizeSideBar}
        />
      ) : (
        <ArrowMinimize
          Icon={ArrowLeft}
          callBack={toggleMinimizeSideBar}
          showIcon={shouldMinimizeSideBar}
        />
      )}
    </main>
  );
};

export default AdminLayout;
