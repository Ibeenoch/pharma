import { lazy } from "react";
const Profile = lazy(() =>import("../features/auth/Profile"));

const ProfilePage = () => {
  return (
    <main className={``}>
      <Profile />
    </main>
  );
};

export default ProfilePage;
