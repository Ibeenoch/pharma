import React from 'react'
import CheckMark from '../cart/CheckMark'
import CustomText from '../common/Text';

interface VerticaltrackedOrderProps{
    steps?: number;
}

const VerticaltrackedOrder: React.FC<VerticaltrackedOrderProps> = ({ steps = 2 }) => {
  return (
   <div className='flex gap-5 pb-8 pl-15 border-b border-gray-300'>
        <div className='flex flex-col items-center'>
            <div className={`h-16 w-1 border-2 border-amber-500 bg-amber-500`}></div>
            <CheckMark containerSize={5} iconSize={4} extraStyle='w-min' />
            <div className={`h-16 w-1 border-2 border-amber-500 bg-amber-500 ${steps && steps >= 3 ? '' : 'opacity-50'} `}></div>
            <CheckMark containerSize={5} iconSize={4} extraStyle={`w-min  ${steps && steps >= 3 ? '' : 'opacity-50'}`} />
            <div className={`h-16 w-1 border-2 border-amber-500 bg-amber-500  ${steps && steps >= 4 ? '' : 'opacity-50'}`}></div>
            <CheckMark containerSize={5} iconSize={4} extraStyle={`w-min  ${steps && steps >= 4 ? '' : 'opacity-50'}`} />
        </div>

        <div className='flex flex-col items-center gap-14'>
            <div className='mt-16 md:mt-12'>
                <CustomText text='ORDERED' textType='small' weightType='semibold' />
                <CustomText text='12:13, April 7th 2025' textType='small' weightType='medium' />
            </div>
            <div>
                <CustomText text='SHIPPED' textType='small' weightType='semibold' />
                <CustomText text='15:13, April 8th 2025' textType='small' weightType='medium' />
            </div>
            <div>
                <CustomText text='DELIVERED' textType='small' weightType='semibold' />
                <CustomText text='18:13, April 8th 2025' textType='small' weightType='medium' />
            </div>
        </div>
   </div>
  )
}

export default VerticaltrackedOrder;