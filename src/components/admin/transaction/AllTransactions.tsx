import CustomText from '../../common/Text'
import img from '../../../assets/images/pr8.png';
import { lightgrayBgColor } from '../../../constants/appColor';

const AllTransactions = () => {
  return (
    <section className={`lg:grid grid-cols-2 p-4 my-3 gap-3  ${lightgrayBgColor} rounded-xl`}>
        <div className={`p-4 rounded-xl bg-white my-3 lg:my-0 `}>
            <div className='flex justify-between items-center pb-3 border-b border-dashed border-gray-200'>
                <div className='flex items-center gap-1'>
                    <CustomText text='12983' textType='small' weightType='semibold' color='text-amber-500' />
                    <div className='w-1 h-1 rounded-full bg-gray-300'></div>
                    <CustomText text='Express Shipping' textType='small' weightType='semibold' color='text-gray-300' />
                </div>

                <div className={`py-1 px-2 flex items-center justify-center rounded-xl bg-amber-500/30`}>
                    <CustomText text='Pending' color='text-amber-500' textType='small' weightType='semibold'  />
                </div>
            </div>


            <div className='flex justify-between items-center pt-3 pb-3'>
                <div className='flex items-center gap-1'>
                    <img src={img} alt="transaction image" className='w-7 h-7 rounded-full' />
                    <div>
                        <CustomText text='Smartwatch E3 Black' textType='extrasmall' weightType='semibold' />
                        <CustomText text='1 x $24.00' textType='extrasmall' color='text-gray-400' extraStyle='py-1' />
                        <CustomText text='+1 Other Product' textType='extrasmall' color='text-gray-400' />
                    </div>
                </div>

                <div className={``}>
                    <CustomText text='$3200.00'  textType='medium' weightType='semibold'  />
                </div>
            </div>

            <div className='flex items-center gap-5'>
                <div>
                    <CustomText text='Order Date' textType='extrasmall' color='text-gray-400' />
                    <CustomText text='24 October 2025' textType='small' weightType='semibold'  />
                </div>
                <div>
                    <CustomText text='Customer' textType='extrasmall' color='text-gray-400' />
                    <CustomText text='Ralph Adewale' textType='small' weightType='semibold'  />
                </div>
                <div>
                    <CustomText text='Payment' textType='extrasmall' color='text-gray-400' />
                    <CustomText text='Paystack' textType='small' weightType='semibold'  />
                </div>

            </div>
            
        </div>

    </section>
  )
}

export default AllTransactions