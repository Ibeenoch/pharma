import { UserDataProps, UserMappedProps } from "../../../types/auth/UserData";
import { mappedUser } from "../../../utils/admin/user/mappedUser";
import { allUsersColumn, allUsersData } from "../../../utils/admin/user/users";
import Table from "../../common/Table";

interface UserAdminProps {
  users: UserDataProps[]
}

const UserAdmin: React.FC<UserAdminProps> = ({ users }) => {
  const filteredData: UserMappedProps[] = users && Array.isArray(users) ? mappedUser(users) : [];
  return (
    <section>
      <div className="p-4 my-3 bg-white rounded-xl">
     {  filteredData && Array.isArray(filteredData) &&  (   
      <Table
          columns={allUsersColumn}
          data={filteredData}
          tableHeaderTxtColor="text-black"
          whichTable="user"
        />)}
      </div>
    </section>
  );
};

export default UserAdmin;
