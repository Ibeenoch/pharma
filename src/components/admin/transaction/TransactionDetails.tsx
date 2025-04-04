import React from 'react'
import CustomText from '../../common/Text';
import pics from '../../../assets/images/hd2_Omeprazole-20mg.png';

interface TransactionDetailsProps {
    id: string;
}

const TransactionDetails: React.FC<TransactionDetailsProps> = ({ id }) => {
  return (
    <div className=''>
        <CustomText text='#AT469CD' textType='small' weightType='semibold' extraStyle='my-1' />
        <CustomText text='Order details' textType='small' color='text-gray-500' weightType='normal' extraStyle='mt-1 pb-3 border-b border-gray-300' />
        <CustomText text='Items' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1' />
        <div className='flex gap-8 items-center justify-between border-b border-gray-300 pb-4'>
            <div className='flex gap-1 items-center'>
                <div className='flex gap-1 items-center p-2 border border-gray-300 rounded-lg'>
                    <img src={pics} alt="items-img" className='w-7 h-7' />
                </div>
                <div>
                    <CustomText text='Omeprazole' textType='extrasmall' weightType='semibold' />
                    <CustomText text='pain killer' textType='extrasmall' color='text-gray-500' weightType='normal' extraStyle='' />
                </div>
            </div>

            <div>
                {/* qty  */}
                <CustomText text='2pcs' textType='small' color='text-gray-500' weightType='normal' />
            </div>

            <div>
                {/* price  */}
                <CustomText text='₦2,500' textType='small' color='text-amber-500' weightType='medium' />
            </div>
        </div>

        <div className='grid grid-cols-2 pb-4 pt-2 border-b border-gray-300'>
            <CustomText text='Created at' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
            <CustomText text='24 April 2025' textType='small'  weightType='semibold' extraStyle='my-1'/>
            <CustomText text='Delivery Service' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
            <CustomText text='Fed Ex' textType='small'  weightType='semibold' extraStyle='my-1'/>
            <CustomText text='Payment Method' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
            <CustomText text='Paystack' textType='small'  weightType='semibold' extraStyle='my-1'/>
            <CustomText text='Status' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
            <CustomText text='Processed' textType='small' color={`text-green-500`}  weightType='semibold' extraStyle='my-1'/>
        </div>

        <div className='border-b border-gray-300'>
        <CustomText text='Payment' textType='small'  weightType='semibold' color='text-gray-500' extraStyle='my-1'/>
            <div className='grid grid-cols-2'>
                <CustomText text='Sub Total' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
                <CustomText text='₦2,500.00' textType='small'  weightType='semibold' extraStyle='my-1'/>
                <CustomText text='Shipping Fee' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
                <CustomText text='₦1,500.00' textType='small'  weightType='semibold' extraStyle='my-1'/>
                <CustomText text='Total' textType='small' color='text-gray-500' weightType='normal' extraStyle='my-1'/>
                <CustomText text='₦4,000.00' textType='small'  weightType='semibold' extraStyle='my-1'/>
                
            </div>
        </div>

    </div>
  )
}

export default TransactionDetails