import React from 'react'
import { TransactionProps } from '../../../../types/payment/FlutterwavePaymentType';
import Orders from "../../../../assets/icons/order.svg?react";
import CustomText from '../../../common/Text';

interface TransactionSearchListProps{
    transaction: TransactionProps;
}

const TransactionSearchList: React.FC<TransactionSearchListProps> = ({ transaction }) => {
  return (
    <div className="flex items-center gap-2 p-4 border-b border-gray-200">
    <div className="p-2 bg-amber-500/30 rounded-full  ">
     <Orders className="w-4 h-4 text-amber-500" />
    </div>

    <div className="max-w-[90%]">
      <CustomText text={transaction && transaction.status} textType="small" weightType="semibold" />
      <div className="flex items-center gap-1">
        <CustomText text={`${transaction && transaction.productQty} items`} textType="extrasmall" weightType="medium" color="text-gray-500" />
        <CustomText text={`₦${transaction && transaction.amount}`} textType="extrasmall" weightType="medium" color="text-gray-500" />
      </div>
    </div>
  </div>
  )
}

export default TransactionSearchList