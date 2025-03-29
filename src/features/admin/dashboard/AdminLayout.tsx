import NavBar from "../../../components/admin/header/NavBar";
import SideBar from "../../../components/admin/header/SideBar";
interface AdminLayoutProps {
  children: React.ReactNode;
}

const AdminLayout: React.FC<AdminLayoutProps> = ({ children }) => {
  return (
    <main className="bg-[#fdebc7] min-h-screen flex">
      <SideBar />
      <section className="flex-1 ml-[12%] p-4">
        <NavBar />
        {children}
      </section>
    </main>
  );
};

export default AdminLayout;
