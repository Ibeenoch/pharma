import React from 'react'
import { AllOrderResultData } from '../../../../types/order/OrderType';
import CustomText from '../../../common/Text';
import Cash from "../../../../assets/icons/cash.svg?react";


interface OrderSearchListProps {
    order: AllOrderResultData;
}

const OrderSearchList: React.FC<OrderSearchListProps> = ({ order }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200">
    <div className="p-2 bg-amber-500/30 rounded-full  ">
     <Cash className="w-4 h-4 text-amber-500" />
    </div>

    <div className="max-w-[90%]">
      <CustomText text={order && order.cart && order.cart && order.cart[0] && order.cart[0].name} textType="small" weightType="semibold" />
      <div className="flex items-center gap-1">
        <CustomText text={`${order && order.cart && order.cart && order.cart.length} items`} textType="extrasmall" weightType="medium" color="text-gray-500" />
        <CustomText text={`#${order && order.$id}`} textType="extrasmall" weightType="medium" color="text-gray-500" />
      </div>
    </div>
  </div>
  )
}

export default OrderSearchList