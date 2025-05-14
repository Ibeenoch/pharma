import successImg from '../../assets/images/successpay.png';
import CustomButton from '../../components/common/Button';
import CustomText from '../../components/common/Text';

const AccountCreated = () => {
  return (
    <section className='mt-25 flex flex-col items-center justify-center w-full'>
        <CustomText text='Account successfully created' textType='medium' weightType='semibold'  />
          <img
          src={successImg}
          alt="account full image"
          className={`w-[20%] lg:h-full`}
        />

        <CustomText text='An email has been sent to you please do well to confirm your email address, but can do that later' textType='small' weightType='medium' color='text-gray-500' extraStyle='my-3' />
        <CustomText text='Go back to home page and start searching for your favorite products.' textType='small' weightType='medium' color='text-gray-500' />
       <CustomButton text='Proceed to Home Page' textSize='normal' weightType='medium' showArrow={true} className='my-5' />
    </section>
  )
}

export default AccountCreated