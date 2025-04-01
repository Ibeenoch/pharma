import React from "react";
import NavBar from "../../../components/admin/header/NavBar";
import SideBar from "../../../components/admin/header/SideBar";
import { adminDefaultBgColor } from "../../../constants/appColor";
import ArrowLeft from "../../../assets/icons/arrow-left.svg?react";
import ArrowRight from "../../../assets/icons/arrow-right2.svg?react";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import { selectAdmin, setShouldAdminSideBarMinimize } from "../adminSlice";
import ArrowMaximize from "../../../components/admin/dashboard/ArrowMaximize";
import ArrowMinimize from "../../../components/admin/dashboard/ArrowMinimize";
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
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
            ? "md:w-[95%] left-[5%]"
            : "md:w-[85%] md:left-[15%]"
        }  p-4`}
      >
        <NavBar title={title} enlarge={shouldMinimizeSideBar} />
        <main className={`md:w-full`}>{children}</main>
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
