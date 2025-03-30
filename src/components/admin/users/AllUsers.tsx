import { allUsersColumn, allUsersData } from "../../../utils/admin/users";
import Table from "../../common/Table";

const AllUsers = () => {
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
        <Table
          columns={allUsersColumn}
          data={allUsersData}
          tableHeaderTxtColor="text-black"
        />
      </div>
    </section>
  );
};

export default AllUsers;
