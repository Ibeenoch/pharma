import React, { useState } from 'react'
import Warning from "../../../assets/icons/caution.svg?react";


interface SelectedTabProps {
    label?: string;
    postlabel?: string;
    stringArr: string[];
    handleWordSelected: (index: number, word: string) => void;
    thisState: string;
    thisIndex: number;
    errorMessage?: string;
}

const SelectedTab: React.FC<SelectedTabProps> = ({ label, errorMessage,  postlabel, stringArr, handleWordSelected, thisIndex, thisState }) => {

    return (
    <div className="w-full">
              <div className={`block mt-3 mb-1 flex gap-1 items-center text-sm font-bold mb-2 `}>
                {label}
                <p className="text-xs text-amber-500 font-bold">*</p>
                <em className='text-xs font-normal text-gray-400'>{postlabel}</em>
                
              </div>
              <div className=" flex flex-wrap items-center gap-2">
                {
                  stringArr.map((freq, i) => (
                    <div key={i}  onClick={() =>handleWordSelected(i, freq)} className={`p-2 cursor-pointer rounded-md  text-xs hover:bg-amber-500 hover:text-white ${ thisIndex === i && thisState === freq ? 'text-white bg-amber-500' : 'bg-amber-500/10 text-amber-500'} `}>
                      {freq}
                    </div>
                  ))
                }
              

              </div>
              {errorMessage && (
        <div className="pt-[0.5px] flex gap-1 item-center">
          <div className="mt-[1.8px]">
            <Warning className="w-4 h-4 text-red-400" />
          </div>
          <p className="text-red-400 mt-[1.5px] text-[12px] font-medium">
            {errorMessage}
          </p>
        </div>
      )}
            </div>
  )
}

export default SelectedTab