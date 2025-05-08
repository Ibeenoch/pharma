import React, { lazy } from "react";
import { useAppSelector } from "../../hooks/reduxHooks";
import { selectAuth } from "./authSlice";
const LoginPage = lazy(() =>import("../../pages/LoginPage"));

interface SecureUserPageProps {
  child: React.ReactNode;
  redirectUrl?: string;
}

const SecureUserPage: React.FC<SecureUserPageProps> = ({
  child,
  redirectUrl,
}) => {
  const { user } = useAppSelector(selectAuth);
  return user && user.email && user.userId ? (
    child
  ) : (
    <LoginPage redirectUrl={redirectUrl} />
  );
};

export default SecureUserPage;
