import React from 'react'
import Mail from '../../../assets/icons/email.svg?react';
import Phone from '../../../assets/icons/phone.svg?react';
import CustomText from '../../common/Text';

interface MessageCardProps {
    email: string;
    phone: string;
    fullname: string;
    message: string;
}

const MessageCard: React.FC<MessageCardProps> = ({ email, phone, fullname, message}) => {
  return (
    <div className='p-4 rounded-xl bg-white m-2'>
    <div className='flex gap-2 items-center'>
      <div className='w-8 h-8 rounded-full p-2 flex justify-center items-center bg-amber-500'>{fullname.toUpperCase().slice(0,1)}</div>

      <div className=''>
        <CustomText text={fullname} textType='normal' weightType='semibold' />
      <div className='flex items-center gap-2'>
          <div className='flex items-center gap-1'>
            <Mail className='w-4 h-4 text-amber-500' />
            <CustomText text={email} textType='small' weightType='medium'color='text-gray-400' />
          </div>
          <div className='flex items-center gap-1'>
            <Phone className='w-4 h-4 text-amber-500' />
            <CustomText text={phone} textType='small' weightType='medium' color='text-gray-400' />
          </div>
        </div>

      </div>
    </div>
    <div className='my-2 bg-gray-100/30 rounded-xl p-4'>
      <CustomText text={message} textType='small' weightType='medium' />
    </div>
  </div>
  )
}

export default MessageCard