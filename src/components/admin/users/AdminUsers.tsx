import { adminDefaultBgColor } from "../../../constants/appColor";
import { userStatitics } from "../../../utils/admin/user/users";
import { useAppSelector } from "../../../hooks/reduxHooks";
import CustomText from "../../common/Text";
import UserAdmin from "./UserAdmin";
import { selectAuth } from "../../../features/auth/authSlice";

const AdminUsers = () => {
 
  const { users } = useAppSelector(selectAuth);

  return (
    <main className={`md:mt-12 mt-20 p-4 ${adminDefaultBgColor}`}>
      <section className="w-full lg:flex items-center gap-3 mx-3">
        {userStatitics.map((user) => (
          <div className="rounded-xl bg-gradient-to-r from-amber-600 to-amber-300 p-4 w-full lg:w-1/2 h-[150px] my-2 flex justify-between gap-2 items-center">
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
      <div className="flex flex-col md:flex-row  items-center justify-center">
        <CustomText text="All Users" textType="normal" weightType="semibold" extraStyle="text-center" />
      </div>

      <section>
        <UserAdmin users={users} />
      </section>
    </main>
  );
};

export default AdminUsers;
