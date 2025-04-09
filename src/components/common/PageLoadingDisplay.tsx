import React from 'react'
import Drug from '../../assets/icons/pharmacy.svg?react'
interface PageLoadingDisplayProps {
    text?: string
}

const PageLoadingDisplay: React.FC<PageLoadingDisplayProps> = ({ text}) => {
  return (
    <div className='flex items-center p-2 justify-center h-screen'>
        <div className='animate-spin'>
            <Drug className='w-15 h-15 animate-spin' />
        </div>
            <p className='text-sm font-semibold text-gray-500'>{text} </p>
    </div>
  )
}

export default PageLoadingDisplay