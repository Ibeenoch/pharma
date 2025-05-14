import { useNavigate } from 'react-router-dom'
import image404 from '../../assets/images/404.png'
import CustomText from './Text'
import CustomButton from './Button'


const NotFound = () => {
    const navigate = useNavigate()
  return (
    <div className='pt-20 md:grid grid-cols-2 px-4'>
        <img src={image404} alt="404 image" className='w-full h-auto' />
        <div className='flex flex-col justify-center items-center'>
            <CustomText text="We can't find the page you are looking for, seems like it doesn't exist" textType='large' weightType='semibold' color='text-gray-500' extraStyle='text-center' />
            
            <CustomButton
            onClick={() => navigate('/')}
            text='Back to home page' showArrow={true} textSize='normal' fullwidth={true} className='my-4' />
        </div>
    </div>
  )
}

export default NotFound