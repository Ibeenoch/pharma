import React from 'react'
import CustomText from '../common/Text'

interface OrderDetailsProps {
    leftText?: string;
    rightText?: string;
}
const OrderDetails: React.FC<OrderDetailsProps> = ({ leftText, rightText }) => {
  return (
    <div className="flex justify-between items-center gap-4 my-2">
    <CustomText text={leftText} textType="normal" weightType="medium" color="text-gray-500" />
    <CustomText text={rightText} textType="normal" weightType="medium" color="text-gray-500" />
    </div>
  )
}

export default OrderDetails