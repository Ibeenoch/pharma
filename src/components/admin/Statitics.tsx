import React, { lazy } from 'react'
const CustomText = lazy(() => import("../common/Text"));


interface StatiticsProps {
    Icons: React.FunctionComponent<React.SVGProps<SVGSVGElement> & {
        title?: string;
        titleId?: string;
        desc?: string;
        descId?: string;
    }>;
    topText: string;
    bottomText: number;
    bgColor?: string
}

const Statitics: React.FC<StatiticsProps> = ({ Icons, topText, bottomText, bgColor}) => {
  return (
    <div className={`rounded-xl ${ bgColor ? bgColor : 'bg-gradient-to-r from-amber-600 to-amber-300'} p-4 w-1/2 h-[150px] my-2 flex justify-between gap-2 items-center`}>
    <div className="p-2 bg-white rounded-md flex items-center justify-center">
      <Icons className="w-8 h-8 text-amber-500" />
      </div>
      <div>
        <CustomText text={topText} textType="normal" weightType="normal" color="text-white"/>
        <CustomText text={String(bottomText)} textType="large" weightType="normal" />
      </div>
  </div>
  )
}

export default Statitics