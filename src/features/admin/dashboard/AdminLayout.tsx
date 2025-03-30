import React from "react";
import NavBar from "../../../components/admin/header/NavBar";
import SideBar from "../../../components/admin/header/SideBar";
import { adminDefaultBgColor } from "../../../constants/appColor";
interface AdminLayoutProps {
  children: React.ReactNode;
  title: string;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children, title }) => {
  return (
    <main className={`${adminDefaultBgColor} min-h-screen flex`}>
      <SideBar />
      <section className="flex-1 ml-[15%] p-4">
        <NavBar title={title} />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
