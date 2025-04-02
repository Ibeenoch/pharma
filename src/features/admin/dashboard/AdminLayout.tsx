import React, { useState } from "react";
import NavBar from "../../../components/admin/header/NavBar";
import SideBar from "../../../components/admin/header/SideBar";
import { adminDefaultBgColor } from "../../../constants/appColor";
import ArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../../assets/icons/arrow-right2.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAdmin, setShouldAdminSideBarMinimize } from "../adminSlice";
import ArrowMaximize from "../../../components/admin/dashboard/ArrowMaximize";
import ArrowMinimize from "../../../components/admin/dashboard/ArrowMinimize";
import HamburgerMenu from "../../../assets/icons/menu-align-left.svg?react";
import MobileSideBar from "../../../components/admin/header/MobileSideBar";
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
  const { shouldMinimizeSideBar } = useAppSelector(selectAdmin);
  const toggleMinimizeSideBar = () => {
    dispatch(setShouldAdminSideBarMinimize(!shouldMinimizeSideBar));
  };

  return (
    <main className={`${adminDefaultBgColor} min-h-screen flex`}>
      <SideBar shouldMinimize={shouldMinimizeSideBar} />
      <section
        className={`absolute top-[20]   ${
          shouldMinimizeSideBar
            ? "lg:w-[95%] left-[5%]"
            : "lg:w-[85%] lg:left-[15%]"
        }  p-4`}
      >
        <NavBar title={title} enlarge={shouldMinimizeSideBar} />
        <main className={`lg:w-full`}>{children}</main>
        <div onClick={handleShowMobileSideBar} className={`flex lg:hidden absolute z-50 top-5 left-[5%]`}>
            <HamburgerMenu className="w-9 h-9 text-gray-700" />
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
