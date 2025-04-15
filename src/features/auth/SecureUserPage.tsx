import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectAuth } from './authSlice';
import LoginPage from '../../pages/LoginPage';

interface SecureUserPageProps {
    child: React.ReactNode;
    redirectUrl?: string
}

const SecureUserPage: React.FC<SecureUserPageProps> = ({ child, redirectUrl }) => {
    const { user } = useAppSelector(selectAuth);
  return (
   
      user && user.email ? child : ( <LoginPage redirectUrl={redirectUrl} /> )
   
  )
}

export default SecureUserPage