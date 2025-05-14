import React from 'react'
import Users from '../../../../assets/icons/user.svg?react';
import Email from '../../../../assets/icons/email.svg?react';
import { UserDataProps } from '../../../../types/auth/UserData';
import CustomText from '../../../common/Text';

interface UserSearchListProps {
  user: UserDataProps;
}

const UserSearchList: React.FC<UserSearchListProps> = ({ user }) => {
  return (
    <div className='p-4 bg-white m-2 border-b border-gray-200'>
              <div className='flex gap-2 items-center'>
                <div className='w-8 h-8 rounded-full p-2 flex justify-center items-center bg-amber-500'>{user && user.firstName?.toUpperCase().slice(0,1)}</div>
   
               <div className=''>
           <CustomText text={`${user && user.firstName} ${user && user.lastName}`} textType='normal' weightType='semibold' />
         <div className='flex items-center gap-2'>
             <div className='flex items-center gap-1'>
               <Users className='w-4 h-4 text-amber-500' />
               <CustomText text={`${user && user.role}`} textType='small' weightType='medium'color='text-gray-400' />
             </div>
             <div className='flex items-center gap-1'>
                <Email className='w-4 h-4 text-amber-500' />
               <CustomText text={`${user && user.email}`} textType='small' weightType='medium' color='text-gray-400' />
             </div>
           </div>
   
               </div>
              </div>
      
              </div>
  )
}

export default UserSearchList