import React from "react"

interface CustomTextProps{
   textType?: 'extrasmall' | 'small' | 'normal' | 'medium' | 'large' | 'extralarge' | 'huge' | 'superhuge',
   weightType?: 'thin' | 'normal' | 'medium' | 'bold' | 'superbold',
    text: string,
    color?: string,
    extraStyle?: string
}

const CustomText: React.FC<CustomTextProps> = ({ textType = 'normal', weightType = 'normal', text, color = 'black', extraStyle }) => {
 let textWeight = weightType === 'bold' ? 'font-bold' : weightType === 'normal' ? 'font-normal' : weightType === 'medium' ? 'font-medium' : weightType === 'superbold' ? 'font-black' : 'font-light'; 
 let textColor = color === 'black' ? 'text-black' : 'text-gray-500';
 return (
    textType === 'extrasmall' ? (
        <p className={`text-[9px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </p>
    ) : textType === 'small' ? (
        <p className={`text-[12px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </p> 
    )  : textType === 'normal' ? (
        <p className={`text-[14px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </p> 
    )  : textType === 'medium' ? (
        <p className={`text-[18px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </p> 
    ) : textType === 'large' ? (
        <h4 className={`text-[28px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </h4> 
    )  : textType === 'extralarge' ? (
        <h3 className={`text-[36px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </h3> 
    )  : textType === 'huge' ? (
        <h2 className={`text-[46px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </h2> 
    )  : textType === 'superhuge' ? (
        <h2 className={`text-[56px]  ${textWeight} ${textColor} ${extraStyle}`}>{text} </h2> 
    ) : (
        <h1 className={`text-[32px]  ${textWeight} ${textColor} ${extraStyle}`}></h1>
    )
  )
}

export default CustomText