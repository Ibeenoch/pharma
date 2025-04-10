import React from 'react'
import { useAppSelector } from '../../hooks/reduxHooks';
import { selectAuth } from './authSlice';
import LoginPage from '../../pages/LoginPage';

interface SecureUserPageProps {
    child: React.ReactNode;
}

const SecureUserPage: React.FC<SecureUserPageProps> = ({ child }) => {
    const { user } = useAppSelector(selectAuth);
  return (
   
      user && user.email ? child : ( <LoginPage /> )
   
  )
}

export default SecureUserPage