import { adminDefaultBgColor } from "../../../constants/appColor";
import { userLists, userStatitics } from "../../../utils/admin/users";
import { useAppDispatch, useAppSelector } from "../../../hooks/reduxHooks";
import {
  selectAdmin,
  setAdminUserTabIndex,
} from "../../../features/admin/adminSlice";
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
    <main className={`md:mt-12 mt-20 p-4 ${adminDefaultBgColor}`}>
      <section className="lg:flex items-center gap-3 mx-3">
        {userStatitics.map((user) => (
          <div className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-300 p-4 w-1/2 h-[150px] my-2 flex justify-between gap-2 items-center">
            <div className="p-2 bg-white rounded-md flex items-center justify-center">
              <user.Icon className="w-8 h-8 text-amber-500" />
            </div>
            <div>
              <CustomText
                text={user.text}
                textType="normal"
                weightType="normal"
                color="text-white"
              />
              <CustomText
                text={String(user.qty)}
                textType="large"
                weightType="normal"
              />
            </div>
          </div>
        ))}
      </section>
      <div className="flex flex-col md:flex-row  items-center justify-between">
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
        <UserAdmin />
        {/* {adminUsertabIndex === 0 ? (
          <AllUsers />
        ) : adminUsertabIndex === 1 ? (
          <UserAdmin />
        ) : adminUsertabIndex === 2 ? (
          <UserPharma />
        ) : adminUsertabIndex === 3 ? (
          <UserCustomer />
        ) : (
          <div className="flex justify-center items-center">No User Found</div>
        )} */}
      </section>
    </main>
  );
};

export default AdminUsers;
