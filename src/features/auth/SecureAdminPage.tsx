import React from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth } from "./authSlice";
import LoginPage from "../../pages/LoginPage";

interface SecureAdminPageProps {
  child: React.ReactNode;
  redirectUrl?: string
}

const SecureAdminPage: React.FC<SecureAdminPageProps> = ({ child, redirectUrl }) => {
  const { user } = useAppSelector(selectAuth);
  return user && user.userId && user.role?.toLowerCase() === "admin" ? (
    child
  ) : (
    <LoginPage redirectUrl={redirectUrl} />
  );
};

export default SecureAdminPage;
