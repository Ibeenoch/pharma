import React from 'react'
import CustomText from '../../../common/Text';

interface NoResultProps {
  title?: string;
}

const NoResult: React.FC<NoResultProps> = ({ title}) => {
  return (
    <div className='w-full h-30 bg-white flex justify-center items-center'>
      <CustomText
      text={`No ${title ? title.toLowerCase() : 'record'} found`}
      textType='normal'
      weightType='medium'
      />
    </div>
  )
}

export default NoResult