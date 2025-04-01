import { adminDefaultBgColor } from "../../../constants/appColor";
import { userLists } from "../../../utils/admin/users";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setAdminUserTabIndex,
} from "../../../features/admin/adminSlice";
import AllUsers from "./AllUsers";
import CustomInput from "../../common/Input";
import CustomText from "../../common/Text";
import { useState } from "react";
import UserAdmin from "./UserAdmin";
import UserPharma from "./UserPharma";
import UserCustomer from "./UserCustomer";
import NavTab from "../NavTab";
import DateFilter from "../DateFilter";

const AdminUsers = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const dispatch = useAppDispatch();
  const { adminUsertabIndex } = useAppSelector(selectAdmin);
  const handleUserTabs = (index: number) => {
    dispatch(setAdminUserTabIndex(index));
  };
  return (
    <main className={`md:mt-12 mt-20 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row p-4 items-center justify-between">
        <NavTab
          handleTabclicked={handleUserTabs}
          indexClicked={adminUsertabIndex}
          navLists={userLists}
        />

        <DateFilter
          applyCallback={() => {}}
          ended={ended}
          started={started}
          setEnded={setEnded}
          setStarted={setStarted}
        />
      </div>

      <section>
        {adminUsertabIndex === 0 ? (
          <AllUsers />
        ) : adminUsertabIndex === 1 ? (
          <UserAdmin />
        ) : adminUsertabIndex === 2 ? (
          <UserPharma />
        ) : adminUsertabIndex === 3 ? (
          <UserCustomer />
        ) : (
          <div className="flex justify-center items-center">No User Found</div>
        )}
      </section>
    </main>
  );
};

export default AdminUsers;
