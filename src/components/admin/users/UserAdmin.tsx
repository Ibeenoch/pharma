import { allUsersColumn, allUsersData } from "../../../utils/admin/users";
import Table from "../../common/Table";

const UserAdmin = () => {
  const filteredData = allUsersData.filter((t) => t.role === "Admin");
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={allUsersColumn}
          data={filteredData}
          tableHeaderTxtColor="text-black"
          whichTable="user"
        />
      </div>
    </section>
  );
};

export default UserAdmin;
