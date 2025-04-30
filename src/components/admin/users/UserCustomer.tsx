import { allUsersColumn, allUsersData } from "../../../utils/admin/user/users";
import Table from "../../common/Table";

const UserCustomer = () => {
  const filteredData = allUsersData.filter((t) => t.role === "Customer");
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={allUsersColumn}
          data={filteredData}
          tableHeaderTxtColor="text-black"
        />
      </div>
    </section>
  );
};

export default UserCustomer;
