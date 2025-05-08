import React, { lazy } from "react";
const CustomText = lazy(() =>import("../common/Text"));


interface TwoTextSpanProps {
    leftText: string;
    rightText?: string;
    onClick?: () => void;
}

const TwoTextSpan: React.FC<TwoTextSpanProps> = ({ leftText, rightText = 'See All', onClick}) => {
  return (
    <article className='flex justify-between px-4 my-4 items-center'>
    <CustomText text={leftText} textType='medium' weightType='bold'  />
    <div className='cursor-pointer' onClick={onClick}>
        <CustomText text={rightText} textType='normal' weightType='medium' color='gray'  />
    </div>
</article>
  )
}

export default TwoTextSpan