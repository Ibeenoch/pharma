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

const AdminUsers = () => {
  const [started, setStarted] = useState<string>("");
  const [ended, setEnded] = useState<string>("");
  const dispatch = useAppDispatch();
  const { adminUsertabIndex } = useAppSelector(selectAdmin);
  const handleUserTabs = (index: number) => {
    dispatch(setAdminUserTabIndex(index));
  };
  return (
    <main className={`mt-12 ${adminDefaultBgColor}`}>
      <div className="flex flex-col md:flex-row items-center justify-between">
        <NavTab
          handleTabclicked={handleUserTabs}
          indexClicked={adminUsertabIndex}
          navLists={userLists}
        />

        <div className="flex items-center gap-6 overflow-x-auto">
          <div className="flex gap-2 items-center">
            <CustomText
              text="Start"
              textType="small"
              weightType="semibold"
              extraStyle="text-gray-500"
            />
            <CustomInput
              value={started}
              onChange={setStarted}
              type="date"
              Id="started"
            />
          </div>
          <div className="flex gap-2 items-center">
            <CustomText
              text="End"
              textType="small"
              weightType="semibold"
              extraStyle="text-gray-500"
            />
            <CustomInput
              value={ended}
              onChange={setEnded}
              type="date"
              Id="ended"
            />
          </div>
        </div>
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
