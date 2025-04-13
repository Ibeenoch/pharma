import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth } from "./authSlice";
import LoginPage from "../../pages/LoginPage";

interface SecureAdminPageProps {
  child: React.ReactNode;
}

const SecureAdminPage: React.FC<SecureAdminPageProps> = ({ child }) => {
  const { user } = useAppSelector(selectAuth);
  return user && user.userId && user.role?.toLowerCase() === "admin" ? (
    child
  ) : (
    <LoginPage />
  );
};

export default SecureAdminPage;
